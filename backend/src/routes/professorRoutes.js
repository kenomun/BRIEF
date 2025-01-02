const express = require('express');
const router = express.Router();
const professorController = require('../controller/professorController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Professor:
 *       type: object
 *       required:
 *         - name
 *         - subject
 *       properties:
 *         id:
 *           type: integer
 *           description: El ID del profesor
 *         name:
 *           type: string
 *           description: Nombre del profesor
 *         subject:
 *           type: string
 *           description: Asignatura del profesor
 */

/**
 * @swagger
 * /professors:
 *   post:
 *     summary: Crear un nuevo profesor
 *     tags: [Professors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Professor'
 *     responses:
 *       201:
 *         description: Profesor creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Professor'
 *       400:
 *         description: Campos requeridos faltantes
 *       500:
 *         description: Error interno al crear el profesor
 */
router.post('/professors', professorController.createProfessor);

/**
 * @swagger
 * /professors:
 *   get:
 *     summary: Obtener todos los profesores
 *     tags: [Professors]
 *     responses:
 *       200:
 *         description: Lista de profesores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Professor'
 *       500:
 *         description: Error al obtener los profesores
 */
router.get('/professors', professorController.getAllProfessors);

/**
 * @swagger
 * /professor/{id}:
 *   get:
 *     summary: Obtener un profesor por su ID
 *     tags: [Professors]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del profesor
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Profesor encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Professor'
 *       404:
 *         description: Profesor no encontrado
 *       500:
 *         description: Error al obtener el profesor
 */
router.get('/professor/:id', professorController.getProfessorById);

/**
 * @swagger
 * /professor/{id}:
 *   put:
 *     summary: Actualizar un profesor
 *     tags: [Professors]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del profesor
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Professor'
 *     responses:
 *       200:
 *         description: Profesor actualizado exitosamente
 *       400:
 *         description: Campos requeridos faltantes
 *       500:
 *         description: Error al actualizar el profesor
 */
router.put('/professor/:id', professorController.updateProfessor);

/**
 * @swagger
 * /professor/{id}:
 *   delete:
 *     summary: Eliminar un profesor
 *     tags: [Professors]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del profesor
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Profesor eliminado exitosamente
 *       404:
 *         description: Profesor no encontrado
 *       500:
 *         description: Error al eliminar el profesor
 */
router.delete('/professor/:id', professorController.deleteProfessor);

module.exports = router;

