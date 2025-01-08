<?php
require_once 'db_connection.php'; // Asegúrate de que este archivo configure correctamente la conexión a la base de datos

header('Content-Type: application/json'); // Establecer el tipo de contenido como JSON

try {
    // Consulta para obtener los eventos
    $stmt = $pdo->prepare("SELECT titulo, fecha, horaInicio, horaFin, lugar, organizador, descripcion, registro FROM eventos WHERE finalizado = 0 AND aprobado=1 ORDER BY fecha ASC");
    $stmt->execute();

    // Obtener los resultados en un arreglo asociativo
    $eventos = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Devolver los eventos como JSON
    echo json_encode($eventos);
} catch (PDOException $e) {
    // Manejar errores en la consulta
    error_log("Error al cargar los eventos: " . $e->getMessage());
    echo json_encode(['error' => 'Hubo un problema al cargar los eventos.']);
}
?>
