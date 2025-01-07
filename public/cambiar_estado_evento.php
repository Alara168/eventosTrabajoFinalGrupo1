<?php
require_once 'db_connection.php';
session_start();

if ($_SESSION['user_type'] !== 'profesor') {
    echo json_encode(['success' => false, 'message' => 'No autorizado.']);
    exit();
}

$data = json_decode(file_get_contents('php://input'), true);
$id = $data['id'];
$estado = $data['estado'];

try {
    $stmt = $pdo->prepare("UPDATE eventos SET estado = :estado WHERE id = :id");
    $stmt->execute(['estado' => $estado, 'id' => $id]);
    echo json_encode(['success' => true]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Error al actualizar el evento.']);
}
?>
