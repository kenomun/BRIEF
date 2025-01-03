const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Crear un resultado
const createResult = async (req, res) => {
  try {
    const { profileId, testId, answers } = req.body;

    // Validaciones simples
    if (!profileId || !testId || !answers || !Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({ error: "Faltan datos necesarios: profileId y answers." });
    }

    // Crear el resultado
    const result = await prisma.result.create({
      data: {
        profileId,
        testId,
        answers: answers
      }
    });

    return res.status(201).json(result);
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
        answers: true,
      },
    });

    if (!result) {
      return res.status(404).json({ message: 'No se encontraron resultados.' });
    }

    // Obtener las preguntas relacionadas al test específico
    const testQuestions = await prisma.questions.findMany({
      where: {
        testId: parseInt(testId),
      },
      select: {
        id: true,
        question: true,
        content: {
          select: {
            id: true,
            description: true,
          },
        },
        Answers: {
          select: {
            id: true, 
            answer: true,
            isCorrect: true,
          },
        },
      },
    });

    // Procesar las respuestas guardadas en formato JSON
    const savedAnswers = result.answers;

    // Mapear las preguntas y las respuestas correspondientes
    let correctAnswersCount = 0;
    const resultsWithAnswers = testQuestions.map((question) => {
   
      const optionsWithSelection = question.Answers.map((answer) => {
 
        const selectedAnswer = savedAnswers.find(
          (saved) => saved.answerId === answer.id
        );
        
        // Verificar si la respuesta seleccionada es correcta
        if (selectedAnswer && answer.isCorrect) {
          correctAnswersCount++;
        }

        // Devolver las opciones con la respuesta seleccionada (si existe)
        return {
          id: answer.id,
          answer: answer.answer,
          isCorrect: answer.isCorrect,
          selected: selectedAnswer ? selectedAnswer.answerId : null,
        };
      });

      // Filtrar solo las respuestas seleccionadas (si las hay)
      const filteredOptions = optionsWithSelection.filter(option => option.selected !== null); 

      return {
        questionId: question.id,
        questionContent: question.question,
        content: {
          id: question.content.id,
          description: question.content.description,
        },
        options: filteredOptions,
      };
    });


    // Calcular el porcentaje de respuestas correctas
    const totalQuestions = testQuestions.length;
    const scoreData = correctAnswersCount * 20;
    const score = scoreData + ' puntos';
    const percentage =  ((scoreData / (totalQuestions * 20)) * 100).toFixed(2) + '%';

    // Retornar la información combinada con el reporte
    return res.json({
      profile: result.profile, 
      test: result.test,
      results: resultsWithAnswers,   
      report: {
        correctAnswersCount, 
        score, 
        percentage,   

      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
}


  module.exports = {
    createResult,
    getResultsDetail
  }