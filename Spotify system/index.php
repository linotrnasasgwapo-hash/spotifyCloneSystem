<?php
/**
 * Index / Landing Page - SoundWave
 * Redirects to dashboard if logged in, otherwise to login
 */
require_once 'includes/header.php';

if (isLoggedIn()) {
    header('Location: dashboard.php');
} else {
    header('Location: login.php');
}
exit;
