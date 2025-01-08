<?php
require_once 'db_connection.php';
session_start();

ob_clean();

if (!isset($_SESSION['user_type']) || $_SESSION['user_type'] !== 'profesor') {
    echo json_encode(['success' => false, 'message' => 'No autorizado']);
    exit();
}

$data = json_decode(file_get_contents('php://input'), true);
$id = $data['id'] ?? null;
$estado = $data['estado'] ?? null;

if (!$id || !in_array($estado, [1, 0])) {
    echo json_encode(['success' => false, 'message' => 'Datos inválidos']);
    exit();
}

try {
    if($estado === 1){
        $stmt = $pdo->prepare("UPDATE eventos SET aprobado = :estado WHERE id = :id");
        $stmt->execute(['estado' => $estado, 'id' => $id]);
        echo json_encode(['success' => true, 'message' => 'Estado del evento actualizado']);
    }else {
        $stmt = $pdo->prepare("UPDATE eventos SET finalizado = 1 WHERE id = :id");
        $stmt->execute([ 'id' => $id]);
        echo json_encode(['success' => true, 'message' => 'Estado del evento actualizado 2']);
    }
} catch (PDOException $e) {
    error_log('Error al actualizar el estado del evento: ' . $e->getMessage());
    echo json_encode(['success' => false, 'message' => $e]);
}
?>
