const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//Crear un nuevo profesor
const createProfessor = async (req, res) => {
    try {
      const { name, subject } = req.body;

      // Validar datos
      if (!name || !subject) {
        return res.status(400).json({ message: 'Todos los campos son requeridos' });
      }

      const professor = await prisma.professor.create({
        data: {
          name,
          subject,
        },
      });
      res.status(201).json(professor);
    } catch (error) {
      res.status(500).json({ error: "Error al crear el profesor" });
    }
  };


  // Obtener todos los profesores
const getAllProfessors = async (req, res) => {
    try {
      const professors = await prisma.professor.findMany();
      res.status(200).json(professors);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener los profesores" });
    }
  };
  
  // Obtener un profesor por ID
  const getProfessorById = async (req, res) => {
    try {
      const { id } = req.params;
      const professor = await prisma.professor.findUnique({
        where: { id: Number(id) },
      });
      if (!professor) {
        return res.status(404).json({ error: "Profesor no encontrado" });
      }
      res.status(200).json(professor);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener el profesor" });
    }
  };
  
  // Actualizar un profesor
  const updateProfessor = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, subject } = req.body;
      const professor = await prisma.professor.update({
        where: { id: Number(id) },
        data: {
          name,
          subject,
        },
      });
      res.status(200).json(professor);
    } catch (error) {
      res.status(500).json({ error: "Error al actualizar el profesor" });
    }
  };
  
  // Eliminar un profesor
  const deleteProfessor = async (req, res) => {
    try {
      const { id } = req.params;
      await prisma.professor.delete({
        where: { id: Number(id) },
      });
      res.status(200).json({ message: "Profesor eliminado exitosamente" });
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar el profesor" });
    }
  };
  
  module.exports = {
    createProfessor,
    getAllProfessors,
    getProfessorById,
    updateProfessor,
    deleteProfessor,
  };
