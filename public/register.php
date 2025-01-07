<?php
require_once 'db_connection.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = trim($_POST['username']);
    $email = trim($_POST['email']);
    $password = $_POST['password'];
    $userType = trim($_POST['userType']);
    $verificationCode = isset($_POST['verificationCode']) ? trim($_POST['verificationCode']) : '';

    $errors = [];

    // Validaciones
    if (empty($username) || empty($email) || empty($password) || empty($userType)) {
        $errors[] = "Todos los campos son obligatorios.";
    }

    if ($userType === 'profesor' && $verificationCode !== 'clave-secreta-profesor') {
        $errors[] = "Clave de profesor incorrecta.";
    }

    if (empty($errors)) {
        try {
            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
            $stmt = $pdo->prepare("INSERT INTO users (username, email, password, user_type) VALUES (:username, :email, :password, :userType)");
            $stmt->execute([
                'username' => $username,
                'email' => $email,
                'password' => $hashedPassword,
                'userType' => $userType
            ]);
            echo json_encode(['success' => true]);
        } catch (PDOException $e) {
            echo json_encode(['success' => false, 'message' => 'Error al registrar el usuario.']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => implode(' ', $errors)]);
    }
}
