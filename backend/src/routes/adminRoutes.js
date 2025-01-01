const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController');

// Rutas CRUD para Admin
router.post('/', adminController.createAdmin);
router.get('/', adminController.getAllAdmins);
router.get('/:id', adminController.getAdminById);
router.put('/:id', adminController.updateAdmin);
router.delete('/:id', adminController.deleteAdmin);

module.exports = router;
