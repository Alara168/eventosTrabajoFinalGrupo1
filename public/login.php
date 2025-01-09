<?php
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

require_once 'db_connection.php';

header('Content-Type: application/json');

ob_clean();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = trim($_POST['username']);
    $password = $_POST['password'];

    try {
        $stmt = $pdo->prepare("SELECT id, username, password, user_type FROM users WHERE username = :username");
        $stmt->execute(['username' => $username]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['username'];
            $_SESSION['user_type'] = $user['user_type'];

            echo json_encode([
                'success' => true,
                'userType' => $user['user_type'],
                'redirect' => $user['user_type'] === 'profesor' ? 'profesor_eventos.php' : 'index.html'
            ]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Credenciales incorrectas']);
        }
    } catch (PDOException $e) {
        error_log("Error en el login: " . $e->getMessage());
        echo json_encode(['success' => false, 'message' => 'Error interno']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Método de solicitud no válido']);
}
?>
