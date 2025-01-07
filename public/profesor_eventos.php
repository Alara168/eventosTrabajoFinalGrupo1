<?php
session_start();

if (!isset($_SESSION['user_type']) || $_SESSION['user_type'] !== 'profesor') {
    header("Location: login.html");
    exit();
}

require_once 'db_connection.php';

try {
    $stmt = $pdo->prepare("SELECT id, titulo, fecha, horaInicio, horaFin, lugar, organizador, descripcion, estado FROM eventos ORDER BY fecha ASC");
    $stmt->execute();
    $eventos = $stmt->fetchAll(PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    error_log('Error al cargar eventos: ' . $e->getMessage());
    $eventos = [];
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Eventos - Profesor</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <nav>
            <ul>
                <li><a href="index.html">Inicio</a></li>
            </ul>
        </nav>
    </header>
    <main>
        <section id="eventos">
            <h2>Gestión de Eventos</h2>
            <div id="eventos-container">
                <?php foreach ($eventos as $evento): ?>
                    <div class="evento-card">
                        <h3><?php echo htmlspecialchars($evento['titulo']); ?></h3>
                        <p>Fecha: <?php echo htmlspecialchars($evento['fecha']); ?></p>
                        <p>Hora: <?php echo htmlspecialchars($evento['horaInicio'] . ' - ' . $evento['horaFin']); ?></p>
                        <p>Lugar: <?php echo htmlspecialchars($evento['lugar']); ?></p>
                        <p>Estado: <span><?php echo htmlspecialchars($evento['estado']); ?></span></p>
                        <button class="confirmar" data-id="<?php echo $evento['id']; ?>">Confirmar</button>
                        <button class="denegar" data-id="<?php echo $evento['id']; ?>">Denegar</button>
                    </div>
                <?php endforeach; ?>
            </div>
        </section>
    </main>
    <footer>
        <p>&copy; 2024 Escuela STEAM. Todos los derechos reservados.</p>
    </footer>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            document.querySelectorAll('.confirmar, .denegar').forEach(button => {
                button.addEventListener('click', () => {
                    const id = button.dataset.id;
                    const estado = button.classList.contains('confirmar') ? 'confirmado' : 'denegado';

                    fetch('cambiar_estado_evento.php', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ id, estado })
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            alert('Estado actualizado');
                            location.reload();
                        } else {
                            alert('Error al actualizar el estado');
                        }
                    })
                    .catch(error => console.error('Error:', error));
                });
            });
        });
    </script>
</body>
</html>
