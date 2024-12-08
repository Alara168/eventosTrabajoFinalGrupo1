// login.js

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login');

    // Manejar el evento de envío del formulario
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

        // Obtener los valores de los campos de entrada
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Validación básica
        if (username === '' || password === '') {
            alert('Por favor, completa todos los campos.');
            return;
        }

        // Crear el objeto de datos a enviar
        const loginData = {
            username: username,
            password: password
        };

        // Enviar la solicitud POST al servidor
        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Indica que se envían datos en formato JSON
            },
            body: JSON.stringify(loginData) // Convertir el objeto a una cadena JSON
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.status);
            }
            return response.json(); // Parsear la respuesta como JSON
        })
        .then(data => {
            // Manejar la respuesta del servidor
            if (data.success) {
                alert('Inicio de sesión exitoso. Bienvenido!');
                window.location.href = 'dashboard.html'; // Redirigir a otra página
            } else {
                alert(data.message || 'Nombre de usuario o contraseña incorrectos.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un problema con la solicitud. Inténtalo más tarde.');
        });
    });
});