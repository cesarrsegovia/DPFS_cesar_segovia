-- Script de estructura para la Base de Datos de DevStyle
-- PostgreSQL

-- 1. Crear Base de Datos si no existe
CREATE DATABASE devstyle_db;

-- Conectarse a la base de datos (comando meta de psql o pgAdmin)
-- \c devstyle_db;

-- 2. Crear Tabla de Usuarios (Users)
CREATE TABLE IF NOT EXISTS "Users" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) UNIQUE NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "rol" VARCHAR(255) NOT NULL DEFAULT 'user',
    "image" VARCHAR(255) DEFAULT 'default-avatar.png',
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 3. Crear Tabla de Productos (Products)
CREATE TABLE IF NOT EXISTS "Products" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "price" DECIMAL(10, 2) NOT NULL,
    "category" VARCHAR(255) NOT NULL,
    "image" VARCHAR(255) DEFAULT 'default-image.png',
    "userId" INTEGER REFERENCES "Users"("id") ON UPDATE CASCADE ON DELETE SET NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);
