const express = require('express');
const router = express.Router();
const studentController = require('../controller/studentController');


// Rutas de Profesor
router.post('/students', studentController.createStudent);
router.get('/students', studentController.getAllStudents);
router.get('/student/:id', studentController.getStudentById);
router.put('/student/:id', studentController.updateStudent);
router.delete('/student/:id', studentController.deleteStudent);

module.exports = router;
