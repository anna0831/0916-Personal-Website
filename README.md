# 🌸 0916-Personal-Website — Cozy Personal Space & Live Clock

> **IoT Assignment & Interactive Personal Webpage**  
> Crafted with 💖 by **[Anna Hsu](https://github.com/anna0831)** (`@anna0831`)  
> 
> 🌐 **Live on GitHub**:  
> 👉 Commit 962c2de is now live on [https://github.com/anna0831/0916-Personal-Website](https://github.com/anna0831/0916-Personal-Website)  
> 🔗 **Live Demo (GitHub Pages)**: [https://anna0831.github.io/0916-Personal-Website/](https://anna0831.github.io/0916-Personal-Website/)

![Personal Space Preview](assets/avatar.jpg)

---

## 📖 Overview

A responsive personal homepage featuring an ambient live real-time clock, personalized identity card, context-aware greetings, and a cute pastel aesthetic. Built with vanilla web standards for performance and zero external dependencies.

---

## ✨ Features

### ⏰ Dynamic Real-Time Clock
- **Live Precision Time**: Continuous live tracking of hours, minutes, and seconds.
- **High Precision Mode**: Toggle millisecond counter (`.000`) for high-precision time display.
- **12H / 24H Toggle**: Instant format switching with active `AM ☀️` / `PM 🌙` indicator.
- **Timezone Awareness**: Auto-detects local system timezone and UTC offset (e.g. `UTC+08:00`).
- **Day Progression Bar**: Live visual progress bar with an animated walking star mascot (`⭐`) showing daily completion percentage.
- **Quick Copy**: One-click timestamp copy to clipboard with toast notification.

### ☀️ Contextual Ambient Greetings
- Automatically adapts greetings based on the user's local hour:
  - 🌅 `5:00 - 11:59`: "Good morning, sunshine! ☀️🌸"
  - 🧋 `12:00 - 16:59`: "Sweet afternoon tea time! 🧋✨"
  - 🎀 `17:00 - 21:59`: "Cozy evening vibes! 🌆🎀"
  - 🧸 `22:00 - 4:59`: "Sweet dreams & night owl vibes! 🌙💖"
- Directly personalizes greetings to the profile owner's name.

### 🎨 4 Sweet Pastel Themes
Switch effortlessly between custom-designed pastel palettes via the navbar dropdown:
- 🍓 **Strawberry Milk** *(Default)*: Creamy strawberry pinks, marshmallow white cards, and ruby accents.
- 💜 **Lavender Cloud**: Calming lilac, royal purple, and periwinkle tones.
- 🍑 **Peach Boba**: Warm apricot, honey gold, and fresh peach vibes.
- 🌙 **Cozy Midnight**: Cute dark pastel mode with neon pink and starry highlights.

### 🎀 Instant Profile Customization (In-Browser)
- Click the **"🎀 Edit Profile"** button or inline pen icon (`✎`) to customize:
  - Full Name
  - Role / Title
  - Bio description
  - Status message
  - GitHub username
  - Email address
- All changes persist automatically to browser `localStorage` without needing backend setup.
- Includes a one-click "Reset to Default" option.

### 💖 Interactive Love Sparkles
- Click the **"💖 Tap for Love"** button or the avatar to trigger explosive particle bursts of hearts (`💖`), flowers (`🌸`), stars (`⭐`), and sweets (`🍡`).
- Live tracking of total happiness and love shared counter.

---

## 🛠️ Tech Stack

- **Markup**: Semantic HTML5 with accessibility and OpenGraph SEO tags
- **Styling**: Vanilla CSS3 (Custom Properties, Glassmorphism backdrop-blur, CSS Grid, Flexbox, Keyframe Animations)
- **Scripting**: Vanilla JavaScript (ES6+, `Intl.DateTimeFormat`, `localStorage`, Clipboard API)
- **Typography**: Google Fonts ([Fredoka](https://fonts.google.com/specimen/Fredoka) & [Quicksand](https://fonts.google.com/specimen/Quicksand))
- **Assets**: Custom 3D kawaii character avatar

---

## 🚀 Quick Start & Live Demo

### 🌐 Live Online
- **Live Demo**: [https://anna0831.github.io/0916-Personal-Website/](https://anna0831.github.io/0916-Personal-Website/)
- **GitHub Repository**: [https://github.com/anna0831/0916-Personal-Website](https://github.com/anna0831/0916-Personal-Website)

### 💻 Running Locally
No installation or build steps required! Simply open the page in any modern browser:

#### Option 1: Direct File
Double click `index.html` to view directly in your browser.

#### Option 2: Local HTTP Server (Recommended)
Using Python:
```bash
python -m http.server 3000
```
Or using Node.js:
```bash
npx serve .
```

Then visit: **`http://localhost:3000`**

---

## 📂 Project Structure

```plaintext
0916-Personal-Website/
├── index.html          # Semantic layout, live clock container & modal
├── style.css           # Design tokens, themes, glassmorphism & responsive CSS
├── app.js              # Clock logic, greetings, theme switching & profile engine
├── README.md           # Project documentation
├── .gitignore          # Ignored system and temporary files
└── assets/
    └── avatar.jpg      # 3D cute avatar portrait
```

---

## 📬 Connect

- **Author**: Anna Hsu
- **GitHub**: [@anna0831](https://github.com/anna0831)
- **Email**: [anna.hsu.831@gmail.com](mailto:anna.hsu.831@gmail.com)
- **Repository**: [https://github.com/anna0831/0916-Personal-Website](https://github.com/anna0831/0916-Personal-Website)
