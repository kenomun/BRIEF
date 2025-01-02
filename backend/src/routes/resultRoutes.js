const express = require('express');
const router = express.Router();
const resultController = require('../controller/resultController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Result:
 *       type: object
 *       required:
 *         - studentId
 *         - score
 *         - date
 *       properties:
 *         id:
 *           type: integer
 *           description: El ID del resultado
 *         studentId:
 *           type: integer
 *           description: ID del estudiante que obtuvo el resultado
 *         score:
 *           type: integer
 *           description: La puntuación obtenida por el estudiante
 *         date:
 *           type: string
 *           format: date
 *           description: La fecha en que se obtuvo el resultado
 */

/**
 * @swagger
 * /results:
 *   post:
 *     summary: Guardar el resultado al finalizar un examen
 *     tags: [Results]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Result'
 *     responses:
 *       201:
 *         description: Resultado guardado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Result'
 *       400:
 *         description: Campos requeridos faltantes
 *       500:
 *         description: Error interno al guardar el resultado
 */
router.post('/results', resultController.saveResult);

/**
 * @swagger
 * /results:
 *   get:
 *     summary: Obtener todos los resultados
 *     tags: [Results]
 *     responses:
 *       200:
 *         description: Lista de resultados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Result'
 *       500:
 *         description: Error al obtener los resultados
 */
router.get('/results', resultController.getAllResults);

/**
 * @swagger
 * /results/student/{studentId}:
 *   get:
 *     summary: Obtener los resultados de un estudiante específico
 *     tags: [Results]
 *     parameters:
 *       - name: studentId
 *         in: path
 *         description: ID del estudiante
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Resultados del estudiante
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Result'
 *       404:
 *         description: Estudiante no encontrado
 *       500:
 *         description: Error al obtener los resultados del estudiante
 */
router.get('/results/student/:studentId', resultController.getResultsByStudent);

module.exports = router;
