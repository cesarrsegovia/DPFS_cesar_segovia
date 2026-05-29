# DevStyle - E-commerce para Desarrolladores

## Descripción del Proyecto

DevStyle es un mercado en línea diseñado específicamente para profesionales y estudiantes del mundo de la tecnología. Ofrecemos una selección curada de productos que mejoran el espacio de trabajo (setup), aumentan la productividad y permiten a los desarrolladores expresar su pasión por el código a través de su vestimenta y accesorios.

## Tecnologías Utilizadas

- **Backend:** Node.js con Express
- **Base de Datos:** PostgreSQL con Sequelize ORM
- **Motor de Plantillas:** EJS
- **Autenticación:** bcryptjs, express-session
- **Validaciones:** express-validator
- **Subida de Archivos:** multer

## Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/cesarrsegovia/DPFS_cesar_segovia.git
cd DPFS_cesar_segovia
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno:
```bash
# Copia el archivo .env.example a .env
cp .env.example .env
# Edita .env con tus credenciales de base de datos
```

4. Ejecuta las migraciones:
```bash
npx sequelize-cli db:migrate
```

5. Carga datos de prueba (opcional):
```bash
npx sequelize-cli db:seed:all
```

## Uso

### Desarrollo
```bash
npm run dev
```

### Producción
```bash
npm start
```

El servidor se ejecutará en `http://localhost:3000`

## Usuarios de Prueba

Después de ejecutar los seeders:

| Email | Contraseña | Rol |
|-------|-----------|-----|
| admin@devstyle.com | 123456 | admin |
| user@devstyle.com | 123456 | user |

## Estructura del Proyecto

```
├── config/          # Configuración de base de datos
├── migrations/      # Migraciones de Sequelize
├── models/          # Modelos de Sequelize
├── public/          # Archivos estáticos (CSS, JS, imágenes)
├── seeders/         # Datos de prueba
├── src/
│   ├── controllers/ # Controladores de la aplicación
│   ├── middlewares/ # Middlewares (auth, admin, etc.)
│   ├── routes/      # Definición de rutas
│   ├── views/       # Plantillas EJS
│   └── app.js       # Configuración de Express
├── .env             # Variables de entorno
└── index.js         # Punto de entrada
```

## API Endpoints

- `GET /api/users` - Lista todos los usuarios
- `GET /api/users/:id` - Obtiene un usuario por ID
- `GET /api/products` - Lista todos los productos (con relaciones y conteo por categoría)
- `GET /api/products/:id` - Obtiene el detalle de un producto por ID

## Inspiración y Referencias

Para la creación de **DevStyle** realizamos una investigación exhaustiva de referentes líderes en e-commerce y setups del mercado tecnológico:

1. **[Vercel Shop](https://goods.vercel.co/):** Inspiración principal para la estética *dark mode* elegante, el contraste vibrante y la tipografía moderna de la interfaz.
2. **[GitHub Shop](https://githubshop.com/):** Referencia en el catálogo de productos y vestimenta especializada para la comunidad de desarrolladores de software.
3. **[Keychron](https://www.keychron.com/):** Guía fundamental para la estructura, fotografías y campos detallados de la sección de periféricos y accesorios de setup.
4. **[DevTee](https://devtee.com/):** Inspirador para remeras con chistes de código y diseño de indumentaria geek.
5. **[Minimal Desk Setups](https://minimaldesksetups.com/):** Referencia para curación estética del setup y distribución ordenada de los accesorios.

## Tablero de Trabajo (Metodología Ágil)

Para coordinar de forma ágil y transparente las tareas a lo largo de los 8 Sprints de desarrollo, utilizamos el siguiente tablero de seguimiento:
* **Tablero de Trabajo:** [Trello DevStyle Board](https://trello.com/b/tf-dh-devstyle/devstyle-board)

## Autores

- **César Segovia**
  > Desarrollador Full-Stack en constante aprendizaje. Apasionado por la tecnología, el diseño minimalista de interfaces (*UI/UX*) y el código limpio. Este proyecto representa mi gran salto profesional en la integración de Node.js, Express, PostgreSQL y React.

## Licencia

ISC

