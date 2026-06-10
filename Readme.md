# 📸 Fotaza 2

Trabajo Práctico Integrador - Programación Web II.

Fotaza 2 es una aplicación web desarrollada con Node.js, Express, Sequelize y MySQL que permite compartir fotografías, interactuar con otros usuarios y gestionar contenido mediante un sistema de publicaciones, comentarios, seguidores y notificaciones.

---

## 🚀 Tecnologías utilizadas

- Node.js
- Express.js
- Sequelize ORM
- MySQL
- Pug
- Bootstrap 5
- Express Session
- bcrypt
- Multer

---

## 📦 Instalación

Clonar repositorio:

```bash
git clone https://github.com/Segu33/Fotaza2.git
```

Instalar dependencias:

```bash
npm install
```

---

## ⚙️ Variables de entorno

Crear un archivo `.env` utilizando el archivo `.env.example`.

Ejemplo:

```env
PORT=3000

DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=fotaza2

SESSION_SECRET=secreto123
```

---

## 🗄 Base de datos

Importar el archivo:

```text
fotaza2.sql
```

incluido en el proyecto.

---

## ▶️ Ejecución

Modo desarrollo:

```bash
npm run dev
```

Modo producción:

```bash
npm start
```

Aplicación disponible en:

```text
http://localhost:3000
```

---

## 👤 Usuarios de prueba

| Usuario | Email | Contraseña |
|----------|----------|----------|
| Usuario 1 | bren@lopez.com | prueba123 |
| Usuario 2 | man@tester.com | prueba123 |
| Usuario 3 | luis@test.com | prueba123 |
| Usuario 4 | man2@tester.com | prueba123 |

---

## ✅ Funcionalidades implementadas

### Autenticación

- Registro de usuarios
- Inicio de sesión
- Cierre de sesión
- Contraseñas cifradas con bcrypt

### Publicaciones

- Crear publicaciones
- Subir imágenes
- Título y descripción
- Visualización de publicaciones
- Vista detalle

### Interacciones

- Comentarios
- Valoraciones
- Favoritos
- Seguimiento de usuarios

### Notificaciones

- Comentarios
- Valoraciones
- Favoritos
- Nuevos seguidores
- Publicaciones bloqueadas

### Moderación

- Denuncias de publicaciones
- Bloqueo automático por exceso de denuncias
- Ocultamiento de publicaciones bloqueadas

### Perfil

- Perfil de usuario
- Seguidores
- Seguidos
- Publicaciones realizadas

---

## 📁 Estructura del proyecto

```text
Fotaza2
│
├── database
├── src
│   ├── config
│   ├── controllers
│   ├── helpers
│   ├── middlewares
│   ├── models
│   ├── public
│   ├── routes
│   └── views
│
├── package.json
├── server.js
└── README.md
```

---

## 🧩 Problemas encontrados

### Gestión de notificaciones

Se presentaron inconvenientes al agregar nuevos tipos de notificaciones.

**Solución:** actualización del modelo Sequelize y adecuación de la tabla en MySQL.

### Publicaciones denunciadas

Las publicaciones bloqueadas seguían apareciendo en determinadas vistas.

**Solución:** incorporación del campo `bloqueada` y filtrado de resultados.

### Carga de imágenes

Se detectaron problemas al guardar imágenes.

**Solución:** corrección de la configuración de Multer y persistencia de datos.

---

## 👨‍💻 Autor

Luis Segura

Trabajo Práctico Integrador

Programación Web II - 2026