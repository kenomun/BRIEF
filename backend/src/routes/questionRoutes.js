const express = require('express');
const router = express.Router();
const questionController = require('../controller/questionController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Question:
 *       type: object
 *       required:
 *         - questionText
 *         - options
 *       properties:
 *         id:
 *           type: integer
 *           description: El ID de la pregunta
 *         questionText:
 *           type: string
 *           description: El texto de la pregunta
 *         options:
 *           type: array
 *           description: Las opciones de respuesta para la pregunta
 *           items:
 *             type: string
 *         correctAnswer:
 *           type: string
 *           description: La respuesta correcta
 */

/**
 * @swagger
 * /questions:
 *   post:
 *     summary: Crear una nueva pregunta
 *     tags: [Questions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Question'
 *     responses:
 *       201:
 *         description: Pregunta creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Question'
 *       400:
 *         description: Campos requeridos faltantes
 *       500:
 *         description: Error interno al crear la pregunta
 */
router.post('/questions', questionController.createQuestion);

/**
 * @swagger
 * /questions:
 *   get:
 *     summary: Obtener todas las preguntas
 *     tags: [Questions]
 *     responses:
 *       200:
 *         description: Lista de preguntas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Question'
 *       500:
 *         description: Error al obtener las preguntas
 */
router.get('/questions', questionController.getAllQuestions);

/**
 * @swagger
 * /question/{id}:
 *   get:
 *     summary: Obtener una pregunta por su ID
 *     tags: [Questions]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID de la pregunta
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pregunta encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Question'
 *       404:
 *         description: Pregunta no encontrada
 *       500:
 *         description: Error al obtener la pregunta
 */
router.get('/question/:id', questionController.getQuestionById);

/**
 * @swagger
 * /question/{id}:
 *   put:
 *     summary: Actualizar una pregunta
 *     tags: [Questions]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID de la pregunta
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Question'
 *     responses:
 *       200:
 *         description: Pregunta actualizada exitosamente
 *       400:
 *         description: Campos requeridos faltantes
 *       500:
 *         description: Error al actualizar la pregunta
 */
router.put('/question/:id', questionController.updateQuestion);

/**
 * @swagger
 * /question/{id}:
 *   delete:
 *     summary: Eliminar una pregunta
 *     tags: [Questions]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID de la pregunta
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pregunta eliminada exitosamente
 *       404:
 *         description: Pregunta no encontrada
 *       500:
 *         description: Error al eliminar la pregunta
 */
router.delete('/question/:id', questionController.deleteQuestion);

module.exports = router;
