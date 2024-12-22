document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('register');
    const userTypeSelect = document.getElementById('user-type');
    const verificationCodeInput = document.getElementById('verification-code');

    userTypeSelect.addEventListener('change', function() {
        if (this.value === 'profesor') {
            verificationCodeInput.style.display = 'block';
            verificationCodeInput.required = true;
        } else {
            verificationCodeInput.style.display = 'none';
            verificationCodeInput.required = false;
            verificationCodeInput.value = '';
        }
    });

    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const userType = userTypeSelect.value;
        const verificationCode = verificationCodeInput.value;

        if (username === '' || email === '' || password === '' || userType === '' || (userType === 'profesor' && verificationCode === '')) {
            alert('Por favor, completa todos los campos requeridos.');
            return;
        }

        let formData = `username=${encodeURIComponent(username)}&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}&userType=${encodeURIComponent(userType)}`;
        
        if (userType === 'profesor') {
            formData += `&verificationCode=${encodeURIComponent(verificationCode)}`;
        }

        fetch('register.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Registro exitoso. Por favor, inicia sesión.');
                window.location.href = 'login.html';
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
