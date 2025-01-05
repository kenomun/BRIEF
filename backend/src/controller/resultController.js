const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { sendOk, badRequest } = require("../helpers/http");

// Crear un resultado
const createResult = async (req, res) => {
  try {
    const { profileId, testId, answers, score } = req.body;

    // Validaciones simples
    if (
      !profileId ||
      !testId ||
      !answers ||
      !Array.isArray(answers) ||
      answers.length === 0 ||
      !score
    ) {
      return res.status(400).json({ error: "Faltan datos necesarios." });
    }

    // Crear el resultado
    const result = await prisma.result.create({
      data: {
        profileId,
        testId,
        answers: answers,
        score,
      },
    });

    // return res.status(201).json(result);
    return sendOk(res, "resultado guardados", result);
  } catch (error) {
    console.error("Error al crear el resultado:", error);
    return res.status(500).json({ error: "Error al crear el resultado" });
  }
};

// Controlador para obtener los resultados según profileId y testId
async function getResultsDetail(req, res) {
  const { profileId, testId } = req.params;

  try {
    // Obtener el resultado del perfil y test relacionados al profileId y testId
    const result = await prisma.result.findFirst({
      where: {
        profileId: parseInt(profileId),
        testId: parseInt(testId),
      },
      select: {
        id: true,
        profile: {
          select: {
            id: true,
            name: true,
          },
        },
        test: {
          select: {
            id: true,
            name: true,
          },
        },
        score: true, // Incluir la columna score en la respuesta
      },
    });

    if (!result) {
      return res.status(404).json({ message: "No se encontraron resultados." });
    }

    // Devolver los resultados con la columna score incluida
    return res.json(result);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error al obtener los resultados." });
  }
}

module.exports = {
  createResult,
  getResultsDetail,
};
