# React-node-app

Aplicación con React, Nodejs, Redux y PSQL para manejo de posts.

## Estructura del Repositorio

.
├── my-post-app         # Código del frontend (React)
├── backend             # Código del backend (Node.js, Sequelize)
└── README.md           # Información general del proyecto

## Clonar el Repositorio

```bash
git clone <url_del_repositorio>
cd react-node
```

## Requisitos Previos
Asegúrate de tener instalados los siguientes requisitos antes de comenzar:

Node.js (v21.3.0)
PostgreSQL (vX14.12)
npm

## Configuración del Entorno
Copia el archivo .env.example en el backend y renómbralo a .env.
Completa las variables de entorno necesarias en el archivo .env. con los datos de tu DB

## Instalación de Dependencias

# Instalar dependencias del backend

```bash
cd backend
npm install
```

# Instalar dependencias del frontend

```bash
cd my-post-app
npm install
```

## Creación y Configuración de la Base de Datos

# Crear la base de datos (si aún no existe)
createdb nombre_de_la_base_de_datos

# Ejecutar migraciones
npm run sequelize db:migrate


## Ejecución de la Aplicación

# Iniciar el servidor backend
```bash
cd backend
npm start
```
ç
# Iniciar el servidor frontend (si es una aplicación de React)

```bash
cd my-post-app
npm start
```



