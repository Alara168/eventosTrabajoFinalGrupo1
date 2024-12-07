document.addEventListener('DOMContentLoaded', function () {
    const evento = JSON.parse(localStorage.getItem('eventoSeleccionado'));
    if (evento) {
        document.getElementById('event-title').textContent = evento.titulo;
        document.getElementById('event-description').textContent = evento.descripcion;
        document.getElementById('event-date').textContent = evento.fecha;
        document.getElementById('event-time').textContent = evento.hora;
        document.getElementById('event-location').textContent = evento.lugar;
        document.getElementById('event-organizer').textContent = evento.organizador;
        document.getElementById('event-link').href = evento.registro;
    }
});
