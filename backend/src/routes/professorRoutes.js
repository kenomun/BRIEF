const express = require('express');
const router = express.Router();
const professorController = require('../controller/professorController');

/**
 * @swagger
 * tags:
 *   name: Professor
 *   description: Rutas para gestionar profesores
 */

/**
 * @swagger
 * /api/professors:
 *   post:
 *     summary: Crear un nuevo profesor
 *     tags: [Professor]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               roleId:
 *                 type: integer
 *               subjectIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *             required:
 *               - name
 *               - email
 *               - roleId
 *               - subjectIds
 *     responses:
 *       201:
 *         description: Profesor creado exitosamente
 *       400:
 *         description: Error de validación, faltan campos requeridos
 *       404:
 *         description: Rol o asignaturas no encontradas
 */
router.post('/professors', professorController.createProfessor);

/**
 * @swagger
 * /api/professors:
 *   get:
 *     summary: Obtener todos los profesores
 *     tags: [Professor]
 *     responses:
 *       200:
 *         description: Lista de profesores
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
 *                   email:
 *                     type: string
 *                   roleId:
 *                     type: integer
 */
router.get('/professors', professorController.getAllProfessors);

/**
 * @swagger
 * /api/professor/{id}:
 *   get:
 *     summary: Obtener un profesor por ID
 *     tags: [Professor]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del profesor a obtener
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Profesor encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 roleId:
 *                   type: integer
 *                 subjectIds:
 *                   type: array
 *                   items:
 *                     type: integer
 *       404:
 *         description: Profesor no encontrado
 */
router.get('/professor/:id', professorController.getProfessorById);

/**
 * @swagger
 * /api/professor/{id}:
 *   put:
 *     summary: Actualizar un profesor
 *     tags: [Professor]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del profesor a actualizar
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
 *               email:
 *                 type: string
 *               subjectIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *             required:
 *               - name
 *               - email
 *               - subjectIds
 *     responses:
 *       200:
 *         description: Profesor actualizado exitosamente
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Profesor no encontrado
 */
router.put('/professor/:id', professorController.updateProfessor);

/**
 * @swagger
 * /api/professor/{id}:
 *   delete:
 *     summary: Eliminar un profesor
 *     tags: [Professor]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del profesor a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Profesor eliminado exitosamente
 *       404:
 *         description: Profesor no encontrado
 */
router.delete('/professor/:id', professorController.deleteProfessor);

module.exports = router;
