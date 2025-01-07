document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar').querySelector('ul');

    // Verificar si el usuario está logueado (por ejemplo, comprobando una cookie o localStorage)
    const userLoggedIn = localStorage.getItem('userLoggedIn'); // Simula el estado del usuario

    if (userLoggedIn === 'true') {
        // Opciones adicionales para usuarios logueados
        const crearEventoItem = document.createElement('li');
        crearEventoItem.innerHTML = '<a href="crear_evento.html">Crear Evento</a>';

        const logoutItem = document.createElement('li');
        logoutItem.innerHTML = '<a href="logout.html">Cerrar Sesión</a>';

        navbar.appendChild(crearEventoItem);
        navbar.appendChild(logoutItem);
    } else {
        // Opciones para usuarios no logueados
        const loginItem = document.createElement('li');
        loginItem.innerHTML = '<a href="login.html">Iniciar Sesión</a>';

        const registerItem = document.createElement('li');
        registerItem.innerHTML = '<a href="register.html">Registrarse</a>';

        navbar.appendChild(loginItem);
        navbar.appendChild(registerItem);
    }
});
