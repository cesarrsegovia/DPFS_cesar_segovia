window.addEventListener('load', () => {
    console.log("🕵️‍♂️ Script de validación de Login cargado.");

    const form = document.querySelector('.auth-form');
    const inputEmail = document.querySelector('#email');
    const inputPassword = document.querySelector('#password');

    const errorEmail = document.querySelector('#error-email');
    const errorPassword = document.querySelector('#error-password');

    form.addEventListener('submit', (event) => {
        let hayErrores = false;

        // Limpieza de errores anteriores
        errorEmail.innerText = '';
        errorPassword.innerText = '';

        // Validación de Correo
        if (inputEmail.value.trim() === '') {
            errorEmail.innerText = "El correo electrónico es obligatorio";
            hayErrores = true;
        } else if (!inputEmail.value.includes('@') || !inputEmail.value.includes('.')) {
            errorEmail.innerText = "Debes ingresar un formato de correo válido";
            hayErrores = true;
        }

        // Validación de Contraseña
        if (inputPassword.value.trim() === '') {
            errorPassword.innerText = "La contraseña es obligatoria";
            hayErrores = true;
        }

        if (hayErrores) {
            event.preventDefault();
        }
    });
});
