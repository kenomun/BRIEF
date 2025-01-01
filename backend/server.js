require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const adminRoutes = require('./src/routes/adminRoutes');
const professorRoutes = require('./src/routes/professorRoutes');
const studentRoutes = require('./src/routes/studentroutes');
const questionRoutes = require('./src/routes/questionRoutes');
const resultRoutes = require('./src/routes/resultRoutes');

// Inicializa la app
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Bienvenido a la API de ExamPass');
});

// Configuración de Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de ExamPass',
      version: '1.0.0',
      description: 'Documentación de la API para el sistema ExamPass',
    },
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Rutas de Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas
app.use('/api', adminRoutes);
app.use('/api', professorRoutes);
app.use('/api', studentRoutes); 
app.use('/api', questionRoutes);
app.use('/api', resultRoutes);

// Levantar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
