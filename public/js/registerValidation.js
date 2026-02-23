window.addEventListener('load', () => {
    console.log("🕵️‍♂️ Script de validación de registro conectado y listo.");

    // 1. Atrapamos el formulario y TODOS los inputs
    const form = document.querySelector('.auth-form'); 
    const inputName = document.querySelector('#name');
    
    // 👇 NUEVOS INPUTS ATRAPADOS (Asegúrate de que tengan id="email" e id="password" en tu HTML)
    const inputEmail = document.querySelector('#email'); 
    const inputPassword = document.querySelector('#password'); 

    form.addEventListener('submit', (event) => {
        let errores = []; 

        // --- VALIDACIÓN DEL NOMBRE ---
        if (inputName.value.trim() === '') {
            errores.push("El nombre no puede estar vacío");
        } else if (inputName.value.length < 2) {
            errores.push("El nombre debe tener al menos 2 caracteres");
        }

        // 👇 --- VALIDACIÓN DEL CORREO --- 👇
        if (inputEmail.value.trim() === '') {
            errores.push("El correo electrónico es obligatorio");
        } else if (!inputEmail.value.includes('@') || !inputEmail.value.includes('.')) {
            // Una validación sencillita para asegurar que parezca un correo
            errores.push("Debes ingresar un formato de correo válido (ej: usuario@mail.com)");
        }

        // 👇 --- VALIDACIÓN DE LA CONTRASEÑA --- 👇
        if (inputPassword.value.trim() === '') {
            errores.push("La contraseña no puede estar vacía");
        } else if (inputPassword.value.length < 8) {
            errores.push("La contraseña debe tener al menos 8 caracteres");
        }

        // --- SI HAY ERRORES, FRENAMOS TODO ---
        if (errores.length > 0) {
            event.preventDefault(); 
            
            // Mostramos TODOS los errores juntos
            alert("⚠️ CORRIGE ESTOS ERRORES:\n\n- " + errores.join('\n- '));
        }
    });
});