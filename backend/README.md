# ExamPass

## Descripción

Aplicación de backend para la gestión de exámenes, estudiantes, profesores, preguntas y resultados. Diseñada para administrar y evaluar el conocimiento mediante reportes y calificaciones. Este proyecto utiliza Node.js, Express, Prisma, y PostgreSQL como base de datos.

## Características Principales

### Admin:
- Autenticación mediante OAuth (Google).
- CRUD de profesores.
- CRUD de preguntas para exámenes.
- Visualización y generación de reportes de resultados.

### Estudiantes:
- Autenticación mediante OAuth (Google).
- Onboarding de datos personales.
- Resolución de exámenes con evaluación automática.
- Reporte detallado de desempeño.

### Preguntas y Resultados:
- Creación de preguntas con alternativas y contenido educativo asociado.
- Cálculo y almacenamiento de resultados al completar un examen.

## Tecnologías Utilizadas
- Node.js
- Express
- Prisma ORM
- PostgreSQL
- Passport.js para la autenticación OAuth.
- Swagger para documentación de API.


## Configuración Inicial

### Clonar el Repositorio
```bash
git clone https://github.com/tu-repositorio/alondra-nuts-backend.git
```
cd 

### Instalar Dependencias

npm install

### Configurar Variables de Entorno
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/nombre_base_datos
GOOGLE_CLIENT_ID=tu_google_client_id
GOOGLE_CLIENT_SECRET=tu_google_client_secret
JWT_SECRET=tu_secreto_para_jwt

### Crear la Base de Datos
Si la base de datos aún no existe, crea una manualmente. Para PostgreSQL, puedes hacerlo con el siguiente comando:
  ```bash
  psql -U usuario -c "CREATE DATABASE nombre_base_datos;"
  ```
### Realizar Migraciones
``` bash
  npx prisma migrate dev
```

### Iniciar el Servidor
Para desarrollo:
  ```bash
  npm run dev

  ```
Para producción:  
  ```bash
  npm start
  ```

### Para revisar la documentacion de la Api generada con Swagger

```bash
  http://localhost:5000/api-docs/
  ```