// Middleware para verificar si el usuario está autenticado
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.status(401).json({ error: 'No autorizado. Inicia sesión.' });
  }
};

// Middleware para verificar si el usuario es un admin
const isAdmin = (req, res, next) => {
  if (req.user && req.user.email) {
    return next();
  } else {
    return res.status(403).json({ error: 'Acceso denegado. Se requiere ser admin.' });
  }
};

// Middleware para verificar si el usuario es un estudiante
const isStudent = (req, res, next) => {
  if (req.user && req.user.email) {
    return next();
  } else {
    return res.status(403).json({ error: 'Acceso denegado. Se requiere ser estudiante.' });
  }
};

module.exports = { isAuthenticated, isAdmin, isStudent };
