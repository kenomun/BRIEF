require('dotenv').config();
const express = require('express');
const cors = require('cors');
const adminRoutes = require('./src/routes/adminRoutes');
const professorRoutes = require('./src/routes/professorRoutes');
const studentRoutes = require('./src/routes/studentroutes')

// Inicializa la app
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Bienvenido a la API de ExamPass');
});

// Rutas
app.use('/api/admins', adminRoutes);

// Levantar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
