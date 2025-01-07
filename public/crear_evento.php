<?php
require_once 'db_connection.php';
session_start();

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Acceso no autorizado.']);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $titulo = $_POST['titulo'] ?? '';
    $fecha = $_POST['fecha'] ?? '';
    $horaInicio = $_POST['horaInicio'] ?? '';
    $horaFin = $_POST['horaFin'] ?? '';
    $lugar = $_POST['lugar'] ?? '';
    $organizador = $_POST['organizador'] ?? '';
    $descripcion = $_POST['descripcion'] ?? '';
    $registro = $_POST['registro'] ?? '';

    if (empty($titulo) || empty($fecha) || empty($horaInicio) || empty($horaFin) || empty($lugar) || empty($organizador) || empty($descripcion) || empty($registro)) {
        echo json_encode(['success' => false, 'message' => 'Todos los campos son obligatorios.']);
        exit();
    }

    try {
        $stmt = $pdo->prepare("INSERT INTO eventos (titulo, fecha, horaInicio, horaFin, lugar, organizador, descripcion, registro) VALUES (:titulo, :fecha, :horaInicio, :horaFin, :lugar, :organizador, :descripcion, :registro)");
        $stmt->execute([
            'titulo' => $titulo,
            'fecha' => $fecha,
            'horaInicio' => $horaInicio,
            'horaFin' => $horaFin,
            'lugar' => $lugar,
            'organizador' => $organizador,
            'descripcion' => $descripcion,
            'registro' => $registro
        ]);

        echo json_encode(['success' => true]);
    } catch (PDOException $e) {
        error_log('Error al crear el evento: ' . $e->getMessage());
        echo json_encode(['success' => false, 'message' => 'Hubo un error al guardar el evento.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Método de solicitud no válido.']);
}
