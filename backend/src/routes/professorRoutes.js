const express = require('express');
const router = express.Router();
const professorController = require('../controller/professorController');


// Rutas de Profesor
router.post('/professors', professorController.createProfessor);
router.get('/professors', professorController.getAllProfessors);
router.get('/professor/:id', professorController.getProfessorById);
router.put('/professor/:id', professorController.updateProfessor);
router.delete('/professor/:id', professorController.deleteProfessor);

module.exports = router;
