const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Crear un nuevo admin
const createAdmin = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validar datos
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    const newAdmin = await prisma.admin.create({
      data: {
        name,
        email,
        password, // Aquí puedes añadir lógica para hashear contraseñas
        role: role || 'admin', // Valor por defecto
      },
    });

    res.status(201).json(newAdmin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todos los admins
const getAllAdmins = async (req, res) => {
  try {
    const admins = await prisma.admin.findMany();
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un admin por ID
const getAdminById = async (req, res) => {
  try {
    const { id } = req.params;

    const admin = await prisma.admin.findUnique({
      where: { id: parseInt(id) },
    });

    if (!admin) {
      return res.status(404).json({ message: 'Admin no encontrado' });
    }

    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un admin
const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, role } = req.body;

    const updatedAdmin = await prisma.admin.update({
      where: { id: parseInt(id) },
      data: { name, email, password, role },
    });

    res.status(200).json({updatedAdmin, message: 'Admin actualizado'});
  } catch (error) {
    res.status(500).json({ message: 'Admin no encontrado' });
  }
};

// Eliminar un admin
const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.admin.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: 'Admin eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Admin no encontrado' });
  }
};

module.exports = {
  createAdmin,
  getAllAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
};
