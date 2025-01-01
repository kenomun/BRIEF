const express = require('express');
const router = express.Router();
const questionController = require('../controller/questionController');


// Rutas de Profesor
router.post('/questions', questionController.createQuestion);
router.get('/questions', questionController.getAllQuestions);
router.get('/question/:id', questionController.getQuestionById);
router.put('/question/:id', questionController.updateQuestion);
router.delete('/question/:id', questionController.deleteQuestion);

module.exports = router;