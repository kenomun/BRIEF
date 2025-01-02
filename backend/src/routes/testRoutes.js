const express = require('express');
const router = express.Router();
const testController = require('../controller/testController');


// Rutas de Profesor
router.post('/tests', testController.createTest);
router.get('/tests', testController.getAllTests);
router.get('/test/:id', testController.getTestById);
router.get('/test/subject/:id', testController.getTestsBySubjectId)
router.put('/test/:id', testController.updateTest);
router.delete('/test/:id', testController.deleteTest);

module.exports = router;