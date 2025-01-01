require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const adminRoutes = require('./src/routes/adminRoutes');
const professorRoutes = require('./src/routes/professorRoutes');
const studentRoutes = require('./src/routes/studentroutes');
const questionRoutes = require('./src/routes/questionRoutes');
const resultRoutes = require('./src/routes/resultRoutes');
const authRoutes = require('./src/routes/authRoutes');  // Asegúrate de tener este import


// Inicializa la app
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Inicializa la sesión de usuario
app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));

// Inicializa Passport.js
app.use(passport.initialize());
app.use(passport.session());

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Bienvenido a la API de ExamPass');
});

// Rutas de la API
app.use('/api', adminRoutes);
app.use('/api', professorRoutes);
app.use('/api', studentRoutes); 
app.use('/api', questionRoutes);
app.use('/api', resultRoutes);
app.use('/auth', authRoutes);  // Ruta para las rutas de autenticación de Google


// Levantar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
