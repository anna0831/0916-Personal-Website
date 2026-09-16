/**
 * Cute & Cozy Personal Page & Live Time Engine 🌸
 */

document.addEventListener('DOMContentLoaded', () => {
  // State variables
  let is24Hour = localStorage.getItem('clock_format') === '24h';
  let isHighPrecision = localStorage.getItem('high_precision') === 'true';
  let activeTheme = localStorage.getItem('theme_preference') || 'strawberry';
  let loveSparklesCount = parseInt(localStorage.getItem('love_sparkles_count') || '12', 10);

  // Default Profile Data (Cute aesthetic)
  const defaultProfile = {
    name: 'Mia',
    role: 'Creative Coder & Digital Artist 🎀',
    bio: 'Turning sweet imagination into soft pixels, cozy interfaces, and cute interactive magic. Welcome to my little corner of the web! ☕🍰',
    status: 'Living happily & crafting cute things 🌸',
    email: 'anna.hsu.831@gmail.com',
    github: 'anna0831'
  };

  // Load saved profile or fallback to defaults
  let profile = { ...defaultProfile };
  try {
    const saved = localStorage.getItem('personal_profile');
    if (saved) {
      profile = { ...defaultProfile, ...JSON.parse(saved) };
      if (profile.email === 'mia@example.com') profile.email = defaultProfile.email;
      if (!profile.github || profile.github === 'sweet_mia') profile.github = defaultProfile.github;
    }
  } catch (e) {
    console.error('Error reading profile from localStorage', e);
  }

  // DOM Elements - Profile
  const displayNameEl = document.getElementById('display-name');
  const displayRoleEl = document.getElementById('display-role');
  const displayBioEl = document.getElementById('display-bio');
  const displayStatusEl = document.getElementById('display-status');
  const footerNameEl = document.getElementById('footer-name');
  const pageTitleEl = document.getElementById('page-title');

  // DOM Elements - Clock & Context
  const clockHoursEl = document.getElementById('clock-hours');
  const clockMinutesEl = document.getElementById('clock-minutes');
  const clockSecondsEl = document.getElementById('clock-seconds');
  const clockAmpmEl = document.getElementById('clock-ampm');
  const clockMillisEl = document.getElementById('clock-millis');
  const clockDateEl = document.getElementById('clock-date');
  const greetingTextEl = document.getElementById('greeting-text');
  const greetingIconEl = document.getElementById('greeting-icon');
  const timezonePillEl = document.getElementById('timezone-pill');
  const dayProgressPillEl = document.getElementById('day-progress-pill');
  const dayBarFillEl = document.getElementById('day-bar-fill');
  const locationCounterEl = document.getElementById('location-counter');
  const sparkleCountEl = document.getElementById('sparkle-count');
  const currentYearEl = document.getElementById('current-year');

  // DOM Elements - Actions & Controls
  const formatToggleBtn = document.getElementById('format-toggle-btn');
  const formatLabel = document.getElementById('format-label');
  const copyTimeBtn = document.getElementById('copy-time-btn');
  const toggleSecondsBtn = document.getElementById('toggle-seconds-btn');
  const sparkleBtn = document.getElementById('sparkle-btn');
  const avatarEl = document.getElementById('profile-avatar');

  // Themes
  const themeBtn = document.getElementById('theme-btn');
  const themeMenu = document.getElementById('theme-menu');
  const themeOpts = document.querySelectorAll('.theme-opt');
  const themeIconEl = document.getElementById('theme-icon');
  const themeLabelEl = document.getElementById('theme-label');

  // Modal
  const editModal = document.getElementById('edit-modal');
  const openEditModalBtn = document.getElementById('open-edit-modal');
  const quickEditBtn = document.getElementById('quick-edit-name-btn');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const editProfileForm = document.getElementById('edit-profile-form');
  const resetProfileBtn = document.getElementById('reset-profile-btn');

  const inputName = document.getElementById('input-name');
  const inputRole = document.getElementById('input-role');
  const inputBio = document.getElementById('input-bio');
  const inputStatus = document.getElementById('input-status');
  const inputGithub = document.getElementById('input-github');
  const inputEmail = document.getElementById('input-email');

  // Toast
  const toastEl = document.getElementById('toast');
  const toastMsgEl = document.getElementById('toast-msg');
  const toastIconEl = document.getElementById('toast-icon');
  let toastTimer = null;

  /* --------------------------------------------------------------------------
     1. Profile Rendering & Modal
     -------------------------------------------------------------------------- */
  function renderProfile() {
    displayNameEl.textContent = profile.name;
    displayRoleEl.textContent = profile.role;
    displayBioEl.textContent = profile.bio;
    displayStatusEl.textContent = profile.status;
    if (footerNameEl) footerNameEl.textContent = profile.name;
    if (pageTitleEl) pageTitleEl.textContent = `${profile.name} | Cozy Little Space & Live Time 🌸`;

    const githubLink = document.getElementById('link-github');
    const descGithub = document.getElementById('desc-github');
    if (githubLink && descGithub && profile.github) {
      const cleanGithub = profile.github.replace('@', '');
      githubLink.href = `https://github.com/${cleanGithub}`;
      descGithub.textContent = `@${cleanGithub}`;
    }

    const emailLink = document.getElementById('link-email');
    const descEmail = document.getElementById('desc-email');
    if (emailLink && descEmail && profile.email) {
      emailLink.href = `mailto:${profile.email}`;
      descEmail.textContent = profile.email;
    }
  }

  function openEditModal() {
    inputName.value = profile.name;
    inputRole.value = profile.role;
    inputBio.value = profile.bio;
    inputStatus.value = profile.status;
    if (inputGithub) inputGithub.value = profile.github || '';
    inputEmail.value = profile.email || '';
    editModal.hidden = false;
    inputName.focus();
  }

  function closeEditModal() {
    editModal.hidden = true;
  }

  openEditModalBtn.addEventListener('click', openEditModal);
  if (quickEditBtn) quickEditBtn.addEventListener('click', openEditModal);
  closeModalBtn.addEventListener('click', closeEditModal);

  editModal.addEventListener('click', (e) => {
    if (e.target === editModal) closeEditModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !editModal.hidden) {
      closeEditModal();
    }
  });

  editProfileForm.addEventListener('submit', (e) => {
    e.preventDefault();
    profile.name = inputName.value.trim() || 'Mia';
    profile.role = inputRole.value.trim() || 'Creative Artist 🎀';
    profile.bio = inputBio.value.trim();
    profile.status = inputStatus.value.trim() || 'Living happily 🌸';
    if (inputGithub) profile.github = inputGithub.value.trim() || 'anna0831';
    profile.email = inputEmail.value.trim() || 'anna.hsu.831@gmail.com';

    localStorage.setItem('personal_profile', JSON.stringify(profile));
    renderProfile();
    closeEditModal();
    showToast('Saved profile with extra love! ✨', '💖');
  });

  resetProfileBtn.addEventListener('click', () => {
    profile = { ...defaultProfile };
    localStorage.removeItem('personal_profile');
    renderProfile();
    closeEditModal();
    showToast('Profile reset to default sweet settings.', '🌸');
  });

  /* --------------------------------------------------------------------------
     2. Dynamic Live Clock & Context Updates
     -------------------------------------------------------------------------- */
  function getSystemTimezoneString() {
    try {
      const tzName = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Local';
      const offsetMinutes = -new Date().getTimezoneOffset();
      const sign = offsetMinutes >= 0 ? '+' : '-';
      const hours = String(Math.floor(Math.abs(offsetMinutes) / 60)).padStart(2, '0');
      const mins = String(Math.abs(offsetMinutes) % 60).padStart(2, '0');
      return {
        formatted: `UTC${sign}${hours}:${mins}`,
        tzName: tzName
      };
    } catch {
      return { formatted: 'UTC+00:00', tzName: 'UTC' };
    }
  }

  function updateGreeting(hours) {
    let greeting = 'Hello';
    let icon = '🌸';

    if (hours >= 0 && hours < 5) {
      greeting = 'Sweet dreams & night owl vibes';
      icon = '🧸';
    } else if (hours >= 5 && hours < 12) {
      greeting = 'Good morning, sunshine!';
      icon = '☀️';
    } else if (hours >= 12 && hours < 17) {
      greeting = 'Sweet afternoon tea time!';
      icon = '🧋';
    } else if (hours >= 17 && hours < 22) {
      greeting = 'Cozy evening vibes!';
      icon = '🎀';
    } else {
      greeting = 'Good night & starry dreams!';
      icon = '🌙';
    }

    const firstName = profile.name.split(' ')[0] || 'Friend';
    greetingTextEl.textContent = `${greeting} ${firstName} ✨`;
    greetingIconEl.textContent = icon;
  }

  function updateClock() {
    const now = new Date();

    const rawHours = now.getHours();
    const rawMinutes = now.getMinutes();
    const rawSeconds = now.getSeconds();
    const rawMillis = now.getMilliseconds();

    let displayHours = rawHours;
    let ampm = '';

    if (is24Hour) {
      clockAmpmEl.style.display = 'none';
      displayHours = String(rawHours).padStart(2, '0');
    } else {
      clockAmpmEl.style.display = 'block';
      ampm = rawHours >= 12 ? 'PM 🌙' : 'AM ☀️';
      displayHours = rawHours % 12;
      displayHours = displayHours === 0 ? 12 : displayHours;
      displayHours = String(displayHours).padStart(2, '0');
      clockAmpmEl.textContent = ampm;
    }

    const displayMinutes = String(rawMinutes).padStart(2, '0');
    const displaySeconds = String(rawSeconds).padStart(2, '0');

    clockHoursEl.textContent = displayHours;
    clockMinutesEl.textContent = displayMinutes;
    clockSecondsEl.textContent = displaySeconds;

    if (isHighPrecision) {
      clockMillisEl.style.display = 'block';
      clockMillisEl.textContent = `.${String(rawMillis).padStart(3, '0')}`;
    } else {
      clockMillisEl.style.display = 'none';
    }

    updateGreeting(rawHours);

    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    clockDateEl.textContent = now.toLocaleDateString('en-US', dateOptions);

    const secondsPassed = (rawHours * 3600) + (rawMinutes * 60) + rawSeconds;
    const dayProgressPercent = Math.min(100, Math.max(0, ((secondsPassed / 86400) * 100))).toFixed(1);
    dayProgressPillEl.textContent = `Day ${dayProgressPercent}% 🌸`;
    dayBarFillEl.style.width = `${dayProgressPercent}%`;
  }

  function updateFormatUI() {
    formatLabel.textContent = is24Hour ? '24H' : '12H';
    updateClock();
  }

  formatToggleBtn.addEventListener('click', () => {
    is24Hour = !is24Hour;
    localStorage.setItem('clock_format', is24Hour ? '24h' : '12h');
    updateFormatUI();
    showToast(`Switched to ${is24Hour ? '24-hour' : '12-hour'} mode ⏰`, '✨');
  });

  toggleSecondsBtn.addEventListener('click', () => {
    isHighPrecision = !isHighPrecision;
    localStorage.setItem('high_precision', isHighPrecision ? 'true' : 'false');
    const label = toggleSecondsBtn.querySelector('span');
    if (label) {
      label.textContent = isHighPrecision ? '⚡ High Precision (ON)' : '✨ High Precision';
    }
    updateClock();
    showToast(`Cute milliseconds ${isHighPrecision ? 'enabled' : 'disabled'}!`, '🍡');
  });

  copyTimeBtn.addEventListener('click', async () => {
    const now = new Date();
    const timeString = `${now.toLocaleTimeString()} - ${now.toLocaleDateString()}`;
    const isoString = now.toISOString();
    const textToCopy = `🌸 ${timeString} (${isoString})`;

    try {
      await navigator.clipboard.writeText(textToCopy);
      showToast("Copied timestamp! You're wonderful! 💖", '📋');
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = textToCopy;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      showToast("Copied timestamp! You're wonderful! 💖", '📋');
    }
  });

  /* --------------------------------------------------------------------------
     3. Cute Theme Switcher Logic
     -------------------------------------------------------------------------- */
  const themeDetails = {
    strawberry: { label: 'Berry Milk', icon: '🍓' },
    lavender: { label: 'Lavender Cloud', icon: '💜' },
    peach: { label: 'Peach Boba', icon: '🍑' },
    'cozy-night': { label: 'Cozy Midnight', icon: '🌙' }
  };

  function applyTheme(themeName) {
    if (!themeDetails[themeName]) themeName = 'strawberry';
    document.documentElement.setAttribute('data-theme', themeName);
    activeTheme = themeName;
    localStorage.setItem('theme_preference', themeName);

    themeIconEl.textContent = themeDetails[themeName].icon;
    themeLabelEl.textContent = themeDetails[themeName].label;

    themeOpts.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.theme === themeName);
    });
  }

  themeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    themeMenu.hidden = !themeMenu.hidden;
  });

  themeOpts.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const selected = btn.dataset.theme;
      applyTheme(selected);
      themeMenu.hidden = true;
      showToast(`Sweet theme: ${themeDetails[selected].label}`, themeDetails[selected].icon);
    });
  });

  document.addEventListener('click', (e) => {
    if (!themeMenu.hidden && !themeMenu.contains(e.target) && e.target !== themeBtn) {
      themeMenu.hidden = true;
    }
  });

  /* --------------------------------------------------------------------------
     4. Sparkle Burst & Happiness Counter 💖
     -------------------------------------------------------------------------- */
  function spawnCuteSparkles(originX, originY) {
    const emojis = ['💖', '🌸', '✨', '⭐', '🍓', '🎀', '🍡', '🍰', '☁️'];
    const count = 14;

    for (let i = 0; i < count; i++) {
      const el = document.createElement('span');
      el.className = 'burst-item';
      el.textContent = emojis[Math.floor(Math.random() * emojis.length)];

      const angle = (Math.PI * 2 / count) * i + (Math.random() * 0.4 - 0.2);
      const distance = 80 + Math.random() * 120;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;
      const rot = (Math.random() * 90 - 45) + 'deg';

      el.style.left = `${originX}px`;
      el.style.top = `${originY}px`;
      el.style.setProperty('--tx', `${tx}px`);
      el.style.setProperty('--ty', `${ty}px`);
      el.style.setProperty('--rot', rot);

      document.body.appendChild(el);
      setTimeout(() => el.remove(), 1200);
    }

    loveSparklesCount++;
    localStorage.setItem('love_sparkles_count', loveSparklesCount);
    if (sparkleCountEl) {
      sparkleCountEl.textContent = `${loveSparklesCount} Hearts`;
    }
  }

  sparkleBtn.addEventListener('click', (e) => {
    const rect = sparkleBtn.getBoundingClientRect();
    spawnCuteSparkles(rect.left + rect.width / 2, rect.top + rect.height / 2);
    showToast('Sent you sweet love & sparkles! 💖', '✨');
  });

  if (avatarEl) {
    avatarEl.addEventListener('click', (e) => {
      const rect = avatarEl.getBoundingClientRect();
      spawnCuteSparkles(rect.left + rect.width / 2, rect.top + rect.height / 2);
      showToast('Yay! Stay cute & keep smiling! 🌸', '🥰');
    });
  }

  /* --------------------------------------------------------------------------
     5. Toast Notification
     -------------------------------------------------------------------------- */
  function showToast(message, icon = '🌸') {
    if (toastTimer) clearTimeout(toastTimer);
    toastMsgEl.textContent = message;
    toastIconEl.textContent = icon;
    toastEl.classList.add('show');

    toastTimer = setTimeout(() => {
      toastEl.classList.remove('show');
    }, 2800);
  }

  /* --------------------------------------------------------------------------
     6. Initialization
     -------------------------------------------------------------------------- */
  if (currentYearEl) currentYearEl.textContent = new Date().getFullYear();
  if (sparkleCountEl) sparkleCountEl.textContent = `${loveSparklesCount} Hearts`;

  const tzInfo = getSystemTimezoneString();
  timezonePillEl.textContent = `${tzInfo.formatted} • ${tzInfo.tzName.split('/')[1] || tzInfo.tzName}`;
  locationCounterEl.textContent = tzInfo.tzName.replace('_', ' ');

  applyTheme(activeTheme);
  updateFormatUI();
  renderProfile();

  if (isHighPrecision) {
    const label = toggleSecondsBtn.querySelector('span');
    if (label) label.textContent = '⚡ High Precision (ON)';
  }

  updateClock();
  setInterval(updateClock, 50);
});
