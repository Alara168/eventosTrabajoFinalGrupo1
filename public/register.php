<?php
require_once 'db_connection.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = trim($_POST['username']);
    $email = trim($_POST['email']);
    $password = $_POST['password'];
    $userType = trim($_POST['userType']);
    $verificationCode = isset($_POST['verificationCode']) ? trim($_POST['verificationCode']) : '';

    $errors = [];

    // Validación del nombre de usuario
    if (empty($username)) {
        $errors[] = "Por favor, introduce un nombre de usuario.";
    } elseif (strlen($username) < 3) {
        $errors[] = "El nombre de usuario debe tener al menos 3 caracteres.";
    } else {
        try {
            $stmt = $pdo->prepare("SELECT COUNT(*) FROM users WHERE username = :username");
            $stmt->execute(['username' => $username]);
            if ($stmt->fetchColumn() > 0) {
                $errors[] = "El nombre de usuario ya está en uso.";
            }
        } catch (PDOException $e) {
            $errors[] = "Error al verificar el nombre de usuario: " . $e->getMessage();
        }
    }

    // Validación del correo electrónico
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Por favor, introduce un correo electrónico válido.";
    }

    // Validación de la contraseña
    if (empty($password)) {
        $errors[] = "Por favor, introduce una contraseña.";
    } elseif (strlen($password) < 6) {
        $errors[] = "La contraseña debe tener al menos 6 caracteres.";
    }

    // Validación del tipo de usuario
    if (empty($userType) || !in_array($userType, ['estudiante', 'profesor'])) {
        $errors[] = "Por favor, selecciona un tipo de usuario válido.";
    }

    // Validación del código de verificación para profesores
    if ($userType === 'profesor') {
        if (empty($verificationCode)) {
            $errors[] = "Por favor, introduce el código de verificación para profesores.";
        } elseif ($verificationCode !== '16752') { // Cambia '16752' por la clave secreta de tu elección
            $errors[] = "Código de verificación incorrecto.";
        }
    }

    // Si no hay errores, proceder a insertar el nuevo usuario
    if (empty($errors)) {
        try {
            $hashed_password = password_hash($password, PASSWORD_DEFAULT);

            $stmt = $pdo->prepare("INSERT INTO users (username, email, password, user_type) VALUES (:username, :email, :password, :userType)");
            $stmt->execute([
                'username' => $username,
                'email' => $email,
                'password' => $hashed_password,
                'userType' => $userType
            ]);

            echo json_encode(['success' => true, 'message' => 'Registro exitoso. Por favor, inicia sesión.']);
            exit();
        } catch (PDOException $e) {
            $errors[] = "Error en el registro: " . $e->getMessage();
        }
    }

    // Enviar errores si hay alguno
    if (!empty($errors)) {
        echo json_encode(['success' => false, 'message' => implode(' ', $errors)]);
        exit();
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Método de solicitud no válido']);
    exit();
}
?>
