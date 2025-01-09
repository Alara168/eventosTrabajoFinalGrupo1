<?php
require_once 'db_connection.php';
require_once 'lib/phpqrcode/qrlib.php'; // Incluye la biblioteca QR Code
session_start();

ob_end_clean();

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
        // Generar QR Code
        $qrDirectory = 'qrcodes/';
        if (!is_dir($qrDirectory)) {
            mkdir($qrDirectory, 0755, true); // Crear directorio si no existe
        }

        $qrFileName = $qrDirectory . uniqid('evento_') . '.png'; // Nombre único para el archivo QR
        QRcode::png($registro, $qrFileName, QR_ECLEVEL_L, 10); // Generar el QR Code

        // Guardar el evento en la base de datos
        $stmt = $pdo->prepare("INSERT INTO eventos (titulo, fecha, horaInicio, horaFin, lugar, organizador, descripcion, registro, qr_path) 
            VALUES (:titulo, :fecha, :horaInicio, :horaFin, :lugar, :organizador, :descripcion, :registro, :qr_path)");
        $stmt->execute([
            'titulo' => $titulo,
            'fecha' => $fecha,
            'horaInicio' => $horaInicio,
            'horaFin' => $horaFin,
            'lugar' => $lugar,
            'organizador' => $organizador,
            'descripcion' => $descripcion,
            'registro' => $registro,
            'qr_path' => $qrFileName
        ]);

        echo json_encode(['success' => true, 'qr_path' => $qrFileName]);
    } catch (PDOException $e) {
        error_log('Error al crear el evento: ' . $e->getMessage());
        echo json_encode(['success' => false, 'message' => 'Hubo un error al guardar el evento.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Método de solicitud no válido.']);
}
