document.addEventListener('DOMContentLoaded', function () {
    const eventos = [
        {
            titulo: 'Taller de Robótica',
            fecha: '2024-12-01',
            hora: '15:00',
            categoria: 'Estudiantes',
            lugar: 'Laboratorio de Robótica',
            organizador: 'Departamento de Ingeniería',
            descripcion: 'Taller práctico de introducción a la robótica',
            registro: 'https://registro-taller-robotica.com'
        },
        {
            titulo: 'Conferencia IA',
            fecha: '2024-12-03',
            hora: '18:00',
            categoria: 'Comunidad Universitaria',
            lugar: 'Auditorio Principal',
            organizador: 'Facultad de Informática',
            descripcion: 'Charla sobre los últimos avances en Inteligencia Artificial',
            registro: 'https://registro-conferencia-ia.com'
        },
        {
            titulo: 'Hackathon STEAM',
            fecha: '2024-12-05',
            hora: '09:00',
            categoria: 'Estudiantes',
            lugar: 'Sala de Conferencias',
            organizador: 'Club de Programación',
            descripcion: 'Competencia de programación de 24 horas',
            registro: 'https://registro-hackathon-steam.com'
        },
        {
            titulo: 'Presentación aliado estratégico STEAM',
            fecha: '2024-12-15',
            hora: '09 :00',
            categoria: 'Información',
            lugar: 'Sala de Conferencias A',
            organizador: 'Dirección de la Escuela',
            descripcion: 'Presentación de nuevo aliado estratégico para proyectos STEAM',
            registro: 'https://registro-presentacion-aliado.com'
        },
        {
            titulo: 'Práctica laboratorio investigación microbiana',
            fecha: '2024-12-18',
            hora: '19 :00',
            categoria: 'Estudiantes',
            lugar: 'Sala de Conferencias B',
            organizador: 'Departamento de Biología',
            descripcion: 'Práctica de laboratorio sobre investigación microbiana',
            registro: 'https://registro-practica-microbiana.com'
        },
        {
            titulo: 'Práctica laboratorio investigación microbiana 2',
            fecha: '2024-12-18',
            hora: '19 :00',
            categoria: 'Estudiantes',
            lugar: 'Sala de Conferencias B',
            organizador: 'Departamento de Biología',
            descripcion: 'Práctica de laboratorio sobre investigación microbiana',
            registro: 'https://registro-practica-microbiana.com'
        },
        {
            titulo: 'Práctica laboratorio investigación microbiana 3',
            fecha: '2024-12-18',
            hora: '19 :00',
            categoria: 'Estudiantes',
            lugar: 'Sala de Conferencias B',
            organizador: 'Departamento de Biología',
            descripcion: 'Práctica de laboratorio sobre investigación microbiana',
            registro: 'https://registro-practica-microbiana.com'
        }
    ];

    const eventosContainer = document.getElementById('eventos-container');
    const botonAnterior = document.getElementById('boton-anterior');
    const botonSiguiente = document.getElementById('boton-siguiente');
    let startIndex = 0;

    function mostrarEventos() {
        // Disminuir la opacidad antes de cambiar los eventos
        eventosContainer.style.opacity = 0;

        setTimeout(() => {
            // Limpiar el contenedor sin eliminarlo
            eventosContainer.innerHTML = '';

            // Mostrar los eventos actuales
            for (let i = startIndex; i < startIndex + 4 && i < eventos.length; i++) {
                const evento = eventos[i];
                const eventoCard = document.createElement('div');
                eventoCard.className = 'evento-card';

                eventoCard.innerHTML = `
                     <h3>${evento.titulo}</h3>
                     <p>Fecha:${evento.fecha}</p>
                     <p>Hora:${evento.hora}</p>
                     <p>Categoría:${evento.categoria}</p>
                     <p>Lugar:${evento.lugar}</p>
                     <p>Organizador:${evento.organizador}</p>
                     <p>Descripción:${evento.descripcion}</p>
                     <a href="${evento.registro}" target="_blank">Registro</a>
                 `;

                eventosContainer.appendChild(eventoCard);
            }

            // Controlar la visibilidad de los botones
            botonAnterior.style.visibility = startIndex > 0 ? 'visible' : 'hidden';
            botonSiguiente.style.visibility = startIndex + 4 < eventos.length ? 'visible' : 'hidden';

            // Aumentar la opacidad después del cambio
            eventosContainer.style.opacity = 1;

        }, 300); // Esperar a que la transición se complete antes de cambiar el contenido
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

    // Código para el horario semanal, mostrando los próximos 7 días con horas
    const horarioTable = document.getElementById('horario-table');

    function generarDiasSiguientes() {
        const diasSiguientes = [];
        const hoy = new Date();

        for (let i = 0; i < 7; i++) {
            const dia = new Date(hoy);
            dia.setDate(hoy.getDate() + i);
            diasSiguientes.push(dia.toLocaleDateString('es-ES')); // Formato español
        }

        return diasSiguientes;
    }

    const diasDeLaSemana = generarDiasSiguientes();

    let headerRow = '<tr><th>Horas</th>';
    diasDeLaSemana.forEach(dia => {
        headerRow += `<th>${dia}</th>`;
    });
    headerRow += '</tr>';
    horarioTable.innerHTML = headerRow;

    const horas = ['09:00', '11:00', '13:00', '15:00', '17:00'];

    horas.forEach(hora => {
        let row = `<tr><td>${hora}</td>`;
        diasDeLaSemana.forEach(() => {
            row += '<td></td>'; // Celdas vacías para cada día
        });
        row += '</tr>';
        horarioTable.innerHTML += row;
    });
});

// Código existente

// Funciones para login y registro
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login');
    const registerForm = document.getElementById('register');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            // Aquí iría la lógica de autenticación
            console.log('Intento de inicio de sesión:', username);
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('reg-username').value;
            const email = document.getElementById('reg-email').value;
            const password = document.getElementById('reg-password').value;
            const userType = document.getElementById('user-type').value;
            const verificationCode = document.getElementById('verification-code').value;
            // Aquí iría la lógica de registro
            console.log('Intento de registro:', { username, email, userType, verificationCode });
        });
    }
});