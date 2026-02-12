const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer'); // Importamos la librería que acabamos de instalar

const productsController = require('../controllers/productsController');

// --- CONFIGURACIÓN DE MULTER (Carga de archivos) ---
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Le decimos donde guardar el archivo
        cb(null, path.join(__dirname, '../../public/img'));
    },
    filename: (req, file, cb) => {
        // Le generamos un nombre único (ej: producto-12345678.jpg)
        // Esto evita que si subes dos fotos llamadas "foto.jpg" se sobrescriban
        const newFilename = 'product-' + Date.now() + path.extname(file.originalname);
        cb(null, newFilename);
    }
});

const upload = multer({ storage: storage });

// --- RUTAS ---

// 1. Listado y Detalle (Ya las tienes)
router.get('/detail/:id', productsController.detail);
router.get('/cart', productsController.cart);

// 2. Creación (Formulario) -> Ya la tienes
router.get('/create', productsController.create);

// 3. ACCIÓN DE CREACIÓN (Donde se envía el formulario)
// ¡Fíjate! Usamos upload.single('image') porque el input del formulario se llama name="image"
router.post('/', upload.single('image'), productsController.store);

// 4. Edición (Formulario) -> Ya la tienes
router.get('/edit/:id', productsController.edit);

// NUEVA RUTA PUT
// Usamos upload.single por si quiere cambiar la foto
router.put('/:id', upload.single('image'), productsController.update);

module.exports = router;