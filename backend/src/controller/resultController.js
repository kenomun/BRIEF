const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient();

const saveResult = async (req, res) => {
    try {
      const { studentId, totalScore, contentScores } = req.body;
  
      if (!studentId || totalScore === undefined || !contentScores) {
        return res.status(400).json({ message: "Todos los campos son obligatorios." });
      }
  
      const newResult = await prisma.result.create({
        data: {
          studentId,
          totalScore,
          contentScores,
        },
      });
  
      res.status(201).json({ message: "Resultado guardado correctamente", newResult });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al guardar el resultado." });
    }
  };

  
const getResultsByStudent = async (req, res) => {
    try {
      const { studentId } = req.params;
  
      const results = await prisma.result.findMany({
        where: { studentId: parseInt(studentId) },
      });
  
      res.status(200).json(results);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener los resultados del estudiante." });
    }
  };
  

const getAllResults = async (req, res) => {
    try {
        const results = await prisma.result.findMany();
        res.status(200).json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener todos los resultados." });
    }
	};
  

  module.exports = {
    saveResult,
    getAllResults,
    getResultsByStudent
  
  }