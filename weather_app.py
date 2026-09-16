import os
import sqlite3
from datetime import datetime

import pandas as pd
import requests
import streamlit as st

st.set_page_config(page_title="Taiwan Weather Forecast", page_icon="🌤️", layout="wide")

API_URL = "https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001"
DB_PATH = "weather.db"


def get_api_key():
    """Read the CWA API key from Streamlit secrets or an environment variable."""
    try:
        return st.secrets["CWA_API_KEY"]
    except (KeyError, FileNotFoundError):
        return os.getenv("CWA_API_KEY", "")


@st.cache_data(ttl=1800)
def fetch_weather(api_key: str):
    params = {"Authorization": api_key, "format": "JSON"}
    response = requests.get(API_URL, params=params, timeout=20)
    response.raise_for_status()
    payload = response.json()
    if not payload.get("success") == "true":
        raise RuntimeError("CWA API returned an unsuccessful response.")
    return payload


def parse_weather(payload):
    rows = []
    locations = payload.get("records", {}).get("location", [])

    for location in locations:
        city = location.get("locationName", "")
        elements = {item["elementName"]: item.get("time", []) for item in location.get("weatherElement", [])}
        times = elements.get("MinT", [])

        for idx, period in enumerate(times):
            start_time = period.get("startTime")
            end_time = period.get("endTime")

            def value_for(element_name):
                values = elements.get(element_name, [])
                if idx >= len(values):
                    return None
                parameter = values[idx].get("parameter", {})
                return parameter.get("parameterName")

            rows.append(
                {
                    "regionName": city,
                    "startTime": start_time,
                    "endTime": end_time,
                    "dataDate": start_time[:10] if start_time else None,
                    "minT": pd.to_numeric(value_for("MinT"), errors="coerce"),
                    "maxT": pd.to_numeric(value_for("MaxT"), errors="coerce"),
                    "weather": value_for("Wx"),
                    "rainProbability": pd.to_numeric(value_for("PoP"), errors="coerce"),
                    "comfort": value_for("CI"),
                }
            )

    return pd.DataFrame(rows)


def save_to_sqlite(df):
    with sqlite3.connect(DB_PATH) as conn:
        df.to_sql("TemperatureForecasts", conn, if_exists="replace", index=False)


def load_from_sqlite():
    with sqlite3.connect(DB_PATH) as conn:
        return pd.read_sql_query(
            "SELECT * FROM TemperatureForecasts ORDER BY regionName, startTime", conn
        )


st.title("🌤️ Taiwan Weather Forecast")
st.caption("CWA Open Data API → JSON → Pandas → SQLite → SQL → Streamlit")

api_key = get_api_key()
if not api_key:
    st.warning("CWA API key is not configured yet.")
    st.markdown(
        "Add `CWA_API_KEY` in Streamlit Community Cloud → App settings → Secrets. "
        "For local development, set the `CWA_API_KEY` environment variable."
    )
    st.stop()

try:
    payload = fetch_weather(api_key)
    weather_df = parse_weather(payload)
    if weather_df.empty:
        st.error("No weather records were returned by the CWA API.")
        st.stop()
    save_to_sqlite(weather_df)
    df = load_from_sqlite()
except requests.RequestException as exc:
    st.error(f"Unable to retrieve CWA weather data: {exc}")
    st.stop()
except Exception as exc:
    st.error(f"Unable to prepare weather data: {exc}")
    st.stop()

cities = sorted(df["regionName"].dropna().unique())
selected_city = st.sidebar.selectbox("Select a region", cities)
city_df = df[df["regionName"] == selected_city].copy()
city_df["startTime"] = pd.to_datetime(city_df["startTime"])

st.sidebar.markdown("### Data pipeline")
st.sidebar.code("CWA API\n  ↓\nJSON\n  ↓\nPandas\n  ↓\nSQLite\n  ↓\nStreamlit")

st.subheader(f"{selected_city} Forecast")
latest = city_df.iloc[0]
col1, col2, col3 = st.columns(3)
col1.metric("Minimum temperature", f"{latest['minT']:.0f} °C" if pd.notna(latest["minT"]) else "N/A")
col2.metric("Maximum temperature", f"{latest['maxT']:.0f} °C" if pd.notna(latest["maxT"]) else "N/A")
col3.metric("Rain probability", f"{latest['rainProbability']:.0f}%" if pd.notna(latest["rainProbability"]) else "N/A")

st.markdown(f"**Weather:** {latest['weather']}  \n**Comfort:** {latest['comfort']}")

chart_df = city_df.set_index("startTime")[["minT", "maxT"]].rename(
    columns={"minT": "Min temperature (°C)", "maxT": "Max temperature (°C)"}
)
st.subheader("Temperature trend")
st.line_chart(chart_df)

st.subheader("Forecast data")
display_columns = ["regionName", "startTime", "endTime", "minT", "maxT", "rainProbability", "weather", "comfort"]
st.dataframe(city_df[display_columns], use_container_width=True, hide_index=True)

with st.expander("SQL example"):
    st.code(
        f"SELECT *\nFROM TemperatureForecasts\nWHERE regionName = '{selected_city}'\nORDER BY startTime;",
        language="sql",
    )

st.caption(f"Last refreshed: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
