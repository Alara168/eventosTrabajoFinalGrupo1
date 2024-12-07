document.addEventListener('DOMContentLoaded', function () {
    const evento = JSON.parse(localStorage.getItem('eventoSeleccionado'));
    if (evento) {
        document.getElementById('event-title').textContent = evento.titulo;
        document.getElementById('event-image').src = evento.imagen;
        document.getElementById('event-description').textContent = evento.descripcion;
        document.getElementById('event-date').textContent = evento.fecha;
        document.getElementById('event-time').textContent = `${evento.horaInicio} - ${evento.horaFin}`;
        document.getElementById('event-public').textContent = evento.publicoObjetivo;
        document.getElementById('event-location').textContent = evento.lugar;
        document.getElementById('event-organizer').textContent = evento.organizador;
        document.getElementById('event-status').textContent = evento.estado;
        document.getElementById('event-link').href = evento.registro;
    }
});
