/**
 * @swagger
 * tags:
 *   - name: Results
 *     description: Operaciones relacionadas con los resultados de los tests
 */

const express = require('express');
const router = express.Router();
const resultController = require('../controller/resultController');

/**
 * @swagger
 * /results:
 *   post:
 *     summary: Crear un nuevo resultado
 *     tags: [Results]
 *     requestBody:
 *       description: Datos para crear un nuevo resultado
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - profileId
 *               - testId
 *               - answers
 *             properties:
 *               profileId:
 *                 type: integer
 *                 description: ID del perfil del estudiante
 *               testId:
 *                 type: integer
 *                 description: ID del test realizado
 *               answers:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     answerId:
 *                       type: integer
 *                       description: ID de la respuesta seleccionada
 *     responses:
 *       201:
 *         description: Resultado creado exitosamente
 *       400:
 *         description: Faltan datos necesarios o formato incorrecto
 *       500:
 *         description: Error interno del servidor
 */
router.post('/results', resultController.createResult);

/**
 * @swagger
 * /results/test/{testId}/student/{profileId}:
 *   get:
 *     summary: Obtener los resultados de un test específico para un perfil de estudiante
 *     tags: [Results]
 *     parameters:
 *       - name: testId
 *         in: path
 *         required: true
 *         description: ID del test
 *         schema:
 *           type: integer
 *       - name: profileId
 *         in: path
 *         required: true
 *         description: ID del perfil del estudiante
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalles del resultado del test
 *       404:
 *         description: Resultado no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/results/test/:testId/student/:profileId', resultController.getResultsDetail);

module.exports = router;
