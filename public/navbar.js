document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar').querySelector('ul');

    // Verificar si el usuario está logueado
    const userLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
    const userType = localStorage.getItem('userType'); // Obtener el tipo de usuario

    if (userLoggedIn) {
        if (userType === 'profesor') {
            const gestionarEventosItem = document.createElement('li');
            gestionarEventosItem.innerHTML = '<a href="profesor_eventos.php">Gestionar Eventos</a>';
            navbar.appendChild(gestionarEventosItem);
            const crearEventoItem = document.createElement('li');
            crearEventoItem.innerHTML = '<a href="crear_evento.html">Crear Evento</a>';
            navbar.appendChild(crearEventoItem);
        } else if (userType === 'estudiante') {
            const crearEventoItem = document.createElement('li');
            crearEventoItem.innerHTML = '<a href="crear_evento.html">Crear Evento</a>';
            navbar.appendChild(crearEventoItem);
        }

        const logoutItem = document.createElement('li');
        logoutItem.innerHTML = '<a href="logout.php">Cerrar Sesión</a>';
        navbar.appendChild(logoutItem);
    } else {
        const loginItem = document.createElement('li');
        loginItem.innerHTML = '<a href="login.html">Iniciar Sesión</a>';

        const registerItem = document.createElement('li');
        registerItem.innerHTML = '<a href="register.html">Registrarse</a>';

        navbar.appendChild(loginItem);
        navbar.appendChild(registerItem);
    }
});
