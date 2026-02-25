window.addEventListener('load', () => {
    console.log("🕵️‍♂️ Script de validación listo para inyectar errores.");

    const form = document.querySelector('.auth-form'); 
    
    // 1. Atrapamos los inputs
    const inputName = document.querySelector('#name');
    const inputEmail = document.querySelector('#email'); 
    const inputPassword = document.querySelector('#password'); 

    // 2. Atrapamos las cajitas vacías para los errores
    const errorName = document.querySelector('#error-name');
    const errorEmail = document.querySelector('#error-email');
    const errorPassword = document.querySelector('#error-password');

    form.addEventListener('submit', (event) => {
        let hayErrores = false; // Una bandera para saber si frenamos el formulario

        // --- LIMPIEZA INICIAL ---
        // Borramos los errores anteriores cada vez que el usuario vuelve a intentar
        errorName.innerText = '';
        errorEmail.innerText = '';
        errorPassword.innerText = '';

        // --- VALIDACIÓN DEL NOMBRE ---
        if (inputName.value.trim() === '') {
            errorName.innerText = "El nombre no puede estar vacío"; // Escribimos en la cajita
            hayErrores = true;
        } else if (inputName.value.length < 2) {
            errorName.innerText = "El nombre debe tener al menos 2 caracteres";
            hayErrores = true;
        }

        // --- VALIDACIÓN DEL CORREO ---
        if (inputEmail.value.trim() === '') {
            errorEmail.innerText = "El correo electrónico es obligatorio";
            hayErrores = true;
        } else if (!inputEmail.value.includes('@') || !inputEmail.value.includes('.')) {
            errorEmail.innerText = "Debes ingresar un formato de correo válido";
            hayErrores = true;
        }

        // --- VALIDACIÓN DE LA CONTRASEÑA ---
        if (inputPassword.value.trim() === '') {
            errorPassword.innerText = "La contraseña no puede estar vacía";
            hayErrores = true;
        } else if (inputPassword.value.length < 8) {
            errorPassword.innerText = "La contraseña debe tener al menos 8 caracteres";
            hayErrores = true;
        }

        // --- SI HAY ERRORES, FRENAMOS TODO ---
        if (hayErrores) {
            event.preventDefault(); // Frenamos el formulario, ¡pero ya no usamos alert()!
        }
    });
});