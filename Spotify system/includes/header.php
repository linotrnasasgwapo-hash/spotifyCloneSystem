<?php
/**
 * Common Header - SoundWave
 * Start session and include dependencies
 */

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/auth.php';
