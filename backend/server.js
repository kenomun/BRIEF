require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Inicializa la app
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Rutas de prueba
app.get('/', (req, res) => {
  res.send('¡Servidor funcionando!');
});

// Levantar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
