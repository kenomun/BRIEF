const express = require('express');
const router = express.Router();
const professorController = require('../controller/professorController');


// Rutas de Profesor
router.post('/', professorController.createProfessor);
router.get('/', professorController.getAllProfessors);
router.get('/:id', professorController.getProfessorById);
router.put('/:id', professorController.updateProfessor);
router.delete('/:id', professorController.deleteProfessor);

module.exports = router;
