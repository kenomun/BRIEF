const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController');

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Rutas para gestionar administradores
 */

/**
 * @swagger
 * /api/admins:
 *   post:
 *     summary: Crear un nuevo administrador
 *     tags: [Admin]
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
 *             required:
 *               - name
 *               - email
 *               - roleId
 *     responses:
 *       201:
 *         description: Administrador creado exitosamente
 *       400:
 *         description: Error de validación, faltan campos requeridos
 *       404:
 *         description: Rol no encontrado
 */
router.post('/admins', adminController.createAdmin);

/**
 * @swagger
 * /api/admins:
 *   get:
 *     summary: Obtener todos los administradores
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Lista de administradores
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
router.get('/admins', adminController.getAllAdmins);

/**
 * @swagger
 * /api/admin/{id}:
 *   get:
 *     summary: Obtener un administrador por ID
 *     tags: [Admin]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del administrador a obtener
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Administrador encontrado
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
 *       404:
 *         description: Administrador no encontrado
 */
router.get('/admin/:id', adminController.getAdminById);

/**
 * @swagger
 * /api/admin/{id}:
 *   put:
 *     summary: Actualizar un administrador
 *     tags: [Admin]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del administrador a actualizar
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
 *               roleId:
 *                 type: integer
 *             required:
 *               - name
 *               - email
 *               - roleId
 *     responses:
 *       200:
 *         description: Administrador actualizado exitosamente
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Administrador no encontrado
 */
router.put('/admin/:id', adminController.updateAdmin);

/**
 * @swagger
 * /api/admin/{id}:
 *   delete:
 *     summary: Eliminar un administrador
 *     tags: [Admin]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del administrador a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Administrador eliminado exitosamente
 *       404:
 *         description: Administrador no encontrado
 */
router.delete('/admin/:id', adminController.deleteAdmin);

module.exports = router;
