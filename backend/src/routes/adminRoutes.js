const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController');

/**
 * @swagger
 * /api/admins:
 *   post:
 *     summary: Crear un nuevo administrador
 *     description: Crea un nuevo administrador en el sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@example.com
 *               password:
 *                 type: string
 *                 example: securepassword123
 *               name:
 *                 type: string
 *                 example: Juan Perez
 *     responses:
 *       201:
 *         description: Administrador creado exitosamente
 *       400:
 *         description: Campos inválidos
 *       500:
 *         description: Error en el servidor
 */
router.post('/admins', adminController.createAdmin);

/**
 * @swagger
 * /api/admins:
 *   get:
 *     summary: Obtener todos los administradores
 *     description: Obtiene una lista de todos los administradores registrados en el sistema.
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
 *                   email:
 *                     type: string
 *                   name:
 *                     type: string
 *       500:
 *         description: Error en el servidor
 */
router.get('/admins', adminController.getAllAdmins);

/**
 * @swagger
 * /api/admin/{id}:
 *   get:
 *     summary: Obtener un administrador por ID
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
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 email:
 *                   type: string
 *                 name:
 *                   type: string
 *       404:
 *         description: Administrador no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.get('/admin/:id', adminController.getAdminById);

/**
 * @swagger
 * /api/admin/{id}:
 *   put:
 *     summary: Actualizar administrador por ID
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
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: updated@example.com
 *               name:
 *                 type: string
 *                 example: Juan Carlos Perez
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
 * /api/admin/{id}:
 *   delete:
 *     summary: Eliminar un administrador por ID
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

