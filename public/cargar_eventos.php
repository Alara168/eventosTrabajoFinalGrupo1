<?php
require_once 'db_connection.php';
require_once 'lib/phpqrcode/qrlib.php';

header('Content-Type: application/json');

try {
    $stmt = $pdo->prepare("SELECT id, titulo, fecha, horaInicio, horaFin, lugar, organizador, descripcion, registro FROM eventos WHERE finalizado = 0 AND aprobado = 1 ORDER BY fecha ASC");
    $stmt->execute();
    $eventos = $stmt->fetchAll(PDO::FETCH_ASSOC);

    foreach ($eventos as &$evento) {
        ob_start();
        QRcode::png($evento['registro'], null, QR_ECLEVEL_L, 10, 2);
        $qrImageData = ob_get_contents();
        ob_end_clean();
        
        $evento['qr_base64'] = 'data:image/png;base64,' . base64_encode($qrImageData);
    }

    echo json_encode($eventos);
} catch (PDOException $e) {
    error_log("Error al cargar los eventos: " . $e->getMessage());
    echo json_encode(['error' => 'Hubo un problema al cargar los eventos.']);
} catch (Exception $e) {
    error_log("Error al procesar los eventos: " . $e->getMessage());
    echo json_encode(['error' => 'Hubo un problema al procesar los eventos.']);
}
?>
