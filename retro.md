# Retrospectiva del Sprint 1

## Comenzar a hacer
- Organizar mejor los horarios de estudio.
- Buscar referencias de diseño antes de empezar el wireframe.

## Hacer más
- Utilizar Trello para marcar el progreso visualmente.

## Continuar haciendo
- Leer la documentación completa antes de empezar.

## Hacer menos
- Perder tiempo buscando la "fuente perfecta" al principio.

## Dejar de hacer
- Subestimar el tiempo que toma configurar el repositorio.

---

# Retrospectiva Sprint 2 (HTML + CSS)

## Qué salió bien (Start doing / Continue doing)
- Logré conectar el repositorio correctamente después de los problemas de conflicto.
- Entendí el concepto de rutas relativas (`../`) y cómo organizar las carpetas `views` y `public`.
- El diseño Dark Mode quedó moderno y profesional.

## Qué puedo mejorar (Do less / Stop doing)
- Me trabé un poco con los enlaces al principio, debo prestar más atención a dónde estoy parado en la estructura de carpetas.
- Organizar mejor mis tiempos para no correr al final.

## Acciones para el próximo Sprint
- Investigar un poco sobre EJS antes de empezar el Sprint 3.

---

# Retrospectiva Sprint 3 
- Aprendí a estructurar MVC y usar EJS para no repetir código.

---

# Retrospectiva Sprint 4 (CRUD y JSON)

## Continuar haciendo
- Probar cada ruta de Express (GET, POST, PUT, DELETE) antes de armar las vistas completas.
- Mantener la organización del archivo JSON para que no se rompa la estructura de datos.

## Comenzar a hacer
- Prestar más atención a la configuración de Multer para la subida de imágenes, me generó algunos dolores de cabeza al principio.
- Hacer copias de seguridad del archivo JSON por si accidentalmente borro todos los productos probando el método DELETE.

---

# Retrospectiva Sprint 5 (Middlewares, Session y Cookies)

## Qué salió bien
- Logré implementar el sistema de login y registro. Entender cómo viaja la información del usuario en `req.session` fue un gran avance.

## Dejar de hacer
- Olvidar requerir `express-session` en el `app.js` antes de intentar usarlo.
- Dejar las contraseñas en texto plano (empecé a usar `bcryptjs` y fue clave para la seguridad).

## Acciones para el próximo Sprint
- Repasar bien cómo funcionan los middlewares de ruta vs. los middlewares de aplicación, ya que a veces las redirecciones me fallaban.

---

# Retrospectiva Sprint 6 (Bases de Datos con Sequelize)

## Lo que hice bien
- La transición de archivos estáticos (JSON) a una Base de Datos Relacional (PostgreSQL) usando Sequelize fue un éxito. 
- Logré modelar correctamente las tablas de Usuarios y Productos.

## Lo que debo mejorar
- Asustarme con los errores de consola de SQL. Entendí que los errores de conexión suelen ser por credenciales mal puestas en la configuración.

## Comenzar a hacer
- Planificar bien las relaciones (1 a muchos, muchos a muchos) en un diagrama o papel antes de escribir los modelos en código.

---

# Retrospectiva Sprint 7 (Validaciones Front-end y APIs)

## Continuar haciendo
- Separar responsabilidades: Mantuve el código del backend ordenado, creando carpetas y controladores separados para las vistas (`EJS`) y para las APIs (`JSON`).

## Comenzar a hacer
- Commits más frecuentes. Al implementar las APIs RESTful (`/api/users` y `/api/products`), junté muchos cambios de golpe. Debería hacer `git commit` por cada endpoint terminado.

## Qué aprendí
- Tomar el control del formulario con JavaScript puro (`preventDefault`) y apagar la validación nativa del navegador (`novalidate`) para dar una mejor experiencia de usuario con los errores.

---

# Retrospectiva Sprint 8 (React Dashboard)

## Lo que hice bien
- **Refactorización:** Aprendí a no conformarme solo con que el código "funcione". En el Dashboard de React, logré separar un archivo gigante en componentes limpios y reutilizables (`MetricCard`, `ProductList`, etc.).
- **Enfrentar la asincronía:** Dominé el uso del Hook `useEffect` y `fetch` para conectar mi Front-end con la Base de Datos.

## Dejar de hacer
- Pelear con los puertos. Entendí que el bloqueo de CORS y el conflicto del puerto 3000 entre Express y React se solucionan fácil configurando el `.env`.

## Pensar a futuro
- Pensar en "Piezas de Lego" desde el principio. Antes de escribir código JSX gigante, planear qué partes de la interfaz pueden separarse en componentes pequeños.