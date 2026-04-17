# 🌊 SoundWave - Modern Music Streaming Platform

<p align="center">
  <img src="assets/images/logo.png" width="120" height="120" alt="SoundWave Logo">
</p>

SoundWave is a premium, Spotify-inspired music streaming web application built with **PHP**, **MySQL**, and **Vanilla JavaScript**. It features a stunning dark-themed UI, real-time search, interactive playlists, and a complete user authentication system with experimental premium features.

---

## ✨ Key Features

### 🎵 Premium Audio Experience
- **Interactive Music Player**: Full controls (Play/Pause, Next/Prev, Shuffle, Repeat) with persistent bottom bar.
- **Audio Engine**: Powered by HTML5 Audio API with 12 royalty-free demo tracks.
- **Progressive UI**: Real-time progress tracking, volume control, and seeking.

### 🔍 Discovery & Personalization
- **Real-time Search**: Instant filtering for songs, artists, and playlists with a 300ms debounce.
- **Custom Playlists**: Create, edit, and manage your own music collections.
- **Liked Songs**: Dedicated "Liked Songs" section with database persistence.
- **Dynamic Content**: Featured playlists, recently played, popular artists, and trending albums.

### 👤 User Management & Premium
- **Secure Authentication**: Registration and Login with session persistence and password hashing.
- **Account Overview**: Dedicated dashboard to update username and email.
- **Go Premium Overlay**: Seamless upgrade flow that grants special UI badges and effects.
- **Universal Settings**: Experimental theme toggles (Light/Dark) and audio quality controls.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|-------|--------------|
| **Backend** | PHP 8.x, PDO (MySQL) |
| **Frontend Logic** | Vanilla JavaScript (ES6+) |
| **Styling** | Vanilla CSS3 (Custom Variables, Flexbox, Grid) |
| **Database** | MySQL (InnoDb) |
| **Assets** | AI-generated textures, gradients, and royalty-free audio |

---

## 🚀 Installation & Setup

### Prerequisites
- [XAMPP](https://www.apachefriends.org/) (Apache + MySQL)
- PHP 7.4 or higher
- Browser (Chrome recommended for best audio performance)

### 1. Project Placement
Clone or move the project folder into your XAMPP's `htdocs` directory:
```bash
C:\xampp\htdocs\Spotify system\
```

### 2. Services Initialization
1.  Open **XAMPP Control Panel**.
2.  Start **Apache** and **MySQL**.

### 3. Database Auto-Setup
The application features an **Automatic Setup System**.
1.  Navigate to `http://localhost/Spotify system/` in your browser.
2.  The `config/db.php` script will automatically check for the required database and run `setup.sql` if it doesn't exist.
3.  Alternatively, you can manually import `setup.sql` via **phpMyAdmin**.

---

## 📂 Project Structure

```text
├── assets/images/       # AI-generated logos and album art
├── config/              # Database connection logic
├── css/                 # Comprehensive design system (43KB stylesheet)
├── includes/            # Core authentication and API logic
├── js/                  # Full application engine (53KB script)
├── dashboard.php        # Main interactive application interface
├── index.php            # Auth-guarded routing entry point
├── login.php            # Authentication portal
└── setup.sql            # Relational database schema
```

---

## 🎹 Keyboard Shortcuts
| Key | Action |
|-----|--------|
| `Space` | Play / Pause |
| `Left Arrow` | Seek backward (5s) |
| `Right Arrow` | Seek forward (5s) |
| `Shift + Left` | Previous Song |
| `Shift + Right` | Next Song |
| `Up / Down` | Volume Up / Down |

---

## ⚖️ License & Credits
- **Design Inspiration**: Modern Streaming Services (Spotify, Apple Music).
- **Audio Credits**: Royalty-free tracks provided by [SoundHelix](https://www.soundhelix.com/).
- **Assets**: All visual branding (Logo, Album Covers) was generated using custom AI models specifically for the SoundWave project.

---

<p align="center">Made with ❤️ by SoundWave Team</p>
