<?php

require_once 'db_connection.php';

session_start();

ob_clean();

// Verifica si el usuario está autenticado y tiene el tipo 'profesor'
if (!isset($_SESSION['user_type']) || $_SESSION['user_type'] !== 'profesor') {
    echo json_encode(['success' => false, 'message' => 'No autorizado']); // Devuelve un mensaje de error si no está autorizado
    exit(); // Finaliza la ejecución del script
}

// Decodifica los datos JSON enviados en la solicitud
$data = json_decode(file_get_contents('php://input'), true);

// Obtiene los valores de 'id' y 'estado' del JSON, o los asigna como nulos si no existen
$id = $data['id'] ?? null;
$estado = $data['estado'] ?? null;

// Valida los datos: verifica que 'id' exista y que 'estado' sea 1 o 0
if (!$id || !in_array($estado, [1, 0])) {
    echo json_encode(['success' => false, 'message' => 'Datos inválidos']); // Devuelve un mensaje de error si los datos son inválidos
    exit(); // Finaliza la ejecución del script
}

try {
    // Si 'estado' es 1, actualiza el evento para marcarlo como aprobado
    if ($estado === 1) {
        $stmt = $pdo->prepare("UPDATE eventos SET aprobado = :estado WHERE id = :id");
        $stmt->execute(['estado' => $estado, 'id' => $id]); // Ejecuta la consulta con los parámetros
        echo json_encode(['success' => true, 'message' => 'Estado del evento actualizado']); // Respuesta exitosa
    } else {
        // Si 'estado' no es 1 (por lógica, será 0), marca el evento como denegado
        $stmt = $pdo->prepare("UPDATE eventos SET denegado = 1 WHERE id = :id");
        $stmt->execute(['id' => $id]); // Ejecuta la consulta con los parámetros
        echo json_encode(['success' => true, 'message' => 'Estado del evento actualizado 2']); // Respuesta exitosa
    }
} catch (PDOException $e) {
    // Si ocurre un error con la base de datos, se registra en el log y se devuelve un mensaje de error
    error_log('Error al actualizar el estado del evento: ' . $e->getMessage());
    echo json_encode(['success' => false, 'message' => $e]); // Devuelve el mensaje de error
}
?>
