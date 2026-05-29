-- Script de inserción de datos semilla para DevStyle
-- PostgreSQL

-- 1. Inserción de Usuarios de Prueba
-- Las contraseñas corresponden a '123456' encriptado con bcrypt (10 rounds)
INSERT INTO "Users" ("name", "email", "password", "rol", "image", "createdAt", "updatedAt") 
VALUES 
(
    'Admin User', 
    'admin@devstyle.com', 
    '$2a$10$UoW01D78i1Z37k3a46E71eGSwxGj8mC.N0qXo4jC5GvP2uH7KwqyG', -- 123456
    'admin', 
    'admin.png', 
    CURRENT_TIMESTAMP, 
    CURRENT_TIMESTAMP
),
(
    'Test User', 
    'user@devstyle.com', 
    '$2a$10$UoW01D78i1Z37k3a46E71eGSwxGj8mC.N0qXo4jC5GvP2uH7KwqyG', -- 123456
    'user', 
    'user.png', 
    CURRENT_TIMESTAMP, 
    CURRENT_TIMESTAMP
)
ON CONFLICT ("email") DO NOTHING;

-- 2. Inserción de Productos de Prueba
-- Mapeamos userId = 1 (el primer usuario, administrador)
INSERT INTO "Products" ("name", "description", "price", "category", "image", "userId", "createdAt", "updatedAt")
VALUES
(
    'Teclado Mecánico RGB', 
    'El teclado definitivo para tu setup de programador. Switches Cherry MX Blue altamente táctiles y retroiluminación RGB de alta precisión.', 
    120.00, 
    'perifericos', 
    'teclado.jpg', 
    1,
    CURRENT_TIMESTAMP, 
    CURRENT_TIMESTAMP
),
(
    'Mouse Ergonómico', 
    'Mouse inalámbrico de alta precisión con sensor de hasta 4000 DPI. Previene la fatiga en largas jornadas de desarrollo de software.', 
    55.00, 
    'perifericos', 
    'mouse.jpg', 
    1,
    CURRENT_TIMESTAMP, 
    CURRENT_TIMESTAMP
),
(
    'T-Shirt Hello World', 
    'Remera de algodón 100% hilado premium. Con chistes y frases de código ingeniosos para programadores y amantes de la informática.', 
    25.00, 
    'ropa', 
    'remera.jpg', 
    1,
    CURRENT_TIMESTAMP, 
    CURRENT_TIMESTAMP
),
(
    'Lentes Blue Light', 
    'Protege tu vista de la dañina luz azul de las pantallas y monitores LCD/OLED. Ideales para programadores nocturnos.', 
    30.00, 
    'accesorios', 
    'lentes.jpg', 
    1,
    CURRENT_TIMESTAMP, 
    CURRENT_TIMESTAMP
);
