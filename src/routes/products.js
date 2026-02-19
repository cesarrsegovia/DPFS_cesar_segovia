const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const path = require('path');
const multer = require('multer'); // Importamos la librería que acabamos de instalar

const productsController = require('../controllers/productsController');
// 1. IMPORTAMOS AL NUEVO GUARDIA
const adminMiddleware = require('../middlewares/adminMiddleware');

// 2. DEFINIMOS LAS VALIDACIONES
const validateCreateProduct = [
    body('name').notEmpty().withMessage('El nombre es obligatorio'),
    body('price').notEmpty().withMessage('El precio es obligatorio'),
    
    // 🔥 NUEVO: VALIDACIÓN PERSONALIZADA PARA LA IMAGEN
    body('image').custom((value, { req }) => {
        let file = req.file; // Multer ya procesó la imagen y la puso aquí
        let acceptedExtensions = ['.jpg', '.png', '.gif', '.jpeg'];

        if (!file) {
            throw new Error('Tienes que subir una imagen'); // Error si no hay archivo
        } else {
            // (Opcional) Validar extensión
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error(`Las extensiones permitidas son ${acceptedExtensions.join(', ')}`);
            }
        }

        return true; // Si pasa todo, devolvemos true
    })
];

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

// Rutas Públicas (Cualquiera entra)
router.get('/', productsController.index);
router.get('/cart', productsController.cart);
router.get('/detail/:id', productsController.detail);

// 👇 2. USAMOS adminMiddleware EN LUGAR DE authMiddleware
// CREATE
router.get('/create', adminMiddleware, productsController.create);
router.post('/', upload.single('image'), validateCreateProduct, productsController.store);

// EDIT & UPDATE
router.get('/edit/:id', adminMiddleware, productsController.edit);
router.put('/:id', adminMiddleware, upload.single('image'), productsController.update);

// DELETE
router.delete('/:id', adminMiddleware, productsController.destroy);

module.exports = router;