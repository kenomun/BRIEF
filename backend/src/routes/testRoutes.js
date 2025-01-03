const express = require('express');
const router = express.Router();
const testController = require('../controller/testController');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Definir las rutas de la API para el Test
/**
 * @swagger
 * tags:
 *   name: Tests
 *   description: Gestión de tests con preguntas y respuestas
 */

/**
 * @swagger
 * /tests:
 *   post:
 *     summary: Crear un nuevo test con preguntas y respuestas
 *     tags: [Tests]
 *     requestBody:
 *       description: Información del nuevo test, incluyendo nombre, asignatura y preguntas.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               testName:
 *                 type: string
 *                 description: Nombre del test.
 *               subjectId:
 *                 type: integer
 *                 description: ID de la asignatura.
 *               questions:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     question:
 *                       type: string
 *                       description: Pregunta.
 *                     content:
 *                       type: object
 *                       properties:
 *                         description:
 *                           type: string
 *                           description: Descripción de la pregunta.
 *                     answers:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           answer:
 *                             type: string
 *                             description: Respuesta a la pregunta.
 *                           isCorrect:
 *                             type: boolean
 *                             description: Indica si la respuesta es correcta.
 *     responses:
 *       201:
 *         description: Test creado exitosamente.
 *       400:
 *         description: Datos faltantes o incorrectos.
 *       500:
 *         description: Error en el servidor.
 */
router.post('/tests', testController.createTest);

/**
 * @swagger
 * /tests:
 *   get:
 *     summary: Obtener todos los tests
 *     tags: [Tests]
 *     responses:
 *       200:
 *         description: Lista de todos los tests.
 *       404:
 *         description: No se encontraron tests.
 *       500:
 *         description: Error al obtener los tests.
 */
router.get('/tests', testController.getAllTests);

/**
 * @swagger
 * /test/{id}:
 *   get:
 *     summary: Obtener un test por ID
 *     tags: [Tests]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del test a obtener.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Test encontrado con éxito.
 *       404:
 *         description: Test no encontrado.
 *       500:
 *         description: Error al obtener el test.
 */
router.get('/test/:id', testController.getTestById);

/**
 * @swagger
 * /test/subject/{id}:
 *   get:
 *     summary: Obtener los tests por asignatura
 *     tags: [Tests]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la asignatura para filtrar los tests.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tests encontrados para la asignatura.
 *       404:
 *         description: No se encontraron tests para la asignatura.
 *       500:
 *         description: Error al obtener los tests.
 */
router.get('/test/subject/:id', testController.getTestsBySubjectId);

/**
 * @swagger
 * /test/{id}:
 *   put:
 *     summary: Actualizar un test por ID
 *     tags: [Tests]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del test a actualizar.
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Información actualizada del test, incluyendo nombre, asignatura y preguntas.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               testName:
 *                 type: string
 *                 description: Nombre del test.
 *               subjectId:
 *                 type: integer
 *                 description: ID de la asignatura.
 *               questions:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     question:
 *                       type: string
 *                       description: Pregunta.
 *                     contentDescription:
 *                       type: string
 *                       description: Descripción de la pregunta.
 *                     Answers:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           answer:
 *                             type: string
 *                             description: Respuesta a la pregunta.
 *                           isCorrect:
 *                             type: boolean
 *                             description: Indica si la respuesta es correcta.
 *     responses:
 *       200:
 *         description: Test actualizado exitosamente.
 *       404:
 *         description: Test no encontrado.
 *       500:
 *         description: Error al actualizar el test.
 */
router.put('/test/:id', testController.updateTest);

/**
 * @swagger
 * /test/{id}:
 *   delete:
 *     summary: Eliminar un test por ID
 *     tags: [Tests]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del test a eliminar.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Test eliminado exitosamente.
 *       404:
 *         description: Test no encontrado.
 *       500:
 *         description: Error al eliminar el test.
 */
router.delete('/test/:id', testController.deleteTest);

module.exports = router;
