document.addEventListener('DOMContentLoaded', function () {
    const eventos = [
        {
            titulo: 'Taller de Robótica',
            imagen: 'images/taller_robotica.jpg',
            fecha: '2024-12-01',
            horaInicio: '15:00',
            horaFin: '17:00',
            descripcion: 'Taller práctico de introducción a la robótica',
            publicoObjetivo: 'Estudiantes',
            lugar: 'Laboratorio de Robótica',
            organizador: 'Departamento de Ingeniería',
            registro: 'https://registro-taller-robotica.com',
            estado: 'Proximamente'
        },
        {
            titulo: 'Conferencia IA',
            imagen: 'images/conferencia_ia.jpg',
            fecha: '2024-12-03',
            horaInicio: '18:00',
            horaFin: '20:00',
            descripcion: 'Charla sobre los últimos avances en Inteligencia Artificial',
            publicoObjetivo: 'Comunidad Universitaria',
            lugar: 'Auditorio Principal',
            organizador: 'Facultad de Informática',
            registro: 'https://registro-conferencia-ia.com',
            estado: 'Finalizado'
        },
        {
            titulo: 'Hackathon STEAM',
            imagen: 'images/hackathon.jpg',
            fecha: '2024-12-05',
            horaInicio: '09:00',
            horaFin: '09:00 (del día siguiente)',
            descripcion: 'Competencia de programación de 24 horas',
            publicoObjetivo: 'Estudiantes',
            lugar: 'Sala de Conferencias',
            organizador: 'Club de Programación',
            registro: 'https://registro-hackathon-steam.com',
            estado: 'Finalizado'
        }
    ];

    const eventosContainer = document.getElementById('eventos-container');
    const botonAnterior = document.getElementById('boton-anterior');
    const botonSiguiente = document.getElementById('boton-siguiente');
    let startIndex = 0;

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
                <p>Hora: ${evento.hora}</p>
                <p>Categoría: ${evento.categoria}</p>
                <p>Lugar: ${evento.lugar}</p>
                <p>Organizador: ${evento.organizador}</p>
                <p>Descripción: ${evento.descripcion}</p>
                <a href="#" class="detalles-link">Ver detalles</a>
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

    mostrarEventos();

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
