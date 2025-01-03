const express = require('express');
const router = express.Router();
const studentController = require('../controller/studentController');

/**
 * @swagger
 * /students:
 *   post:
 *     summary: Crear un nuevo estudiante
 *     tags: [student]
 *     description: Crea un estudiante con sus asignaturas asociadas.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               schoolName:
 *                 type: string
 *               email:
 *                 type: string
 *               subjectIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *             required:
 *               - name
 *               - schoolName
 *               - email
 *               - subjectIds
 *     responses:
 *       201:
 *         description: Estudiante creado con éxito
 *       400:
 *         description: Datos incompletos o inválidos
 *       500:
 *         description: Error al crear el estudiante
 */
router.post('/students', studentController.createStudent);

/**
 * @swagger
 * /students:
 *   get:
 *     summary: Obtener todos los estudiantes
 *     tags: [student]
 *     description: Obtiene una lista con todos los estudiantes registrados.
 *     responses:
 *       200:
 *         description: Lista de estudiantes obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   schoolName:
 *                     type: string
 *                   email:
 *                     type: string
 *       500:
 *         description: Error al obtener los estudiantes
 */
router.get('/students', studentController.getAllStudents);

/**
 * @swagger
 * /student/{id}:
 *   get:
 *     summary: Obtener un estudiante por ID
 *     tags: [student]
 *     description: Obtiene los detalles de un estudiante específico usando su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del estudiante a buscar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Estudiante encontrado correctamente
 *       404:
 *         description: Estudiante no encontrado
 *       500:
 *         description: Error al obtener el estudiante
 */
router.get('/student/:id', studentController.getStudentById);

/**
 * @swagger
 * /student/{id}:
 *   put:
 *     summary: Actualizar un estudiante
 *     tags: [student]
 *     description: Actualiza la información de un estudiante existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del estudiante a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               schoolName:
 *                 type: string
 *               email:
 *                 type: string
 *               subjectIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *     responses:
 *       200:
 *         description: Estudiante actualizado con éxito
 *       400:
 *         description: Datos incompletos o inválidos
 *       404:
 *         description: Estudiante no encontrado
 *       500:
 *         description: Error al actualizar el estudiante
 */
router.put('/student/:id', studentController.updateStudent);

/**
 * @swagger
 * /student/{id}:
 *   delete:
 *     summary: Eliminar un estudiante
 *     tags: [student]
 *     description: Elimina un estudiante específico por ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del estudiante a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Estudiante eliminado con éxito
 *       404:
 *         description: Estudiante no encontrado
 *       500:
 *         description: Error al eliminar el estudiante
 */
router.delete('/student/:id', studentController.deleteStudent);

module.exports = router;

