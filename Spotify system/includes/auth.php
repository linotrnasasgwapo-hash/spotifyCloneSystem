<?php
/**
 * Authentication Helpers - SoundWave
 * Login, register, session management
 */

/**
 * Register a new user
 */
function registerUser($pdo, $username, $email, $password) {
    // Check if email already exists
    $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->execute([$email]);
    if ($stmt->fetch()) {
        return ['success' => false, 'error' => 'Email already registered'];
    }

    // Check if username already exists
    $stmt = $pdo->prepare("SELECT id FROM users WHERE username = ?");
    $stmt->execute([$username]);
    if ($stmt->fetch()) {
        return ['success' => false, 'error' => 'Username already taken'];
    }

    // Hash password and insert
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    $stmt = $pdo->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
    $stmt->execute([$username, $email, $hashedPassword]);

    $userId = $pdo->lastInsertId();

    // Auto-login after registration
    $_SESSION['user_id'] = $userId;
    $_SESSION['username'] = $username;
    $_SESSION['email'] = $email;
    $_SESSION['is_premium'] = 0;

    return ['success' => true, 'user_id' => $userId];
}

/**
 * Login user
 */
function loginUser($pdo, $email, $password) {
    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    if (!$user || !password_verify($password, $user['password'])) {
        return ['success' => false, 'error' => 'Invalid email or password'];
    }

    // Set session
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['username'] = $user['username'];
    $_SESSION['email'] = $user['email'];
    $_SESSION['avatar'] = $user['avatar'];
    $_SESSION['is_premium'] = $user['is_premium'];

    return ['success' => true];
}

/**
 * Check if user is logged in
 */
function isLoggedIn() {
    return isset($_SESSION['user_id']);
}

/**
 * Require authentication - redirect to login if not logged in
 */
function requireAuth() {
    if (!isLoggedIn()) {
        header('Location: login.php');
        exit;
    }
}

/**
 * Get current user ID
 */
function getCurrentUserId() {
    return $_SESSION['user_id'] ?? null;
}

/**
 * Get current username
 */
function getCurrentUsername() {
    return $_SESSION['username'] ?? 'Guest';
}

/**
 * Logout user
 */
function logoutUser() {
    session_destroy();
    header('Location: login.php');
    exit;
}

// ==========================================
// Playlist API Functions
// ==========================================

/**
 * Get user playlists
 */
function getUserPlaylists($pdo, $userId) {
    $stmt = $pdo->prepare("SELECT * FROM playlists WHERE user_id = ? ORDER BY created_at DESC");
    $stmt->execute([$userId]);
    return $stmt->fetchAll();
}

/**
 * Create a new playlist
 */
function createPlaylist($pdo, $userId, $name, $description = '') {
    $stmt = $pdo->prepare("INSERT INTO playlists (user_id, name, description) VALUES (?, ?, ?)");
    $stmt->execute([$userId, $name, $description]);
    return $pdo->lastInsertId();
}

/**
 * Add song to playlist
 */
function addSongToPlaylist($pdo, $playlistId, $songIndex) {
    // Check if already in playlist
    $stmt = $pdo->prepare("SELECT id FROM playlist_songs WHERE playlist_id = ? AND song_index = ?");
    $stmt->execute([$playlistId, $songIndex]);
    if ($stmt->fetch()) {
        return false;
    }
    $stmt = $pdo->prepare("INSERT INTO playlist_songs (playlist_id, song_index) VALUES (?, ?)");
    $stmt->execute([$playlistId, $songIndex]);
    return true;
}

/**
 * Remove song from playlist
 */
function removeSongFromPlaylist($pdo, $playlistId, $songIndex) {
    $stmt = $pdo->prepare("DELETE FROM playlist_songs WHERE playlist_id = ? AND song_index = ?");
    $stmt->execute([$playlistId, $songIndex]);
    return true;
}

/**
 * Get playlist songs
 */
function getPlaylistSongs($pdo, $playlistId) {
    $stmt = $pdo->prepare("SELECT song_index FROM playlist_songs WHERE playlist_id = ? ORDER BY added_at");
    $stmt->execute([$playlistId]);
    return $stmt->fetchAll(PDO::FETCH_COLUMN);
}

/**
 * Toggle liked song
 */
function toggleLikeSong($pdo, $userId, $songIndex) {
    $stmt = $pdo->prepare("SELECT id FROM liked_songs WHERE user_id = ? AND song_index = ?");
    $stmt->execute([$userId, $songIndex]);
    
    if ($stmt->fetch()) {
        $pdo->prepare("DELETE FROM liked_songs WHERE user_id = ? AND song_index = ?")->execute([$userId, $songIndex]);
        return false; // unliked
    } else {
        $pdo->prepare("INSERT INTO liked_songs (user_id, song_index) VALUES (?, ?)")->execute([$userId, $songIndex]);
        return true; // liked
    }
}

/**
 * Get liked songs
 */
function getLikedSongs($pdo, $userId) {
    $stmt = $pdo->prepare("SELECT song_index FROM liked_songs WHERE user_id = ? ORDER BY liked_at DESC");
    $stmt->execute([$userId]);
    return $stmt->fetchAll(PDO::FETCH_COLUMN);
}

// ==========================================
// API endpoint handler (AJAX calls)
// ==========================================
if (isset($_GET['api'])) {
    header('Content-Type: application/json');
    
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }
    
    if (!isLoggedIn()) {
        echo json_encode(['error' => 'Not authenticated']);
        exit;
    }

    $userId = getCurrentUserId();
    $action = $_GET['api'];

    switch ($action) {
        case 'get_playlists':
            echo json_encode(getUserPlaylists($pdo, $userId));
            break;

        case 'create_playlist':
            $data = json_decode(file_get_contents('php://input'), true);
            $id = createPlaylist($pdo, $userId, $data['name'], $data['description'] ?? '');
            echo json_encode(['success' => true, 'id' => $id]);
            break;

        case 'add_to_playlist':
            $data = json_decode(file_get_contents('php://input'), true);
            $result = addSongToPlaylist($pdo, $data['playlist_id'], $data['song_index']);
            echo json_encode(['success' => $result]);
            break;

        case 'remove_from_playlist':
            $data = json_decode(file_get_contents('php://input'), true);
            removeSongFromPlaylist($pdo, $data['playlist_id'], $data['song_index']);
            echo json_encode(['success' => true]);
            break;

        case 'get_playlist_songs':
            $songs = getPlaylistSongs($pdo, $_GET['playlist_id']);
            echo json_encode($songs);
            break;

        case 'toggle_like':
            $data = json_decode(file_get_contents('php://input'), true);
            $liked = toggleLikeSong($pdo, $userId, $data['song_index']);
            echo json_encode(['liked' => $liked]);
            break;

        case 'get_liked':
            echo json_encode(getLikedSongs($pdo, $userId));
            break;

        case 'delete_playlist':
            $data = json_decode(file_get_contents('php://input'), true);
            $stmt = $pdo->prepare("DELETE FROM playlists WHERE id = ? AND user_id = ?");
            $stmt->execute([$data['playlist_id'], $userId]);
            echo json_encode(['success' => true]);
            break;

        case 'get_user_info':
            $stmt = $pdo->prepare("SELECT username, email, is_premium, created_at FROM users WHERE id = ?");
            $stmt->execute([$userId]);
            echo json_encode($stmt->fetch());
            break;

        case 'upgrade_premium':
            $stmt = $pdo->prepare("UPDATE users SET is_premium = 1 WHERE id = ?");
            $stmt->execute([$userId]);
            $_SESSION['is_premium'] = 1;
            echo json_encode(['success' => true]);
            break;

        case 'update_profile':
            $data = json_decode(file_get_contents('php://input'), true);
            $username = trim($data['username'] ?? '');
            $email = trim($data['email'] ?? '');

            if (empty($username) || empty($email)) {
                echo json_encode(['error' => 'All fields are required']);
                exit;
            }

            $stmt = $pdo->prepare("UPDATE users SET username = ?, email = ? WHERE id = ?");
            $stmt->execute([$username, $email, $userId]);
            $_SESSION['username'] = $username;
            $_SESSION['email'] = $email;
            echo json_encode(['success' => true]);
            break;

        case 'delete_account':
            $stmt = $pdo->prepare("DELETE FROM users WHERE id = ?");
            $stmt->execute([$userId]);
            session_destroy();
            echo json_encode(['success' => true]);
            break;

        default:
            echo json_encode(['error' => 'Unknown action']);
    }
    exit;
}
