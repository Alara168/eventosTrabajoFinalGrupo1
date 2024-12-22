document.addEventListener('DOMContentLoaded', function () {
    const eventosContainer = document.getElementById('eventos-container');
    const botonAnterior = document.getElementById('boton-anterior');
    const botonSiguiente = document.getElementById('boton-siguiente');
    let startIndex = 0;
    let eventos = []; // Inicializamos el arreglo de eventos vacío

    // Función para cargar eventos desde la base de datos
    function cargarEventos() {
        fetch('cargar_eventos.php') // Cambia la URL según tu configuración
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la carga de eventos: ' + response.status);
                }
                return response.json(); // Parsear la respuesta como JSON
            })
            .then(data => {
                eventos = data; // Asignar los eventos obtenidos a la variable global
                mostrarEventos(); // Mostrar los eventos después de cargarlos
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Hubo un problema al cargar los eventos. Inténtalo más tarde.');
            });
    }

    function mostrarEventos() {
        eventosContainer.innerHTML = '';
        for (let i = startIndex; i < startIndex + 4 && i < eventos.length; i++) {
            const evento = eventos[i];
            const eventoCard = document.createElement('div');
            eventoCard.className = 'evento-card';
            eventoCard.setAttribute('data-index', i);

            eventoCard.innerHTML = `
                <h3>${evento.titulo}</h3>
                <p>Fecha: ${evento.fecha}</p>
                <p>Hora: ${evento.horaInicio} - ${evento.horaFin}</p>
                <p>Lugar: ${evento.lugar}</p>
                <p>Organizador: ${evento.organizador}</p>
                <p>Descripción: ${evento.descripcion}</p>
                <div class="qr-container" id="qr-${i}"></div>
                <a href="${evento.registro}" class="detalles-link">Ver detalles</a>
            `;

            eventosContainer.appendChild(eventoCard);
        }

        botonAnterior.style.visibility = startIndex > 0 ? 'visible' : 'hidden';
        botonSiguiente.style.visibility = startIndex + 4 < eventos.length ? 'visible' : 'hidden';
    }

    botonAnterior.onclick = () => {
        if (startIndex > 0) {
            startIndex--;
            mostrarEventos();
        }
    };

    botonSiguiente.onclick = () => {
        if (startIndex + 4 < eventos.length) {
            startIndex++;
            mostrarEventos();
        }
    };

    // Redirigir al detalle del evento
    eventosContainer.addEventListener('click', (e) => {
        const link = e.target.closest('.detalles-link');
        if (link) {
            const eventoCard = e.target.closest('.evento-card');
            const index = eventoCard.getAttribute('data-index');
            const evento = eventos[index];
            localStorage.setItem('eventoSeleccionado', JSON.stringify(evento));
            window.location.href = 'evento.html';
        }
    });

    // Cargar los eventos al iniciar
    cargarEventos();

    // Calendario Semanal
    const horarioTable = document.getElementById('horario-table');
    const diasSiguientes = generarDiasSiguientes();

    function generarDiasSiguientes() {
        const dias = [];
        const hoy = new Date();

        for (let i = 0; i < 7; i++) {
            const dia = new Date(hoy);
            dia.setDate(hoy.getDate() + i);
            dias.push(dia.toLocaleDateString('es-ES'));
        }

        return dias;
    }

    let headerRow = '<tr><th>Horas</th>';
    diasSiguientes.forEach(dia => {
        headerRow += `<th>${dia}</th>`;
    });
    headerRow += '</tr>';
    horarioTable.innerHTML = headerRow;

    const horas = ['09:00', '11:00', '13:00', '15:00', '17:00'];

    horas.forEach(hora => {
        let row = `<tr><td>${hora}</td>`;
        diasSiguientes.forEach(() => {
            row += '<td></td>'; // Celdas vacías
        });
        row += '</tr>';
        horarioTable.innerHTML += row;
    });
});