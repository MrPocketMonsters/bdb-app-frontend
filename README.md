# 🚀 bdb-frontend

Frontend de ejemplo para el portal de capacitaciones de BDB.

Este proyecto está basado en el starter "vite-tailwind-docker-starter" de maldonadomatias: https://github.com/maldonadomatias/vite-tailwind-docker-starter

El objetivo de este repo es ser la interfaz (frontend) que consume los servicios backend cuya especificación OpenAPI/Swagger está incluida en el directorio `api-docs`.

## 🧾 Contenido relevante

- API specs (OpenAPI JSON):
	- `api-docs/bdb-app-user-management-api-docs.json` — user & auth
	- `api-docs/bdb-app-course-management-api-docs.json` — cursos, módulos y userhistory

## ⚙️ Requisitos

- Node.js (14+ o preferentemente 16+/18+)
- npm o yarn

## 🛠️ Instalación y desarrollo

1. Instalar dependencias:

```powershell
npm install
```

2. Levantar el servidor de desarrollo (Vite):

```powershell
npm run dev
```

Al ejecutar `npm run dev` Vite arrancará un servidor local (por defecto en http://localhost:5173) con HMR (Hot Module Replacement). Esto significa que cuando edites componentes, estilos o la mayoría de archivos del proyecto, los cambios se aplicarán en caliente sin recargar toda la página.

Si necesitas compilar para producción:

```powershell
npm run build
npm run preview
```

## 🐳 Uso con Docker

Comandos provistos para construir e instanciar el contenedor (incluyen un montaje de `src` para desarrollo en caliente desde el host):

```powershell
docker build -t bdb-frontend .

docker run --name bdb-frontend -p 5173:5173 --mount type=bind,source="$(pwd)"/src,target=/app/src -v /app/node_modules bdb-frontend
```

Notas sobre el comando Docker:
- El montaje `--mount type=bind,source="$(pwd)"/src,target=/app/src` permite editar el código en tu máquina y que el contenedor vea los cambios — combinado con Vite esto habilita HMR mientras desarrollas dentro del contenedor.
- El volumen `-v /app/node_modules` evita que los módulos del contenedor sean sobreescritos por los del host.

## 🔌 Endpoints consumidos en esta primera iteración

Las siguientes rutas están definidas en las especificaciones OpenAPI incluidas en `api-docs`. En esta primera iteración el frontend consume los endpoints listados a continuación (método HTTP + ruta exacta):

- POST  /api/v1/auth/login
	- Operación: login
	- Descripción: autenticación de usuario; espera credenciales (email + password) y devuelve token (JWT) en la respuesta.

- POST  /api/v1/auth/register
	- Operación: register
	- Descripción: registro de nuevos usuarios (email, password, name).

- GET   /api/v1/users/{id}
	- Operación: getUserById
	- Descripción: obtiene los datos públicos de un usuario por su `id`.

- GET   /api/v1/userhistories/{userId}
	- Operación: getUserChapterHistory
	- Descripción: obtiene el historial (chapters) de un usuario por su `userId`.

- GET   /api/v1/userhistories/{userId}/courses
	- Operación: getAllUserRecognitions
	- Descripción: lista los reconocimientos de cursos asociados a un usuario (usado para mostrar cursos finalizados).

Nota: las rutas y modelos están definidas en los archivos JSON dentro de `api-docs`. Se recomienda usar esas especificaciones para generar clientes/validaciones o para documentar más a fondo las estructuras de request/response.

## 🔧 Configuración de la URL del API

Por conveniencia el frontend debería leer la URL base del API desde variables de entorno (Vite usa `import.meta.env`). Puedes definir en un archivo `.env` en la raíz del proyecto, por ejemplo:

```env
VITE_API_BASE_URL=https://tu-backend.local/api/v1
```

y usar `import.meta.env.VITE_API_BASE_URL` desde el código para construir las solicitudes.

Si trabajas localmente y usas los servidores remotos que aparecen en las especificaciones OpenAPI, ajusta `VITE_API_BASE_URL` a la URL correspondiente.

## ✅ Cómo probar / flujo básico

1. Levanta el frontend (`npm run dev` o usando Docker con el `--mount` descrito arriba).
2. Registra un usuario (POST `/api/v1/auth/register`).
3. Haz login (POST `/api/v1/auth/login`) y guarda el JWT.
4. Usa el JWT en el header `Authorization: Bearer <token>` para consultar rutas protegidas, por ejemplo GET `/api/v1/users/{id}` o GET `/api/v1/userhistories/{userId}/courses`.

## 📌 Recursos y siguientes pasos recomendados

- Generar/actualizar cliente API a partir de los JSON en `api-docs` (OpenAPI codegen o herramientas como Swagger Codegen / OpenAPI Generator) para evitar inconsistencias en las rutas y los tipos.
- Añadir ejemplos de llamadas (scripts cURL o Postman collection) usando las especificaciones en `api-docs`.
- Agregar manejo centralizado de tokens (refresh, expiración) y errores de backend para mejorar la experiencia de usuario.

---

Archivo original y plantilla base: repositorio de maldonadomatias (vite-tailwind-docker-starter). Este README adapta las instrucciones al contexto de este frontend que consume las APIs definidas en `api-docs`.
