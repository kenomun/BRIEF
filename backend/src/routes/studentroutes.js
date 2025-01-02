const express = require('express');
const router = express.Router();
const studentController = require('../controller/studentController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Student:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - course
 *       properties:
 *         id:
 *           type: integer
 *           description: El ID del estudiante
 *         name:
 *           type: string
 *           description: Nombre del estudiante
 *         email:
 *           type: string
 *           description: Correo electrónico del estudiante
 *         course:
 *           type: string
 *           description: Curso o asignatura en la que está inscrito el estudiante
 */

/**
 * @swagger
 * /students:
 *   post:
 *     summary: Crear un nuevo estudiante
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *     responses:
 *       201:
 *         description: Estudiante creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 *       400:
 *         description: Campos requeridos faltantes
 *       500:
 *         description: Error al crear el estudiante
 */
router.post('/students', studentController.createStudent);

/**
 * @swagger
 * /students:
 *   get:
 *     summary: Obtener todos los estudiantes
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: Lista de estudiantes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Student'
 *       500:
 *         description: Error al obtener los estudiantes
 */
router.get('/students', studentController.getAllStudents);

/**
 * @swagger
 * /student/{id}:
 *   get:
 *     summary: Obtener un estudiante por ID
 *     tags: [Students]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del estudiante
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Estudiante encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
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
 *     tags: [Students]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del estudiante
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *     responses:
 *       200:
 *         description: Estudiante actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 *       400:
 *         description: Campos requeridos faltantes
 *       500:
 *         description: Error al actualizar el estudiante
 */
router.put('/student/:id', studentController.updateStudent);

/**
 * @swagger
 * /student/{id}:
 *   delete:
 *     summary: Eliminar un estudiante
 *     tags: [Students]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del estudiante
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Estudiante eliminado exitosamente
 *       404:
 *         description: Estudiante no encontrado
 *       500:
 *         description: Error al eliminar el estudiante
 */
router.delete('/student/:id', studentController.deleteStudent);

module.exports = router;

