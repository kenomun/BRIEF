const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Admin:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - name
 *       properties:
 *         id:
 *           type: integer
 *           description: El ID del administrador
 *         email:
 *           type: string
 *           description: Correo electrónico del administrador
 *         password:
 *           type: string
 *           description: Contraseña del administrador
 *         name:
 *           type: string
 *           description: Nombre del administrador
 */

/**
 * @swagger
 * /admins:
 *   post:
 *     summary: Crear un nuevo administrador
 *     description: Crea un nuevo administrador en el sistema.
 *     tags: [Admins]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Admin'
 *     responses:
 *       201:
 *         description: Administrador creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Admin'
 *       400:
 *         description: Campos inválidos
 *       500:
 *         description: Error en el servidor
 */
router.post('/admins', adminController.createAdmin);

/**
 * @swagger
 * /admins:
 *   get:
 *     summary: Obtener todos los administradores
 *     tags: [Admins]
 *     description: Obtiene una lista de todos los administradores registrados en el sistema.
 *     responses:
 *       200:
 *         description: Lista de administradores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Admin'
 *       500:
 *         description: Error en el servidor
 */
router.get('/admins', adminController.getAllAdmins);

/**
 * @swagger
 * /admin/{id}:
 *   get:
 *     summary: Obtener un administrador por ID
 *     tags: [Admins]
 *     description: Obtiene los detalles de un administrador específico utilizando su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del administrador a obtener
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Detalles del administrador
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Admin'
 *       404:
 *         description: Administrador no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.get('/admin/:id', adminController.getAdminById);

/**
 * @swagger
 * /admin/{id}:
 *   put:
 *     summary: Actualizar administrador por ID
 *     tags: [Admins]
 *     description: Actualiza la información de un administrador específico por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del administrador a actualizar
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Admin'
 *     responses:
 *       200:
 *         description: Administrador actualizado exitosamente
 *       400:
 *         description: Campos inválidos
 *       404:
 *         description: Administrador no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.put('/admin/:id', adminController.updateAdmin);

/**
 * @swagger
 * /admin/{id}:
 *   delete:
 *     summary: Eliminar un administrador por ID
 *     tags: [Admins]
 *     description: Elimina un administrador específico utilizando su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del administrador a eliminar
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Administrador eliminado exitosamente
 *       404:
 *         description: Administrador no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.delete('/admin/:id', adminController.deleteAdmin);

module.exports = router;


