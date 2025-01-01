const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient();

// Crear un nuevo estudiante
const createStudent = async (req, res) => {
    try {
      const { name, school, email, password, professorId } = req.body;
      
          // Validar datos
      if (!name || !school || !email || !password || !professorId) {
        return res.status(400).json({ message: 'Todos los campos son requeridos' });
      }
      const newStudent = await prisma.student.create({
        data: {
          name,
          school,
          email,
          password,
          professorId, 
        },
      });
      res.status(201).json(newStudent);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear estudiante' });
    }
  };
  
  // Obtener todos los estudiantes
  const getAllStudents = async (req, res) => {
    try {
      const students = await prisma.student.findMany();
      res.status(200).json(students);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener estudiantes' });
    }
  };
  
  // Obtener un estudiante por su ID
  const getStudentById = async (req, res) => {
    try {
      const { id } = req.params;
      const student = await prisma.student.findUnique({
        where: { id: parseInt(id) },
      });
      if (student) {
        res.status(200).json(student);
      } else {
        res.status(404).json({ error: 'Estudiante no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener estudiante' });
    }
  };
  
  // Actualizar un estudiante
  const updateStudent = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, school, email, password, professorId } = req.body;
      const updatedStudent = await prisma.student.update({
        where: { id: parseInt(id) },
        data: {
          name,
          school,
          email,
          password,
          professorId,
        },
      });
      res.status(200).json(updatedStudent);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar estudiante' });
    }
  };
  
  // Eliminar un estudiante
  const deleteStudent = async (req, res) => {
    try {
      const { id } = req.params;
      await prisma.student.delete({
        where: { id: parseInt(id) },
      });
      res.status(200).json({ message: 'Estudiante eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar estudiante' });
    }
  };
  
  module.exports = {
    createStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent,
  };
