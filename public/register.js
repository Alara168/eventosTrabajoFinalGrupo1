// register.js

document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('register');

    // Manejar el evento de envío del formulario
    registerForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

        // Obtener los valores de los campos de entrada
        const username = document.getElementById('reg-username').value;
        const email = document.getElementById('reg-email').value;
        const password = document.getElementById('reg-password').value;
        const userType = document.getElementById('user-type').value;
        const verificationCode = document.getElementById('verification-code').value;

        // Validación básica
        if (username === '' || email === '' || password === '' || userType === '' || verificationCode === '') {
            alert('Por favor, completa todos los campos.');
            return;
        }

        // Crear el objeto de datos a enviar
        const registerData = {
            username: username,
            email: email,
            password: password,
            userType: userType,
            verificationCode: verificationCode
        };

        // Enviar la solicitud POST al servidor
        fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Indica que se envían datos en formato JSON
            },
            body: JSON.stringify(registerData) // Convertir el objeto a una cadena JSON
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
                alert('Registro exitoso. Por favor, inicia sesión.');
                window.location.href = 'login.html'; // Redirigir a la página de inicio de sesión
            } else {
                alert(data.message || 'Hubo un problema con el registro. Inténtalo de nuevo.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un problema con la solicitud. Inténtalo más tarde.');
        });
    });
});