/* =============================================
   SoundWave - Music Streaming App JavaScript
   Complete audio player, search, playlists, UI
   ============================================= */

// ==========================================
// MUSIC DATA - Songs, Artists, Playlists
// ==========================================

const SONGS = [
    {
        id: 0,
        title: "Midnight Dreams",
        artist: "Luna Nova",
        album: "Neon Horizons",
        duration: 234,
        cover: "assets/images/cover_synthwave.png",
        gradient: "gradient-cover-1",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },
    {
        id: 1,
        title: "Golden Hour",
        artist: "Ember Rise",
        album: "Amber Skies",
        duration: 198,
        cover: "assets/images/cover_acoustic.png",
        gradient: "gradient-cover-2",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },
    {
        id: 2,
        title: "Urban Pulse",
        artist: "Shadow Vox",
        album: "Dark Frequencies",
        duration: 267,
        cover: "assets/images/cover_hiphop.png",
        gradient: "gradient-cover-3",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    },
    {
        id: 3,
        title: "Electric Bloom",
        artist: "Neon Pulse",
        album: "Spectrum",
        duration: 212,
        cover: null,
        gradient: "gradient-cover-4",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
    },
    {
        id: 4,
        title: "Starlight Serenade",
        artist: "Luna Nova",
        album: "Neon Horizons",
        duration: 245,
        cover: null,
        gradient: "gradient-cover-5",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
    },
    {
        id: 5,
        title: "Velvet Sunset",
        artist: "Aria Skye",
        album: "Silk & Stone",
        duration: 189,
        cover: null,
        gradient: "gradient-cover-6",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3"
    },
    {
        id: 6,
        title: "Thunder Road",
        artist: "Ryker James",
        album: "Open Road",
        duration: 276,
        cover: null,
        gradient: "gradient-cover-7",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3"
    },
    {
        id: 7,
        title: "Crystal Caves",
        artist: "Neon Pulse",
        album: "Spectrum",
        duration: 302,
        cover: null,
        gradient: "gradient-cover-8",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"
    },
    {
        id: 8,
        title: "Rainfall",
        artist: "Ember Rise",
        album: "Amber Skies",
        duration: 224,
        cover: null,
        gradient: "gradient-cover-9",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3"
    },
    {
        id: 9,
        title: "Neon City",
        artist: "Shadow Vox",
        album: "Dark Frequencies",
        duration: 256,
        cover: null,
        gradient: "gradient-cover-10",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3"
    },
    {
        id: 10,
        title: "Ocean Drive",
        artist: "Aria Skye",
        album: "Silk & Stone",
        duration: 198,
        cover: null,
        gradient: "gradient-cover-11",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3"
    },
    {
        id: 11,
        title: "Wildfire",
        artist: "Ryker James",
        album: "Open Road",
        duration: 231,
        cover: null,
        gradient: "gradient-cover-12",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3"
    }
];

const ARTISTS = [
    { name: "Luna Nova", genre: "Synthwave", followers: "2.4M", image: null, gradient: "gradient-cover-5", songIds: [0, 4] },
    { name: "Ember Rise", genre: "Indie Folk", followers: "1.8M", image: null, gradient: "gradient-cover-2", songIds: [1, 8] },
    { name: "Shadow Vox", genre: "Hip-Hop", followers: "3.1M", image: null, gradient: "gradient-cover-3", songIds: [2, 9] },
    { name: "Neon Pulse", genre: "Electronic", followers: "4.2M", image: null, gradient: "gradient-cover-1", songIds: [3, 7] },
    { name: "Aria Skye", genre: "R&B", followers: "2.7M", image: null, gradient: "gradient-cover-6", songIds: [5, 10] },
    { name: "Ryker James", genre: "Rock", followers: "1.5M", image: null, gradient: "gradient-cover-7", songIds: [6, 11] }
];

const DEFAULT_PLAYLISTS = [
    {
        id: "featured-1",
        name: "Chill Vibes",
        description: "Relax and unwind with these smooth tunes",
        gradient: "gradient-cover-3",
        songIds: [0, 4, 5, 8, 10]
    },
    {
        id: "featured-2",
        name: "Midnight Drive",
        description: "Perfect soundtrack for late night cruising",
        gradient: "gradient-cover-1",
        songIds: [0, 2, 3, 7, 9]
    },
    {
        id: "featured-3",
        name: "Workout Energy",
        description: "High energy tracks to fuel your workout",
        gradient: "gradient-cover-7",
        songIds: [2, 3, 6, 9, 11]
    },
    {
        id: "featured-4",
        name: "Acoustic Sessions",
        description: "Stripped-back and beautiful",
        gradient: "gradient-cover-2",
        songIds: [1, 5, 6, 8]
    },
    {
        id: "featured-5",
        name: "Electronic Frontier",
        description: "Cutting-edge electronic music",
        gradient: "gradient-cover-5",
        songIds: [3, 4, 7, 9, 10]
    }
];

// ==========================================
// APPLICATION STATE
// ==========================================

const state = {
    currentSongIndex: null,
    isPlaying: false,
    isShuffle: false,
    repeatMode: 0, // 0=off, 1=all, 2=one
    volume: 0.7,
    queue: [],
    currentView: 'home', // home, search, library, playlist, liked, account, settings
    currentPlaylist: null,
    likedSongs: [],
    userPlaylists: [],
    searchQuery: '',
    userInfo: {
        username: '',
        email: '',
        isPremium: false,
        joinedDate: ''
    },
    theme: 'dark'
};

// ==========================================
// AUDIO ENGINE
// ==========================================

let audio = new Audio();
audio.volume = state.volume;
audio.preload = 'auto';

// Save/restore state from localStorage
function saveState() {
    const saveData = {
        currentSongIndex: state.currentSongIndex,
        volume: state.volume,
        isShuffle: state.isShuffle,
        repeatMode: state.repeatMode,
        currentTime: audio.currentTime
    };
    localStorage.setItem('soundwave_state', JSON.stringify(saveData));
}

function restoreState() {
    try {
        const saved = JSON.parse(localStorage.getItem('soundwave_state'));
        if (saved) {
            state.volume = saved.volume ?? 0.7;
            state.isShuffle = saved.isShuffle ?? false;
            state.repeatMode = saved.repeatMode ?? 0;
            audio.volume = state.volume;
        }
    } catch (e) {
        // Ignore parse errors
    }
}

// ==========================================
// PLAYER CONTROLS
// ==========================================

function playSong(index) {
    if (index < 0 || index >= SONGS.length) return;
    
    const song = SONGS[index];
    state.currentSongIndex = index;
    state.isPlaying = true;

    audio.src = song.audio;
    audio.play().catch(err => {
        console.log('Playback failed:', err.message);
        // Show visual feedback even if audio can't play (CORS etc.)
    });

    updatePlayerUI(song);
    highlightCurrentSong();
    saveState();
}

function togglePlayPause() {
    if (state.currentSongIndex === null) {
        // Play first song if nothing selected
        playSong(0);
        return;
    }

    if (state.isPlaying) {
        audio.pause();
        state.isPlaying = false;
    } else {
        audio.play().catch(() => {});
        state.isPlaying = true;
    }

    updatePlayPauseButton();
    saveState();
}

function nextSong() {
    if (state.queue.length === 0) buildQueue();
    
    let nextIndex;
    if (state.isShuffle) {
        const available = state.queue.filter(i => i !== state.currentSongIndex);
        nextIndex = available[Math.floor(Math.random() * available.length)] ?? 0;
    } else {
        const currentPos = state.queue.indexOf(state.currentSongIndex);
        nextIndex = state.queue[(currentPos + 1) % state.queue.length];
    }
    
    playSong(nextIndex);
}

function prevSong() {
    // If more than 3 seconds in, restart current song
    if (audio.currentTime > 3) {
        audio.currentTime = 0;
        return;
    }

    if (state.queue.length === 0) buildQueue();
    
    const currentPos = state.queue.indexOf(state.currentSongIndex);
    const prevIndex = state.queue[(currentPos - 1 + state.queue.length) % state.queue.length];
    playSong(prevIndex);
}

function buildQueue() {
    state.queue = SONGS.map((_, i) => i);
}

function toggleShuffle() {
    state.isShuffle = !state.isShuffle;
    const btn = document.querySelector('.shuffle-btn');
    if (btn) btn.classList.toggle('active', state.isShuffle);
    saveState();
}

function toggleRepeat() {
    state.repeatMode = (state.repeatMode + 1) % 3;
    const btn = document.querySelector('.repeat-btn');
    if (btn) {
        btn.classList.toggle('active', state.repeatMode > 0);
        btn.innerHTML = state.repeatMode === 2 
            ? '<svg width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M0 4.75A3.75 3.75 0 013.75 1h8.5A3.75 3.75 0 0116 4.75v5a3.75 3.75 0 01-3.75 3.75H9.81l1.018 1.018a.75.75 0 11-1.06 1.06L7.939 13.75l1.829-1.828a.75.75 0 111.06 1.06L9.81 14h2.44a2.25 2.25 0 002.25-2.25v-5a2.25 2.25 0 00-2.25-2.25h-8.5A2.25 2.25 0 001.5 6.75v5A2.25 2.25 0 003.75 14H5v1.5H3.75A3.75 3.75 0 010 11.75v-5z"/><text x="8" y="10" text-anchor="middle" font-size="7" fill="currentColor" font-weight="bold">1</text></svg>'
            : '🔁';
    }
    saveState();
}

function seekTo(e) {
    const bar = e.currentTarget;
    const rect = bar.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    if (audio.duration) {
        audio.currentTime = percent * audio.duration;
    }
}

function setVolume(e) {
    const bar = e.currentTarget;
    const rect = bar.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    state.volume = percent;
    audio.volume = percent;
    updateVolumeUI();
    saveState();
}

// ==========================================
// PLAYER UI UPDATES
// ==========================================

function updatePlayerUI(song) {
    const coverEl = document.getElementById('player-cover');
    const titleEl = document.getElementById('player-title');
    const artistEl = document.getElementById('player-artist');

    if (coverEl) {
        if (song.cover) {
            coverEl.src = song.cover;
            coverEl.style.display = 'block';
            coverEl.classList.remove(...coverEl.classList);
            coverEl.classList.add('player-cover');
            if (state.isPlaying) coverEl.classList.add('playing');
        } else {
            // Use a gradient div
            coverEl.style.display = 'block';
            coverEl.src = 'data:image/svg+xml,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:${getGradientColors(song.gradient)[0]}"/><stop offset="100%" style="stop-color:${getGradientColors(song.gradient)[1]}"/></linearGradient></defs><rect width="56" height="56" fill="url(#g)" rx="4"/><text x="28" y="34" text-anchor="middle" font-size="20" fill="rgba(255,255,255,0.7)">♪</text></svg>`);
        }
    }

    if (titleEl) titleEl.textContent = song.title;
    if (artistEl) artistEl.textContent = song.artist;

    updatePlayPauseButton();
}

function updatePlayPauseButton() {
    const btn = document.getElementById('play-pause-btn');
    if (btn) {
        btn.innerHTML = state.isPlaying 
            ? '<svg width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M2.7 1a.7.7 0 00-.7.7v12.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7H2.7zm8 0a.7.7 0 00-.7.7v12.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7h-2.6z"/></svg>'
            : '<svg width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M3 1.713a.7.7 0 011.05-.607l10.89 6.288a.7.7 0 010 1.212L4.05 14.894A.7.7 0 013 14.288V1.713z"/></svg>';
    }

    const coverEl = document.getElementById('player-cover');
    if (coverEl) {
        coverEl.classList.toggle('playing', state.isPlaying);
    }
}

function updateProgressUI() {
    const fill = document.getElementById('progress-fill');
    const currentTimeEl = document.getElementById('current-time');
    const durationEl = document.getElementById('duration-time');

    if (audio.duration && fill) {
        const percent = (audio.currentTime / audio.duration) * 100;
        fill.style.width = percent + '%';
    }

    if (currentTimeEl) currentTimeEl.textContent = formatTime(audio.currentTime);
    if (durationEl) durationEl.textContent = formatTime(audio.duration || 0);
}

function updateVolumeUI() {
    const fill = document.getElementById('volume-fill');
    const btn = document.querySelector('.volume-btn');

    if (fill) fill.style.width = (state.volume * 100) + '%';
    if (btn) {
        if (state.volume === 0) btn.innerHTML = '🔇';
        else if (state.volume < 0.5) btn.innerHTML = '🔉';
        else btn.innerHTML = '🔊';
    }
}

function highlightCurrentSong() {
    // Remove all playing highlights
    document.querySelectorAll('.music-card.now-playing').forEach(el => el.classList.remove('now-playing'));
    document.querySelectorAll('.song-row.playing').forEach(el => el.classList.remove('playing'));

    // Add to current
    if (state.currentSongIndex !== null) {
        document.querySelectorAll(`[data-song-id="${state.currentSongIndex}"]`).forEach(el => {
            if (el.classList.contains('music-card')) el.classList.add('now-playing');
            if (el.classList.contains('song-row')) el.classList.add('playing');
        });
    }
}

// ==========================================
// AUDIO EVENTS
// ==========================================

audio.addEventListener('timeupdate', updateProgressUI);

audio.addEventListener('ended', () => {
    if (state.repeatMode === 2) {
        // Repeat one
        audio.currentTime = 0;
        audio.play();
    } else if (state.repeatMode === 1) {
        // Repeat all
        nextSong();
    } else {
        // Check if last song
        const currentPos = state.queue.indexOf(state.currentSongIndex);
        if (currentPos < state.queue.length - 1) {
            nextSong();
        } else {
            state.isPlaying = false;
            updatePlayPauseButton();
        }
    }
});

audio.addEventListener('loadedmetadata', () => {
    updateProgressUI();
});

// ==========================================
// UI RENDERING
// ==========================================

function renderHome() {
    const content = document.getElementById('content-area');
    if (!content) return;

    state.currentView = 'home';
    updateNavActive('home');

    content.innerHTML = `
        <!-- Hero Banner -->
        <div class="hero-banner">
            <div class="hero-label">✨ Featured Playlist</div>
            <h1 class="hero-title">Midnight<br>Dreams Mix</h1>
            <p class="hero-description">A curated blend of synthwave, lo-fi beats, and dreamy electronic music to carry you through the night.</p>
            <button class="hero-play-btn" onclick="playPlaylist('featured-2')">
                <svg width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M3 1.713a.7.7 0 011.05-.607l10.89 6.288a.7.7 0 010 1.212L4.05 14.894A.7.7 0 013 14.288V1.713z"/></svg>
                Play Now
            </button>
        </div>

        <!-- Featured Playlists -->
        <div class="section">
            <div class="section-header">
                <h2 class="section-title">Featured Playlists</h2>
                <a href="#" class="section-link" onclick="event.preventDefault()">Show all</a>
            </div>
            <div class="featured-grid">
                ${DEFAULT_PLAYLISTS.slice(0, 3).map(pl => `
                    <div class="featured-card" onclick="showPlaylist('${pl.id}')">
                        <div class="${pl.gradient}" style="position:absolute;top:0;left:0;width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:64px;color:rgba(255,255,255,0.2);">♪</div>
                        <div class="overlay"></div>
                        <div class="featured-card-content">
                            <div class="featured-card-title">${pl.name}</div>
                            <div class="featured-card-subtitle">${pl.description}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>

        <!-- Recently Played -->
        <div class="section">
            <div class="section-header">
                <h2 class="section-title">Recently Played</h2>
                <a href="#" class="section-link" onclick="event.preventDefault()">Show all</a>
            </div>
            <div class="card-grid">
                ${SONGS.slice(0, 6).map(song => renderMusicCard(song)).join('')}
            </div>
        </div>

        <!-- Popular Artists -->
        <div class="section">
            <div class="section-header">
                <h2 class="section-title">Popular Artists</h2>
                <a href="#" class="section-link" onclick="event.preventDefault()">Show all</a>
            </div>
            <div class="artist-grid">
                ${ARTISTS.map(artist => `
                    <div class="artist-card" onclick="showArtistSongs('${artist.name}')">
                        <div class="artist-avatar">
                            <div class="${artist.gradient} gradient-cover-icon" style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:40px;color:rgba(255,255,255,0.6);">🎤</div>
                        </div>
                        <div class="artist-name">${artist.name}</div>
                        <div class="artist-genre">${artist.genre} · ${artist.followers}</div>
                    </div>
                `).join('')}
            </div>
        </div>

        <!-- Trending Albums -->
        <div class="section">
            <div class="section-header">
                <h2 class="section-title">Trending Albums</h2>
                <a href="#" class="section-link" onclick="event.preventDefault()">Show all</a>
            </div>
            <div class="card-grid">
                ${SONGS.slice(6, 12).map(song => renderMusicCard(song)).join('')}
            </div>
        </div>

        <!-- Recommended For You -->
        <div class="section">
            <div class="section-header">
                <h2 class="section-title">Recommended For You</h2>
                <a href="#" class="section-link" onclick="event.preventDefault()">Show all</a>
            </div>
            <div class="card-grid">
                ${shuffleArray([...SONGS]).slice(0, 6).map(song => renderMusicCard(song)).join('')}
            </div>
        </div>
    `;

    highlightCurrentSong();
}

function renderMusicCard(song) {
    const isPlaying = state.currentSongIndex === song.id;
    const coverHTML = song.cover 
        ? `<img src="${song.cover}" alt="${song.title}" loading="lazy">`
        : `<div class="${song.gradient} gradient-cover-icon" style="position:absolute;top:0;left:0;width:100%;height:100%;">♪</div>`;

    return `
        <div class="music-card ${isPlaying ? 'now-playing' : ''}" data-song-id="${song.id}" onclick="playSong(${song.id})" oncontextmenu="showContextMenu(event, ${song.id})">
            <div class="card-cover">
                ${coverHTML}
                <button class="card-play-btn" onclick="event.stopPropagation(); playSong(${song.id})">
                    <svg width="20" height="20" viewBox="0 0 16 16"><path fill="currentColor" d="M3 1.713a.7.7 0 011.05-.607l10.89 6.288a.7.7 0 010 1.212L4.05 14.894A.7.7 0 013 14.288V1.713z"/></svg>
                </button>
            </div>
            <div class="card-title">${song.title}</div>
            <div class="card-subtitle">${song.artist}</div>
        </div>
    `;
}

function renderSongRow(song, index) {
    const isPlaying = state.currentSongIndex === song.id;
    return `
        <div class="song-row ${isPlaying ? 'playing' : ''}" data-song-id="${song.id}" onclick="playSong(${song.id})">
            <div class="song-number" style="position:relative;">${index + 1}</div>
            <div class="song-info">
                ${song.cover 
                    ? `<img src="${song.cover}" alt="${song.title}" class="song-thumb" loading="lazy">`
                    : `<div class="${song.gradient} song-thumb gradient-cover-icon small" style="display:flex;align-items:center;justify-content:center;border-radius:4px;">♪</div>`
                }
                <div class="song-details">
                    <div class="song-name">${song.title}</div>
                    <div class="song-artist-name">${song.artist}</div>
                </div>
            </div>
            <div class="song-album">${song.album}</div>
            <div class="song-duration">${formatTime(song.duration)}</div>
        </div>
    `;
}

// ==========================================
// SEARCH
// ==========================================

let searchDebounce = null;

function handleSearch(query) {
    clearTimeout(searchDebounce);
    state.searchQuery = query;

    searchDebounce = setTimeout(() => {
        if (query.trim() === '') {
            renderHome();
            return;
        }

        const q = query.toLowerCase();
        
        // Search songs
        const matchedSongs = SONGS.filter(s => 
            s.title.toLowerCase().includes(q) || 
            s.artist.toLowerCase().includes(q) || 
            s.album.toLowerCase().includes(q)
        );

        // Search playlists
        const matchedPlaylists = DEFAULT_PLAYLISTS.filter(p => 
            p.name.toLowerCase().includes(q) || 
            p.description.toLowerCase().includes(q)
        );

        // Search artists
        const matchedArtists = ARTISTS.filter(a => 
            a.name.toLowerCase().includes(q) || 
            a.genre.toLowerCase().includes(q)
        );

        renderSearchResults(matchedSongs, matchedPlaylists, matchedArtists, query);
    }, 300);
}

function renderSearchResults(songs, playlists, artists, query) {
    const content = document.getElementById('content-area');
    if (!content) return;
    
    state.currentView = 'search';
    updateNavActive('search');

    if (songs.length === 0 && playlists.length === 0 && artists.length === 0) {
        content.innerHTML = `
            <div class="search-empty">
                <div class="icon">🔍</div>
                <h3>No results found for "${escapeHTML(query)}"</h3>
                <p>Try searching for something else</p>
            </div>
        `;
        return;
    }

    let html = `<div class="search-results-inner fade-in">`;
    html += `<h2 class="section-title mb-3">Results for "${escapeHTML(query)}"</h2>`;

    if (songs.length > 0) {
        html += `
            <div class="section">
                <div class="section-header">
                    <h3 class="search-category-title">Songs</h3>
                </div>
                <div class="song-list">
                    ${songs.map((song, i) => renderSongRow(song, i)).join('')}
                </div>
            </div>
        `;
    }

    if (artists.length > 0) {
        html += `
            <div class="section">
                <div class="section-header">
                    <h3 class="search-category-title">Artists</h3>
                </div>
                <div class="artist-grid">
                    ${artists.map(artist => `
                        <div class="artist-card" onclick="showArtistSongs('${artist.name}')">
                            <div class="artist-avatar">
                                <div class="${artist.gradient} gradient-cover-icon" style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:40px;color:rgba(255,255,255,0.6);">🎤</div>
                            </div>
                            <div class="artist-name">${artist.name}</div>
                            <div class="artist-genre">${artist.genre}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    if (playlists.length > 0) {
        html += `
            <div class="section">
                <div class="section-header">
                    <h3 class="search-category-title">Playlists</h3>
                </div>
                <div class="card-grid">
                    ${playlists.map(pl => `
                        <div class="music-card" onclick="showPlaylist('${pl.id}')">
                            <div class="card-cover">
                                <div class="${pl.gradient} gradient-cover-icon" style="position:absolute;top:0;left:0;width:100%;height:100%;">♪</div>
                            </div>
                            <div class="card-title">${pl.name}</div>
                            <div class="card-subtitle">${pl.description}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    html += '</div>';
    content.innerHTML = html;
    highlightCurrentSong();
}

// ==========================================
// LIBRARY VIEW
// ==========================================

function renderLibrary() {
    const content = document.getElementById('content-area');
    if (!content) return;

    state.currentView = 'library';
    updateNavActive('library');

    content.innerHTML = `
        <div class="fade-in">
            <div class="section">
                <div class="section-header">
                    <h2 class="section-title">Your Library</h2>
                </div>
            </div>

            <!-- Playlists -->
            <div class="section">
                <div class="section-header">
                    <h3 class="search-category-title">Playlists</h3>
                </div>
                <div class="card-grid">
                    <!-- Liked Songs card -->
                    <div class="music-card" onclick="showLikedSongs()">
                        <div class="card-cover">
                            <div class="gradient-cover-3 gradient-cover-icon" style="position:absolute;top:0;left:0;width:100%;height:100%;">❤️</div>
                        </div>
                        <div class="card-title">Liked Songs</div>
                        <div class="card-subtitle">${state.likedSongs.length} songs</div>
                    </div>
                    ${DEFAULT_PLAYLISTS.map(pl => `
                        <div class="music-card" onclick="showPlaylist('${pl.id}')">
                            <div class="card-cover">
                                <div class="${pl.gradient} gradient-cover-icon" style="position:absolute;top:0;left:0;width:100%;height:100%;">♪</div>
                            </div>
                            <div class="card-title">${pl.name}</div>
                            <div class="card-subtitle">${pl.songIds.length} songs</div>
                        </div>
                    `).join('')}
                    ${state.userPlaylists.map(pl => `
                        <div class="music-card" onclick="showUserPlaylist(${pl.id})">
                            <div class="card-cover">
                                <div class="gradient-cover-6 gradient-cover-icon" style="position:absolute;top:0;left:0;width:100%;height:100%;">♪</div>
                            </div>
                            <div class="card-title">${escapeHTML(pl.name)}</div>
                            <div class="card-subtitle">Playlist</div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- All Songs -->
            <div class="section">
                <div class="section-header">
                    <h3 class="search-category-title">All Songs</h3>
                </div>
                <div class="song-list">
                    <div class="song-list-header">
                        <span>#</span>
                        <span>Title</span>
                        <span>Album</span>
                        <span>⏱</span>
                    </div>
                    ${SONGS.map((song, i) => renderSongRow(song, i)).join('')}
                </div>
            </div>
        </div>
    `;

    highlightCurrentSong();
}

// ==========================================
// PLAYLIST VIEW
// ==========================================

function showPlaylist(playlistId) {
    const playlist = DEFAULT_PLAYLISTS.find(p => p.id === playlistId);
    if (!playlist) return;

    state.currentView = 'playlist';
    state.currentPlaylist = playlist;

    const songs = playlist.songIds.map(id => SONGS[id]).filter(Boolean);
    const content = document.getElementById('content-area');
    if (!content) return;

    content.innerHTML = `
        <div class="fade-in">
            <div class="playlist-header-info">
                <div class="${playlist.gradient} playlist-cover-large gradient-cover-icon" style="display:flex;align-items:center;justify-content:center;font-size:64px;color:rgba(255,255,255,0.5);">♪</div>
                <div class="playlist-meta">
                    <p class="card-subtitle" style="margin-bottom:4px;">PLAYLIST</p>
                    <h1>${playlist.name}</h1>
                    <p class="playlist-desc">${playlist.description}</p>
                    <p class="playlist-stats"><span>${songs.length} songs</span> · about ${Math.floor(songs.reduce((a, s) => a + s.duration, 0) / 60)} min</p>
                </div>
            </div>

            <div class="playlist-actions">
                <button class="play-all-btn" onclick="playPlaylist('${playlistId}')">
                    <svg width="22" height="22" viewBox="0 0 16 16"><path fill="currentColor" d="M3 1.713a.7.7 0 011.05-.607l10.89 6.288a.7.7 0 010 1.212L4.05 14.894A.7.7 0 013 14.288V1.713z"/></svg>
                </button>
            </div>

            <div class="song-list">
                <div class="song-list-header">
                    <span>#</span>
                    <span>Title</span>
                    <span>Album</span>
                    <span>⏱</span>
                </div>
                ${songs.map((song, i) => renderSongRow(song, i)).join('')}
            </div>
        </div>
    `;

    highlightCurrentSong();
}

function showUserPlaylist(playlistId) {
    // Fetch songs from backend
    fetch(`includes/auth.php?api=get_playlist_songs&playlist_id=${playlistId}`)
        .then(r => r.json())
        .then(songIndices => {
            const pl = state.userPlaylists.find(p => p.id == playlistId);
            const songs = songIndices.map(i => SONGS[i]).filter(Boolean);
            const content = document.getElementById('content-area');
            if (!content) return;

            state.currentView = 'playlist';

            content.innerHTML = `
                <div class="fade-in">
                    <div class="playlist-header-info">
                        <div class="gradient-cover-6 playlist-cover-large gradient-cover-icon" style="display:flex;align-items:center;justify-content:center;font-size:64px;color:rgba(255,255,255,0.5);">♪</div>
                        <div class="playlist-meta">
                            <p class="card-subtitle" style="margin-bottom:4px;">PLAYLIST</p>
                            <h1>${escapeHTML(pl ? pl.name : 'My Playlist')}</h1>
                            <p class="playlist-desc">${escapeHTML(pl ? (pl.description || '') : '')}</p>
                            <p class="playlist-stats"><span>${songs.length} songs</span></p>
                        </div>
                    </div>

                    <div class="playlist-actions">
                        <button class="play-all-btn" onclick="playUserPlaylist(${playlistId})">
                            <svg width="22" height="22" viewBox="0 0 16 16"><path fill="currentColor" d="M3 1.713a.7.7 0 011.05-.607l10.89 6.288a.7.7 0 010 1.212L4.05 14.894A.7.7 0 013 14.288V1.713z"/></svg>
                        </button>
                        <button class="control-btn" onclick="deletePlaylist(${playlistId})" title="Delete Playlist" style="color:var(--danger);font-size:20px;">🗑️</button>
                    </div>

                    <div class="song-list">
                        <div class="song-list-header">
                            <span>#</span>
                            <span>Title</span>
                            <span>Album</span>
                            <span>⏱</span>
                        </div>
                        ${songs.length > 0 
                            ? songs.map((song, i) => renderSongRow(song, i)).join('') 
                            : '<p style="padding:20px;color:var(--text-muted);">No songs in this playlist yet. Right-click on any song to add it here.</p>'}
                    </div>
                </div>
            `;

            highlightCurrentSong();
        })
        .catch(err => {
            console.log('Failed to load playlist:', err);
        });
}

function playPlaylist(playlistId) {
    const playlist = DEFAULT_PLAYLISTS.find(p => p.id === playlistId);
    if (!playlist || playlist.songIds.length === 0) return;

    state.queue = [...playlist.songIds];
    playSong(state.queue[0]);
}

function playUserPlaylist(playlistId) {
    fetch(`includes/auth.php?api=get_playlist_songs&playlist_id=${playlistId}`)
        .then(r => r.json())
        .then(songIndices => {
            if (songIndices.length > 0) {
                state.queue = songIndices;
                playSong(songIndices[0]);
            }
        });
}

// ==========================================
// LIKED SONGS
// ==========================================

function showLikedSongs() {
    state.currentView = 'liked';
    updateNavActive('liked');

    const songs = state.likedSongs.map(i => SONGS[i]).filter(Boolean);
    const content = document.getElementById('content-area');
    if (!content) return;

    content.innerHTML = `
        <div class="fade-in">
            <div class="playlist-header-info">
                <div class="gradient-cover-3 playlist-cover-large gradient-cover-icon" style="display:flex;align-items:center;justify-content:center;font-size:64px;color:rgba(255,255,255,0.5);">❤️</div>
                <div class="playlist-meta">
                    <p class="card-subtitle" style="margin-bottom:4px;">PLAYLIST</p>
                    <h1>Liked Songs</h1>
                    <p class="playlist-stats"><span>${songs.length} songs</span></p>
                </div>
            </div>

            <div class="playlist-actions">
                <button class="play-all-btn" onclick="playLikedSongs()">
                    <svg width="22" height="22" viewBox="0 0 16 16"><path fill="currentColor" d="M3 1.713a.7.7 0 011.05-.607l10.89 6.288a.7.7 0 010 1.212L4.05 14.894A.7.7 0 013 14.288V1.713z"/></svg>
                </button>
            </div>

            <div class="song-list">
                <div class="song-list-header">
                    <span>#</span>
                    <span>Title</span>
                    <span>Album</span>
                    <span>⏱</span>
                </div>
                ${songs.length > 0 
                    ? songs.map((song, i) => renderSongRow(song, i)).join('') 
                    : '<p style="padding:20px;color:var(--text-muted);">Songs you like will appear here. Click the heart icon on any song to add it.</p>'}
            </div>
        </div>
    `;

    highlightCurrentSong();
}

function playLikedSongs() {
    if (state.likedSongs.length > 0) {
        state.queue = [...state.likedSongs];
        playSong(state.queue[0]);
    }
}

function toggleLike(songIndex) {
    const idx = state.likedSongs.indexOf(songIndex);
    if (idx > -1) {
        state.likedSongs.splice(idx, 1);
        showToast('Removed from Liked Songs');
    } else {
        state.likedSongs.push(songIndex);
        showToast('Added to Liked Songs', 'success');
    }

    // Sync with backend
    fetch('includes/auth.php?api=toggle_like', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ song_index: songIndex })
    }).catch(() => {});

    // Update like button
    updateLikeButton(songIndex);
    updateSidebarPlaylistCount();
}

function updateLikeButton(songIndex) {
    const playerLike = document.querySelector('.player-like-btn');
    if (playerLike && state.currentSongIndex === songIndex) {
        playerLike.classList.toggle('liked', state.likedSongs.includes(songIndex));
        playerLike.innerHTML = state.likedSongs.includes(songIndex) ? '❤️' : '🤍';
    }
}

// ==========================================
// ARTIST VIEW
// ==========================================

function showArtistSongs(artistName) {
    const artist = ARTISTS.find(a => a.name === artistName);
    if (!artist) return;

    state.currentView = 'artist';
    const songs = artist.songIds.map(id => SONGS[id]).filter(Boolean);
    const content = document.getElementById('content-area');
    if (!content) return;

    content.innerHTML = `
        <div class="fade-in">
            <div class="playlist-header-info">
                <div class="${artist.gradient} playlist-cover-large gradient-cover-icon" style="border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:64px;color:rgba(255,255,255,0.5);">🎤</div>
                <div class="playlist-meta">
                    <p class="card-subtitle" style="margin-bottom:4px;">ARTIST</p>
                    <h1>${artist.name}</h1>
                    <p class="playlist-stats">${artist.genre} · <span>${artist.followers} followers</span></p>
                </div>
            </div>

            <div class="playlist-actions">
                <button class="play-all-btn" onclick="playArtist('${artist.name}')">
                    <svg width="22" height="22" viewBox="0 0 16 16"><path fill="currentColor" d="M3 1.713a.7.7 0 011.05-.607l10.89 6.288a.7.7 0 010 1.212L4.05 14.894A.7.7 0 013 14.288V1.713z"/></svg>
                </button>
            </div>

            <div class="section">
                <h3 class="search-category-title mb-2">Popular</h3>
                <div class="song-list">
                    ${songs.map((song, i) => renderSongRow(song, i)).join('')}
                </div>
            </div>
        </div>
    `;

    highlightCurrentSong();
}

function playArtist(artistName) {
    const artist = ARTISTS.find(a => a.name === artistName);
    if (artist && artist.songIds.length > 0) {
        state.queue = [...artist.songIds];
        playSong(state.queue[0]);
    }
}

// ==========================================
// CONTEXT MENU
// ==========================================

function showContextMenu(event, songIndex) {
    event.preventDefault();
    event.stopPropagation();

    removeContextMenu();

    const menu = document.createElement('div');
    menu.className = 'context-menu';
    menu.id = 'context-menu';

    const isLiked = state.likedSongs.includes(songIndex);

    let playlistItems = '';
    // Default playlists
    DEFAULT_PLAYLISTS.forEach(pl => {
        playlistItems += `<div class="context-menu-item" onclick="addToDefaultPlaylist('${pl.id}', ${songIndex})">📁 ${pl.name}</div>`;
    });
    // User playlists
    state.userPlaylists.forEach(pl => {
        playlistItems += `<div class="context-menu-item" onclick="addToUserPlaylist(${pl.id}, ${songIndex})">📁 ${escapeHTML(pl.name)}</div>`;
    });

    menu.innerHTML = `
        <div class="context-menu-item" onclick="playSong(${songIndex}); removeContextMenu();">▶️ Play</div>
        <div class="context-menu-item" onclick="addToQueue(${songIndex}); removeContextMenu();">📋 Add to Queue</div>
        <div class="context-menu-item" onclick="toggleLike(${songIndex}); removeContextMenu();">${isLiked ? '💔 Remove from Liked' : '❤️ Like Song'}</div>
        <div style="height:1px;background:rgba(255,255,255,0.08);margin:4px 8px;"></div>
        <div class="context-menu-item" style="color:var(--text-muted);font-size:11px;pointer-events:none;">ADD TO PLAYLIST</div>
        ${playlistItems}
    `;

    // Position
    const x = Math.min(event.clientX, window.innerWidth - 220);
    const y = Math.min(event.clientY, window.innerHeight - 300);
    menu.style.left = x + 'px';
    menu.style.top = y + 'px';

    document.body.appendChild(menu);

    // Close on click outside
    setTimeout(() => {
        document.addEventListener('click', removeContextMenu, { once: true });
    }, 10);
}

function removeContextMenu() {
    const menu = document.getElementById('context-menu');
    if (menu) menu.remove();
}

function addToQueue(songIndex) {
    if (!state.queue.includes(songIndex)) {
        state.queue.push(songIndex);
    }
    showToast(`Added "${SONGS[songIndex].title}" to queue`, 'success');
}

function addToDefaultPlaylist(playlistId, songIndex) {
    const pl = DEFAULT_PLAYLISTS.find(p => p.id === playlistId);
    if (pl && !pl.songIds.includes(songIndex)) {
        pl.songIds.push(songIndex);
        showToast(`Added to "${pl.name}"`, 'success');
    } else {
        showToast('Already in playlist');
    }
    removeContextMenu();
}

function addToUserPlaylist(playlistId, songIndex) {
    fetch('includes/auth.php?api=add_to_playlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playlist_id: playlistId, song_index: songIndex })
    })
    .then(r => r.json())
    .then(data => {
        if (data.success) {
            showToast('Added to playlist', 'success');
        } else {
            showToast('Already in playlist');
        }
    });
    removeContextMenu();
}

// ==========================================
// CREATE PLAYLIST MODAL
// ==========================================

function showCreatePlaylistModal() {
    const overlay = document.getElementById('modal-overlay');
    if (!overlay) return;

    overlay.innerHTML = `
        <div class="modal">
            <div class="modal-header">
                <h3 class="modal-title">Create Playlist</h3>
                <button class="modal-close" onclick="closeModal()">✕</button>
            </div>
            <div class="form-group">
                <label>Playlist Name</label>
                <input type="text" id="playlist-name-input" placeholder="My Awesome Playlist" autofocus>
            </div>
            <div class="form-group">
                <label>Description (optional)</label>
                <input type="text" id="playlist-desc-input" placeholder="Add a description">
            </div>
            <button class="btn-primary" onclick="createPlaylist()" style="margin-top:8px;">Create</button>
        </div>
    `;

    overlay.classList.add('show');

    // Focus input
    setTimeout(() => {
        const input = document.getElementById('playlist-name-input');
        if (input) input.focus();
    }, 100);
}

function closeModal() {
    const overlay = document.getElementById('modal-overlay');
    if (overlay) overlay.classList.remove('show');
}

function createPlaylist() {
    const nameInput = document.getElementById('playlist-name-input');
    const descInput = document.getElementById('playlist-desc-input');
    const name = nameInput ? nameInput.value.trim() : '';
    const desc = descInput ? descInput.value.trim() : '';

    if (!name) {
        showToast('Please enter a playlist name', 'error');
        return;
    }

    fetch('includes/auth.php?api=create_playlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description: desc })
    })
    .then(r => r.json())
    .then(data => {
        if (data.success) {
            state.userPlaylists.push({ id: data.id, name, description: desc });
            updateSidebarPlaylists();
            closeModal();
            showToast(`Playlist "${name}" created!`, 'success');
        }
    })
    .catch(() => {
        // Offline fallback
        const fakeId = Date.now();
        state.userPlaylists.push({ id: fakeId, name, description: desc });
        updateSidebarPlaylists();
        closeModal();
        showToast(`Playlist "${name}" created!`, 'success');
    });
}

function deletePlaylist(playlistId) {
    if (!confirm('Delete this playlist?')) return;

    fetch('includes/auth.php?api=delete_playlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playlist_id: playlistId })
    }).catch(() => {});

    state.userPlaylists = state.userPlaylists.filter(p => p.id != playlistId);
    updateSidebarPlaylists();
    renderLibrary();
    showToast('Playlist deleted', 'success');
}

// ==========================================
// SIDEBAR
// ==========================================

function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    sidebar.classList.toggle('open');
    overlay.classList.toggle('show');
}

function closeSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    sidebar.classList.remove('open');
    overlay.classList.remove('show');
}

function updateNavActive(view) {
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    const navEl = document.querySelector(`.nav-item[data-view="${view}"]`);
    if (navEl) navEl.classList.add('active');
}

function updateSidebarPlaylists() {
    const container = document.getElementById('sidebar-playlist-list');
    if (!container) return;

    let html = '';
    state.userPlaylists.forEach(pl => {
        html += `
            <div class="sidebar-playlist-item" onclick="showUserPlaylist(${pl.id})">
                <div class="gradient-cover-6 playlist-thumb gradient-cover-icon small" style="display:flex;align-items:center;justify-content:center;">♪</div>
                <span class="playlist-name">${escapeHTML(pl.name)}</span>
            </div>
        `;
    });

    container.innerHTML = html;
}

function updateSidebarPlaylistCount() {
    const likedCount = document.getElementById('liked-songs-count');
    if (likedCount) likedCount.textContent = `${state.likedSongs.length} songs`;
}

// ==========================================
// PROFILE DROPDOWN
// ==========================================

function toggleProfileDropdown() {
    const dropdown = document.getElementById('profile-dropdown-menu');
    if (dropdown) dropdown.classList.toggle('show');
}

// Close dropdown on outside click
document.addEventListener('click', (e) => {
    const dropdown = document.getElementById('profile-dropdown-menu');
    const btn = document.querySelector('.profile-btn');
    if (dropdown && btn && !btn.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.remove('show');
    }
});

// ==========================================
// TOAST NOTIFICATIONS
// ==========================================

function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span>${message}</span>`;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ==========================================
// ACCOUNT & SETTINGS VIEWS
// ==========================================

function renderAccount() {
    const content = document.getElementById('content-area');
    if (!content) return;

    state.currentView = 'account';
    updateNavActive('');

    content.innerHTML = `
        <div class="fade-in">
            <div class="section">
                <h2 class="section-title">Account Overview</h2>
                <div class="account-card">
                    <div class="account-profile-header">
                        <div class="profile-avatar large">${state.userInfo.username.charAt(0).toUpperCase()}</div>
                        <div class="profile-info">
                            <h3>${escapeHTML(state.userInfo.username)}</h3>
                            <p>${state.userInfo.isPremium ? '<span class="premium-badge">PREMIUM</span>' : 'Free Plan'}</p>
                        </div>
                    </div>
                    
                    <div class="account-details-grid">
                        <div class="detail-item">
                            <label>Username</label>
                            <input type="text" id="edit-username" value="${escapeHTML(state.userInfo.username)}">
                        </div>
                        <div class="detail-item">
                            <label>Email</label>
                            <input type="email" id="edit-email" value="${escapeHTML(state.userInfo.email)}">
                        </div>
                        <div class="detail-item">
                            <label>Joined</label>
                            <p>${new Date(state.userInfo.joinedDate).toLocaleDateString()}</p>
                        </div>
                    </div>
                    
                    <button class="btn-primary" onclick="updateProfile()" style="width: auto; padding: 12px 32px; margin-top: 24px;">Save Changes</button>
                </div>
            </div>
        </div>
    `;
}

function renderSettings() {
    const content = document.getElementById('content-area');
    if (!content) return;

    state.currentView = 'settings';
    updateNavActive('settings');

    content.innerHTML = `
        <div class="fade-in">
            <div class="section">
                <h2 class="section-title">Settings</h2>
                
                <div class="settings-group">
                    <h3>Playback</h3>
                    <div class="settings-item">
                        <span>Audio Quality</span>
                        <select id="setting-quality" onchange="showToast('Audio quality updated')">
                            <option value="low">Low (96kbps)</option>
                            <option value="normal" selected>Normal (160kbps)</option>
                            <option value="high">High (320kbps)</option>
                        </select>
                    </div>
                    <div class="settings-item">
                        <span>Normalize volume</span>
                        <label class="switch">
                            <input type="checkbox" checked onchange="showToast('Normalization toggled')">
                            <span class="slider round"></span>
                        </label>
                    </div>
                </div>

                <div class="settings-group">
                    <h3>Display</h3>
                    <div class="settings-item">
                        <span>Light Mode (Experimental)</span>
                        <label class="switch">
                            <input type="checkbox" ${state.theme === 'light' ? 'checked' : ''} onchange="toggleTheme()">
                            <span class="slider round"></span>
                        </label>
                    </div>
                </div>

                <div class="settings-group">
                    <h3>Data Management</h3>
                    <div class="settings-item">
                        <span style="color: var(--danger);">Delete Account</span>
                        <button class="btn-primary" onclick="deleteAccount()" style="background: var(--danger); width: auto; padding: 8px 20px;">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function showUpgradeModal() {
    const overlay = document.getElementById('modal-overlay');
    if (!overlay) return;

    overlay.innerHTML = `
        <div class="modal upgrade-modal" style="background: linear-gradient(135deg, #1db954, #191414); max-width: 550px;">
            <div class="modal-header">
                <h3 class="modal-title" style="color: #000; font-size: 28px;">Go Premium</h3>
                <button class="modal-close" onclick="closeModal()" style="color: #000;">✕</button>
            </div>
            <div style="color: #000; margin-bottom: 24px;">
                <p style="font-size: 18px; font-weight: 600; margin-bottom: 16px;">Elevate your listening experience:</p>
                <ul style="list-style: none; padding: 0;">
                    <li style="margin-bottom: 8px;">✨ Ad-free music listening</li>
                    <li style="margin-bottom: 8px;">✨ Play any track anytime</li>
                    <li style="margin-bottom: 8px;">✨ High fidelity audio (320kbps)</li>
                    <li style="margin-bottom: 8px;">✨ Unlimited skips</li>
                </ul>
            </div>
            <div style="text-align: center;">
                <p style="font-size: 24px; font-weight: 800; margin-bottom: 24px; color: #000;">$0.00 <small style="font-size: 14px; font-weight: 400;">/ FREE for life (Demo)</small></p>
                <button class="btn-primary" onclick="upgradeToPremium()" style="background: #000; color: #fff; transform: scale(1.1);">UPGRADE NOW</button>
            </div>
        </div>
    `;

    overlay.classList.add('show');
}

function upgradeToPremium() {
    fetch('includes/auth.php?api=upgrade_premium', { method: 'POST' })
        .then(r => r.json())
        .then(data => {
            if (data.success) {
                state.userInfo.isPremium = true;
                updateHeaderUI();
                closeModal();
                showToast('Welcome to SoundWave Premium! ✨', 'success');
                renderHome(); // Refresh home to see changes if any
            }
        });
}

function updateProfile() {
    const username = document.getElementById('edit-username').value.trim();
    const email = document.getElementById('edit-email').value.trim();

    if (!username || !email) {
        showToast('All fields are required', 'error');
        return;
    }

    fetch('includes/auth.php?api=update_profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email })
    })
    .then(r => r.json())
    .then(data => {
        if (data.success) {
            state.userInfo.username = username;
            state.userInfo.email = email;
            updateHeaderUI();
            showToast('Profile updated successfully', 'success');
            renderAccount();
        } else {
            showToast(data.error || 'Update failed', 'error');
        }
    });
}

function deleteAccount() {
    if (!confirm('Are you absolutely sure? This will delete all your data and logout.')) return;

    fetch('includes/auth.php?api=delete_account', { method: 'POST' })
        .then(r => r.json())
        .then(data => {
            if (data.success) {
                window.location.href = 'logout.php';
            }
        });
}

function updateHeaderUI() {
    const profileName = document.querySelector('.profile-name');
    const profileAvatar = document.querySelector('.profile-avatar');
    const upgradeBtn = document.querySelector('.premium-btn');

    if (profileName) profileName.textContent = state.userInfo.username;
    if (profileAvatar) {
        profileAvatar.textContent = state.userInfo.username.charAt(0).toUpperCase();
        if (state.userInfo.isPremium) {
            profileAvatar.classList.add('premium');
        }
    }

    if (upgradeBtn) {
        if (state.userInfo.isPremium) {
            upgradeBtn.innerHTML = '<span class="premium-badge-header">PREMIUM</span>';
            upgradeBtn.classList.add('is-premium');
            upgradeBtn.disabled = true;
            upgradeBtn.onclick = null;
        } else {
            upgradeBtn.textContent = 'Upgrade';
            upgradeBtn.classList.remove('is-premium');
            upgradeBtn.onclick = () => showUpgradeModal();
        }
    }
}

function fetchUserInfo() {
    fetch('includes/auth.php?api=get_user_info')
        .then(r => r.json())
        .then(data => {
            if (data && !data.error) {
                state.userInfo = {
                    username: data.username,
                    email: data.email,
                    isPremium: parseInt(data.is_premium) === 1,
                    joinedDate: data.created_at
                };
                updateHeaderUI();
            }
        });
}

function toggleTheme() {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    document.body.classList.toggle('light-theme', state.theme === 'light');
    showToast(`Switched to ${state.theme} mode`);
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

function formatTime(seconds) {
    if (isNaN(seconds) || !isFinite(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

function getGradientColors(gradientClass) {
    const gradients = {
        'gradient-cover-1': ['#e040fb', '#536dfe'],
        'gradient-cover-2': ['#ff6e40', '#ff1744'],
        'gradient-cover-3': ['#00e5ff', '#1db954'],
        'gradient-cover-4': ['#ffd740', '#ff6d00'],
        'gradient-cover-5': ['#b388ff', '#6200ea'],
        'gradient-cover-6': ['#69f0ae', '#00bfa5'],
        'gradient-cover-7': ['#ff80ab', '#f50057'],
        'gradient-cover-8': ['#82b1ff', '#304ffe'],
        'gradient-cover-9': ['#ff9e80', '#dd2c00'],
        'gradient-cover-10': ['#b9f6ca', '#00c853'],
        'gradient-cover-11': ['#ea80fc', '#aa00ff'],
        'gradient-cover-12': ['#80d8ff', '#0091ea']
    };
    return gradients[gradientClass] || ['#333', '#666'];
}

// ==========================================
// INITIALIZATION
// ==========================================

function initApp() {
    // Restore saved state
    restoreState();

    // Build initial queue
    buildQueue();

    // Render home
    renderHome();

    // Update volume UI
    updateVolumeUI();

    // Update shuffle/repeat buttons
    if (state.isShuffle) {
        const btn = document.querySelector('.shuffle-btn');
        if (btn) btn.classList.add('active');
    }
    if (state.repeatMode > 0) {
        const btn = document.querySelector('.repeat-btn');
        if (btn) btn.classList.add('active');
    }

    // Load user playlists from backend
    fetch('includes/auth.php?api=get_playlists')
        .then(r => r.json())
        .then(playlists => {
            if (Array.isArray(playlists)) {
                state.userPlaylists = playlists;
                updateSidebarPlaylists();
            }
        })
        .catch(() => {});

    // Load liked songs from backend
    fetch('includes/auth.php?api=get_liked')
        .then(r => r.json())
        .then(liked => {
            if (Array.isArray(liked)) {
                state.likedSongs = liked.map(Number);
                updateSidebarPlaylistCount();
            }
        })
        .catch(() => {});

    // [NEW] Fetch full user info and premium status
    fetchUserInfo();

    // [NEW] Setup global click handlers for main navigation
    const navItems = {
        'account': () => { renderAccount(); closeModal(); },
        'settings': () => { renderSettings(); closeModal(); },
        'upgrade': () => { showUpgradeModal(); closeModal(); }
    };
    
    // Wire up the header buttons explicitly if they were placeholders
    const upgradeBtn = document.querySelector('.premium-btn');
    if (upgradeBtn) {
        upgradeBtn.onclick = () => showUpgradeModal();
    }

    const dropdownItems = document.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes('account')) item.onclick = () => { renderAccount(); toggleProfileDropdown(); };
        if (text.includes('settings')) item.onclick = () => { renderSettings(); toggleProfileDropdown(); };
    });

    const settingsNavItem = document.querySelector('.sidebar [data-view="settings"]');
    if (settingsNavItem) {
        settingsNavItem.onclick = () => { renderSettings(); closeSidebar(); };
    } else {
        // Find the fallback settings item in sidebar
        const sidebarItems = document.querySelectorAll('.sidebar .nav-item');
        sidebarItems.forEach(item => {
            if (item.textContent.toLowerCase().includes('settings')) {
                item.onclick = () => { renderSettings(); closeSidebar(); };
            }
        });
    }

    // Search input handler
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => handleSearch(e.target.value));
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                searchInput.value = '';
                renderHome();
            }
        });
    }

    // Progress bar seek
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
        progressBar.addEventListener('click', seekTo);
    }

    // Volume control
    const volumeSlider = document.getElementById('volume-slider');
    if (volumeSlider) {
        volumeSlider.addEventListener('click', setVolume);
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Don't handle if typing in input
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

        switch (e.code) {
            case 'Space':
                e.preventDefault();
                togglePlayPause();
                break;
            case 'ArrowRight':
                if (e.shiftKey) nextSong();
                else if (audio.duration) audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);
                break;
            case 'ArrowLeft':
                if (e.shiftKey) prevSong();
                else audio.currentTime = Math.max(0, audio.currentTime - 10);
                break;
            case 'ArrowUp':
                e.preventDefault();
                state.volume = Math.min(1, state.volume + 0.05);
                audio.volume = state.volume;
                updateVolumeUI();
                break;
            case 'ArrowDown':
                e.preventDefault();
                state.volume = Math.max(0, state.volume - 0.05);
                audio.volume = state.volume;
                updateVolumeUI();
                break;
        }
    });

    console.log('🎵 SoundWave initialized successfully!');
}

// Start the app when DOM is ready
document.addEventListener('DOMContentLoaded', initApp);
