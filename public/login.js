document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login');
    const messageDiv = document.getElementById('message');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === '' || password === '') {
            messageDiv.innerHTML = '<div class="error-message">Por favor, completa todos los campos.</div>';
            return;
        }

        const loginData = new URLSearchParams();
        loginData.append('username', username);
        loginData.append('password', password);

        fetch('login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: loginData.toString()
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la comunicación con el servidor.');
            }
            return response.json();
        })
        .then(jsonData => {
            if (jsonData.success) {
                localStorage.setItem('userLoggedIn', 'true');
                localStorage.setItem('userType', jsonData.userType); 
                window.location.href = jsonData.redirect; 
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
