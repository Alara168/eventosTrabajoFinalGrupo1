<?php
session_start();

// Destruye todas las variables de sesión
$_SESSION = [];

if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000,
        $params["path"], $params["domain"],
        $params["secure"], $params["httponly"]
    );
}

// Destruye la sesión
session_destroy();

header("Location: login.html");
exit();
?>
