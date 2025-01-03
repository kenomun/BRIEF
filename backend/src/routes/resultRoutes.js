const express = require('express');
const router = express.Router();
const resultController = require('../controller/resultController');

// Rutas de Result
router.post('/results', resultController.createResult); // Guardar resultado al finalizar examen
router.get('/results/test/:testId/student/:profileId', resultController.getResultsDetail); // Listar todos los resultados
// router.get('/results/student/:studentId', resultController.getResultsByStudent); // Resultados de un estudiante específico

module.exports = router;