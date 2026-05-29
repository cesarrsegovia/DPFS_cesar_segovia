window.addEventListener('load', () => {
    console.log("🕵️‍♂️ Script de validación de Producto cargado.");

    const form = document.querySelector('.product-form');
    if (!form) return;

    const inputName = document.querySelector('#name');
    const inputPrice = document.querySelector('#price');
    const inputDescription = document.querySelector('#description');
    const inputImage = document.querySelector('#image');

    const errorName = document.querySelector('#error-name');
    const errorPrice = document.querySelector('#error-price');
    const errorDescription = document.querySelector('#error-description');
    const errorImage = document.querySelector('#error-image');

    form.addEventListener('submit', (event) => {
        let hayErrores = false;

        // Limpieza de errores anteriores
        if (errorName) errorName.innerText = '';
        if (errorPrice) errorPrice.innerText = '';
        if (errorDescription) errorDescription.innerText = '';
        if (errorImage) errorImage.innerText = '';

        // 1. Validación del nombre
        if (inputName.value.trim() === '') {
            errorName.innerText = "El nombre del producto es obligatorio";
            hayErrores = true;
        } else if (inputName.value.length < 5) {
            errorName.innerText = "El nombre debe tener al menos 5 caracteres";
            hayErrores = true;
        }

        // 2. Validación del precio
        if (inputPrice.value.trim() === '') {
            errorPrice.innerText = "El precio es obligatorio";
            hayErrores = true;
        } else if (parseFloat(inputPrice.value) < 0) {
            errorPrice.innerText = "El precio no puede ser negativo";
            hayErrores = true;
        }

        // 3. Validación de la descripción
        if (inputDescription.value.trim() === '') {
            errorDescription.innerText = "La descripción es obligatoria";
            hayErrores = true;
        } else if (inputDescription.value.length < 20) {
            errorDescription.innerText = "La descripción debe tener al menos 20 caracteres";
            hayErrores = true;
        }

        // 4. Validación de la imagen
        const isEdit = form.action.includes('?_method=PUT');
        const file = inputImage.files[0];
        const acceptedExtensions = ['jpg', 'jpeg', 'png', 'gif'];

        if (!file && !isEdit) {
            errorImage.innerText = "Debes subir una imagen para el producto";
            hayErrores = true;
        } else if (file) {
            const fileName = file.name;
            const fileExtension = fileName.split('.').pop().toLowerCase();
            if (!acceptedExtensions.includes(fileExtension)) {
                errorImage.innerText = `Las extensiones permitidas son: ${acceptedExtensions.join(', ')}`;
                hayErrores = true;
            }
        }

        if (hayErrores) {
            event.preventDefault();
        }
    });
});
