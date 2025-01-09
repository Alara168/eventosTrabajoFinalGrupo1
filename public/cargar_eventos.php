<?php

require_once 'db_connection.php';

require_once 'lib/phpqrcode/qrlib.php';

header('Content-Type: application/json');

try {
    // Prepara una consulta para obtener eventos no finalizados y aprobados, ordenados por fecha
    $stmt = $pdo->prepare("SELECT id, titulo, fecha, horaInicio, horaFin, lugar, organizador, descripcion, registro 
                           FROM eventos 
                           WHERE finalizado = 0 AND aprobado = 1 
                           ORDER BY fecha ASC");
    $stmt->execute(); // Ejecuta la consulta
    $eventos = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Itera a través de cada evento
    foreach ($eventos as &$evento) {
        // Inicia el almacenamiento de salida en el búfer
        ob_start();
        // Genera el código QR en el búfer usando el valor de 'registro'
        QRcode::png($evento['registro'], null, QR_ECLEVEL_L, 10, 2);
        // Captura la salida del búfer en una variable
        $qrImageData = ob_get_contents();
        // Limpia y cierra el búfer
        ob_end_clean();
        
        // Convierte los datos del QR en base64 y los agrega al evento
        $evento['qr_base64'] = 'data:image/png;base64,' . base64_encode($qrImageData);
    }

    // Devuelve los eventos como una respuesta JSON
    echo json_encode($eventos);
} catch (PDOException $e) {
    // Maneja errores de la base de datos, los registra en el log y devuelve un mensaje de error al cliente
    error_log("Error al cargar los eventos: " . $e->getMessage());
    echo json_encode(['error' => 'Hubo un problema al cargar los eventos.']);
} catch (Exception $e) {
    // Maneja errores generales y devuelve un mensaje de error al cliente
    error_log("Error al procesar los eventos: " . $e->getMessage());
    echo json_encode(['error' => 'Hubo un problema al procesar los eventos.']);
}
?>
