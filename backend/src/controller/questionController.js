const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Crear una nueva pregunta
const createQuestion = async (req, res) => {
  try {
    const { questionText, option1, option2, option3, option4, correctOption, educationalIndicator } = req.body;
    
    // Validar datos
    if (!questionText || !option1 || !option2 || !option3 || !option4 || !correctOption || !educationalIndicator ) {
        return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    const newQuestion = await prisma.question.create({
      data: {
        questionText,
        option1,
        option2,
        option3,
        option4,
        correctOption,
        educationalIndicator,
      },
    });
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear pregunta' });
  }
};

// Obtener todas las preguntas
const getAllQuestions = async (req, res) => {
  try {
    const questions = await prisma.question.findMany();
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener preguntas' });
  }
};

// Obtener una pregunta por su ID
const getQuestionById = async (req, res) => {
  try {
    const { id } = req.params;
    const question = await prisma.question.findUnique({
      where: { id: parseInt(id) },
    });
    if (question) {
      res.status(200).json(question);
    } else {
      res.status(404).json({ error: 'Pregunta no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener pregunta' });
  }
};

// Actualizar una pregunta
const updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const { questionText, option1, option2, option3, option4, correctOption, educationalIndicator } = req.body;
    const updatedQuestion = await prisma.question.update({
      where: { id: parseInt(id) },
      data: {
        questionText,
        option1,
        option2,
        option3,
        option4,
        correctOption,
        educationalIndicator,
      },
    });
    res.status(200).json(updatedQuestion);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar pregunta' });
  }
};

// Eliminar una pregunta
const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.question.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ message: 'Pregunta eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar pregunta' });
  }
};

module.exports = {
  createQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
};
