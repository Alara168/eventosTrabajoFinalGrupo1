<?php
require_once 'db_connection.php';
session_start();

if (!isset($_SESSION['user_type']) || $_SESSION['user_type'] !== 'profesor') {
    echo json_encode(['success' => false, 'message' => 'No autorizado']);
    exit();
}

$data = json_decode(file_get_contents('php://input'), true);
$id = $data['id'] ?? null;
$estado = $data['estado'] ?? null;

if (!$id || !$estado || !in_array($estado, ['confirmado', 'denegado'])) {
    echo json_encode(['success' => false, 'message' => 'Datos inválidos']);
    exit();
}

try {
    $stmt = $pdo->prepare("UPDATE eventos SET estado = :estado WHERE id = :id");
    $stmt->execute(['estado' => $estado, 'id' => $id]);
    echo json_encode(['success' => true, 'message' => 'Estado del evento actualizado']);
} catch (PDOException $e) {
    error_log('Error al actualizar el estado del evento: ' . $e->getMessage());
    echo json_encode(['success' => false, 'message' => 'Error interno']);
}
?>
