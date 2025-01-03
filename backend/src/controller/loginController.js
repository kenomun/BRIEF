const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Obtener un usuario por su email (login)
const getLoginByEmail = async (req, res) => {
    try {
      const { email } = req.params; 
      
      // Buscar al usuario en la base de datos por su email
      const user = await prisma.Profiles.findUnique({
        where: { email: email },
        select: {
          id: true,
          name: true,
          email: true,
          roleId: true,
        },
      });
  
      // Si el usuario no existe
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      // Si el usuario existe, devolver solo los campos requeridos
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Error al realizar login', details: error.message });
    }
  };
  
  

  module.exports = {
    getLoginByEmail

  }