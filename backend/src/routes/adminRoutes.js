const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController');

// Rutas CRUD para Admin
router.post('/admins', adminController.createAdmin);
router.get('/admins', adminController.getAllAdmins);
router.get('/admin/:id', adminController.getAdminById);
router.put('/admin/:id', adminController.updateAdmin);
router.delete('/admin/:id', adminController.deleteAdmin);

module.exports = router;
