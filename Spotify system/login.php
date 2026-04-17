<?php
/**
 * Login Page - SoundWave
 */
require_once 'includes/header.php';

// Redirect if already logged in
if (isLoggedIn()) {
    header('Location: dashboard.php');
    exit;
}

$error = '';

// Handle login form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email'] ?? '');
    $password = trim($_POST['password'] ?? '');

    // Validate
    if (empty($email) || empty($password)) {
        $error = 'Please fill in all fields.';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $error = 'Please enter a valid email address.';
    } else {
        $result = loginUser($pdo, $email, $password);
        if ($result['success']) {
            header('Location: dashboard.php');
            exit;
        } else {
            $error = $result['error'];
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Log In - SoundWave</title>
    <meta name="description" content="Log in to SoundWave, your premium music streaming experience.">
    <link rel="stylesheet" href="css/style.css">
    <link rel="icon" href="assets/images/logo.png" type="image/png">
</head>
<body>
    <div class="auth-page">
        <div class="auth-container">
            <div class="auth-card">
                <div class="auth-logo">
                    <img src="assets/images/logo.png" alt="SoundWave Logo">
                    <h1>Sound<span>Wave</span></h1>
                </div>
                <p class="auth-subtitle">Log in to continue listening</p>

                <?php if ($error): ?>
                    <div class="auth-error"><?= htmlspecialchars($error) ?></div>
                <?php endif; ?>

                <form method="POST" action="login.php" id="login-form">
                    <div class="form-group">
                        <label for="email">Email Address</label>
                        <input type="email" id="email" name="email" placeholder="your@email.com" 
                               value="<?= htmlspecialchars($_POST['email'] ?? '') ?>" required autocomplete="email">
                    </div>

                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" name="password" placeholder="••••••••" 
                               required autocomplete="current-password">
                    </div>

                    <button type="submit" class="btn-primary">Log In</button>
                </form>

                <div class="auth-divider">
                    <span>or</span>
                </div>

                <p class="auth-link">
                    Don't have an account? <a href="register.php">Sign up for SoundWave</a>
                </p>
            </div>
        </div>
    </div>

    <script>
        // Client-side validation
        document.getElementById('login-form').addEventListener('submit', function(e) {
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();

            if (!email || !password) {
                e.preventDefault();
                alert('Please fill in all fields.');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                e.preventDefault();
                alert('Please enter a valid email address.');
                return;
            }
        });
    </script>
</body>
</html>
