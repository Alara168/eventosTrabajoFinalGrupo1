document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('crearEventoForm');
    const messageDiv = document.getElementById('message');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const data = new URLSearchParams();
        data.append('titulo', document.getElementById('titulo').value);
        data.append('fecha', document.getElementById('fecha').value);
        data.append('horaInicio', document.getElementById('horaInicio').value);
        data.append('horaFin', document.getElementById('horaFin').value);
        data.append('lugar', document.getElementById('lugar').value);
        data.append('organizador', document.getElementById('organizador').value);
        data.append('descripcion', document.getElementById('descripcion').value);
        data.append('registro', document.getElementById('registro').value);

        fetch('crear_evento.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data.toString()
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                messageDiv.textContent = 'Evento creado exitosamente.';
                form.reset();
            } else {
                messageDiv.textContent = data.message || 'Hubo un problema al crear el evento.';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            messageDiv.textContent = 'Error en la comunicación con el servidor.';
        });
    });
});
