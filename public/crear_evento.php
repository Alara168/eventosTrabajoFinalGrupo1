<?php

require_once 'db_connection.php';

session_start();

ob_end_clean();

// Verifica si el usuario ha iniciado sesión
if (!isset($_SESSION['user_id'])) {
    // Si no está autenticado, devuelve un mensaje de error y detiene el script
    echo json_encode(['success' => false, 'message' => 'Acceso no autorizado.']);
    exit();
}

// Verifica si el método de solicitud es POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obtiene los datos enviados a través de POST, asignando valores predeterminados si no están definidos
    $titulo = $_POST['titulo'] ?? '';
    $fecha = $_POST['fecha'] ?? '';
    $horaInicio = $_POST['horaInicio'] ?? '';
    $horaFin = $_POST['horaFin'] ?? '';
    $lugar = $_POST['lugar'] ?? '';
    $organizador = $_POST['organizador'] ?? '';
    $descripcion = $_POST['descripcion'] ?? '';
    $registro = $_POST['registro'] ?? '';

    // Valida que todos los campos requeridos estén presentes
    if (empty($titulo) || empty($fecha) || empty($horaInicio) || empty($horaFin) || empty($lugar) || empty($organizador) || empty($descripcion) || empty($registro)) {
        echo json_encode(['success' => false, 'message' => 'Todos los campos son obligatorios.']);
        exit();
    }

    try {
        // Prepara una consulta SQL para insertar un nuevo evento en la base de datos
        $stmt = $pdo->prepare("INSERT INTO eventos (titulo, fecha, horaInicio, horaFin, lugar, organizador, descripcion, registro) 
            VALUES (:titulo, :fecha, :horaInicio, :horaFin, :lugar, :organizador, :descripcion, :registro)");
        
        // Ejecuta la consulta con los datos enviados por el usuario
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

        // Respuesta exitosa en formato JSON
        echo json_encode(['success' => true]);
    } catch (PDOException $e) {
        // Maneja errores de base de datos, registra el error en el log y devuelve un mensaje de error
        error_log('Error al crear el evento: ' . $e->getMessage());
        echo json_encode(['success' => false, 'message' => 'Hubo un error al guardar el evento.']);
    }
} else {
    // Si el método de solicitud no es POST, devuelve un mensaje de error
    echo json_encode(['success' => false, 'message' => 'Método de solicitud no válido.']);
}
?>
