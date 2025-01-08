document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login');
    const messageDiv = document.getElementById('message');

    // Manejar el evento de envío del formulario
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

        // Obtener los valores de los campos de entrada
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Validación básica
        if (username === '' || password === '') {
            messageDiv.innerHTML = '<div class="error-message">Por favor, completa todos los campos.</div>';
            return;
        }

        // Crear el objeto de datos a enviar
        const loginData = new URLSearchParams();
        loginData.append('username', username);
        loginData.append('password', password);

        // Enviar la solicitud POST al servidor
        fetch('login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: loginData.toString() // Convertir el objeto a una cadena URL-encoded
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la comunicación con el servidor.');
            }
            return response.json();
        })
        .then(jsonData => {
            if (jsonData.success) {
                // Guardar el estado del usuario en localStorage
                localStorage.setItem('userLoggedIn', 'true');
                localStorage.setItem('userType', jsonData.userType); // Guardar el tipo de usuario (profesor o estudiante)
                window.location.href = jsonData.redirect; // Redirige a la página especificada
            } else {
                messageDiv.innerHTML = `<div class="error-message">${jsonData.message}</div>`;
            }
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
            messageDiv.innerHTML = `<div class="error-message">${error.message}</div>`;
        });
    });
});
