<?php
/**
 * Dashboard - SoundWave Music Streaming App
 * Main application interface with sidebar, player, and content
 */
require_once 'includes/header.php';
requireAuth();

$username = getCurrentUsername();
$initial = strtoupper(substr($username, 0, 1));
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>SoundWave - Your Music, Your Way</title>
    <meta name="description" content="Stream your favorite music on SoundWave. Discover playlists, artists, and albums.">
    <link rel="stylesheet" href="css/style.css">
    <link rel="icon" href="assets/images/logo.png" type="image/png">
</head>
<body>
    <!-- Sidebar Overlay (mobile) -->
    <div class="sidebar-overlay" onclick="closeSidebar()"></div>

    <div class="app-layout">
        <!-- ============================
             SIDEBAR NAVIGATION
             ============================ -->
        <aside class="sidebar" id="sidebar">
            <!-- Logo -->
            <div class="sidebar-logo">
                <img src="assets/images/logo.png" alt="SoundWave">
                <h2>Sound<span>Wave</span></h2>
            </div>

            <!-- Main Navigation -->
            <nav class="sidebar-nav">
                <div class="sidebar-nav-group">
                    <div class="nav-item active" data-view="home" onclick="renderHome(); closeSidebar();">
                        <span class="nav-icon">🏠</span>
                        <span class="nav-text">Home</span>
                    </div>
                    <div class="nav-item" data-view="search" onclick="document.getElementById('search-input').focus(); closeSidebar();">
                        <span class="nav-icon">🔍</span>
                        <span class="nav-text">Search</span>
                    </div>
                    <div class="nav-item" data-view="library" onclick="renderLibrary(); closeSidebar();">
                        <span class="nav-icon">📚</span>
                        <span class="nav-text">Your Library</span>
                    </div>
                </div>

                <div class="sidebar-divider"></div>

                <div class="sidebar-nav-group">
                    <div class="sidebar-nav-group-title">Playlists</div>
                    
                    <!-- Create Playlist -->
                    <button class="create-playlist-btn" onclick="showCreatePlaylistModal(); closeSidebar();">
                        <div class="plus-icon">+</div>
                        <span>Create Playlist</span>
                    </button>

                    <!-- Liked Songs -->
                    <div class="nav-item" data-view="liked" onclick="showLikedSongs(); closeSidebar();">
                        <span class="nav-icon">❤️</span>
                        <span class="nav-text">Liked Songs <small id="liked-songs-count" style="color:var(--text-muted);">0 songs</small></span>
                    </div>
                </div>
            </nav>

            <div class="sidebar-divider"></div>

            <!-- User Playlists -->
            <div class="sidebar-playlists" id="sidebar-playlist-list">
                <!-- Dynamic user playlists inserted here -->
            </div>

            <!-- Settings -->
            <div class="sidebar-nav" style="margin-top:auto; padding-bottom:16px;">
                <div class="sidebar-divider"></div>
                <div class="nav-item" onclick="showToast('Settings coming soon!')">
                    <span class="nav-icon">⚙️</span>
                    <span class="nav-text">Settings</span>
                </div>
            </div>
        </aside>

        <!-- ============================
             MAIN CONTENT
             ============================ -->
        <main class="main-content">
            <!-- Top Header -->
            <header class="top-header">
                <div class="header-left">
                    <!-- Hamburger (mobile) -->
                    <button class="hamburger-btn" onclick="toggleSidebar()" aria-label="Toggle menu">
                        ☰
                    </button>

                    <!-- Navigation Arrows -->
                    <div class="nav-arrows">
                        <button class="nav-arrow-btn" onclick="history.back()" aria-label="Go Back">‹</button>
                        <button class="nav-arrow-btn" onclick="history.forward()" aria-label="Go Forward">›</button>
                    </div>

                    <!-- Search Bar -->
                    <div class="search-bar">
                        <span class="search-icon">🔍</span>
                        <input type="text" id="search-input" placeholder="What do you want to listen to?" autocomplete="off">
                    </div>
                </div>

                <div class="header-right">
                    <!-- Premium Button -->
                    <button class="premium-btn" id="upgrade-btn">
                        Upgrade
                    </button>

                    <!-- Profile Dropdown -->
                    <div class="profile-dropdown">
                        <button class="profile-btn" onclick="toggleProfileDropdown()">
                            <div class="profile-avatar"><?= htmlspecialchars($initial) ?></div>
                            <span class="profile-name"><?= htmlspecialchars($username) ?></span>
                        </button>

                        <div class="dropdown-menu" id="profile-dropdown-menu">
                            <div class="dropdown-item">👤 Account</div>
                            <div class="dropdown-item">⚙️ Settings</div>
                            <div class="dropdown-divider"></div>
                            <a href="logout.php" class="dropdown-item" style="color:var(--danger);">
                                🚪 Log Out
                            </a>
                        </div>
                    </div>
                </div>
            </header>

            <!-- Dynamic Content Area -->
            <div class="content-area" id="content-area">
                <!-- Content rendered by JavaScript -->
                <div style="display:flex;align-items:center;justify-content:center;min-height:400px;">
                    <div class="skeleton" style="width:100%;height:280px;border-radius:12px;"></div>
                </div>
            </div>
        </main>
    </div>

    <!-- ============================
         MUSIC PLAYER BAR
         ============================ -->
    <div class="player-bar">
        <!-- Left: Song Info -->
        <div class="player-left">
            <img src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='56' height='56'><rect width='56' height='56' fill='%23282828' rx='4'/><text x='28' y='34' text-anchor='middle' font-size='20' fill='%23666'>♪</text></svg>" 
                 alt="Album Cover" class="player-cover" id="player-cover">
            <div class="player-song-info">
                <div class="player-song-title" id="player-title">No song playing</div>
                <div class="player-song-artist" id="player-artist">Select a song to play</div>
            </div>
            <button class="player-like-btn" onclick="if(state.currentSongIndex !== null) toggleLike(state.currentSongIndex)">🤍</button>
        </div>

        <!-- Center: Controls + Progress -->
        <div class="player-center">
            <div class="player-controls">
                <button class="control-btn shuffle-btn" onclick="toggleShuffle()" title="Shuffle">🔀</button>
                <button class="control-btn" onclick="prevSong()" title="Previous">
                    <svg width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M3.3 1a.7.7 0 01.7.7v5.15l9.95-5.744a.7.7 0 011.05.606v12.575a.7.7 0 01-1.05.607L4 9.15v5.15a.7.7 0 01-1.4 0V1.7a.7.7 0 01.7-.7z"/></svg>
                </button>
                <button class="play-pause-btn" id="play-pause-btn" onclick="togglePlayPause()" title="Play/Pause">
                    <svg width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M3 1.713a.7.7 0 011.05-.607l10.89 6.288a.7.7 0 010 1.212L4.05 14.894A.7.7 0 013 14.288V1.713z"/></svg>
                </button>
                <button class="control-btn" onclick="nextSong()" title="Next">
                    <svg width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M12.7 1a.7.7 0 00-.7.7v5.15L2.05 1.107A.7.7 0 001 1.712v12.575a.7.7 0 001.05.607L12 9.15v5.15a.7.7 0 001.4 0V1.7a.7.7 0 00-.7-.7z"/></svg>
                </button>
                <button class="control-btn repeat-btn" onclick="toggleRepeat()" title="Repeat">🔁</button>
            </div>

            <div class="progress-container">
                <span class="time-display current" id="current-time">0:00</span>
                <div class="progress-bar-wrapper" id="progress-bar">
                    <div class="progress-bar-fill" id="progress-fill" style="width: 0%"></div>
                </div>
                <span class="time-display" id="duration-time">0:00</span>
            </div>
        </div>

        <!-- Right: Volume -->
        <div class="player-right">
            <div class="volume-container">
                <button class="volume-btn" onclick="state.volume = state.volume > 0 ? 0 : 0.7; audio.volume = state.volume; updateVolumeUI();">🔊</button>
                <div class="volume-slider" id="volume-slider">
                    <div class="volume-fill" id="volume-fill" style="width: 70%"></div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Overlay -->
    <div class="modal-overlay" id="modal-overlay" onclick="if(event.target === this) closeModal()"></div>

    <!-- Toast Container -->
    <div class="toast-container" id="toast-container"></div>

    <!-- JavaScript -->
    <script src="js/app.js"></script>
</body>
</html>
