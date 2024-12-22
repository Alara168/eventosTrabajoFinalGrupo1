<?php
require_once 'db_connection.php';

// Iniciar sesión si no está ya iniciada
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Manejar la solicitud OPTIONS para CORS
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

// Manejar el inicio de sesión
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Asegurarse de que los datos POST están definidos
    $username = isset($_POST['username']) ? trim($_POST['username']) : '';
    $password = isset($_POST['password']) ? trim($_POST['password']) : '';    

    // Validar entrada
    if (empty($username) || empty($password)) {
        echo json_encode(['success' => false, 'message' => "Por favor, ingresa tanto el nombre de usuario como la contraseña."]);
        exit();
    }

    try {
        // Consultar la base de datos para obtener al usuario
        $stmt = $pdo->prepare("SELECT id, username, password FROM users WHERE username = :username");
        $stmt->execute(['username' => $username]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        // Verificar si el usuario existe y la contraseña es correcta
        if ($user) {
            // Verificar la contraseña con bcrypt
            if (password_verify($password, $user['password'])) {
                // Configurar la sesión y cookie del usuario
                $_SESSION['user_id'] = $user['id'];
                $_SESSION['username'] = $user['username'];

                setcookie('user_id', $user['id'], time() + 3600, "/");

                echo json_encode(['success' => true, 'redirect' => 'index.html']);
                exit();
            } else {
                echo json_encode(['success' => false, 'message' => "Contraseña incorrecta."]);
                exit();
            }
        } else {
            echo json_encode(['success' => false, 'message' => "El nombre de usuario no existe."]);
            exit();
        }
    } catch (PDOException $e) {
        // Registrar errores en los logs del servidor pero no mostrarlos al cliente
        error_log("Error en el inicio de sesión: " . $e->getMessage());
        echo json_encode(['success' => false, 'message' => "Error interno. Inténtalo más tarde."]);
        exit();
    }
} else {
    echo json_encode(['success' => false, 'message' => "Método de solicitud no válido."]);
    exit();
}
?>
