const express = require('express');
const passport = require('passport');
const router = express.Router();

// Ruta para iniciar el login con Google para admins
router.get('/admin/google', passport.authenticate('admin-google', {
  scope: ['email'],
}));

// Ruta de callback de Google para admins
router.get('/admin/google/callback',
  passport.authenticate('admin-google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/'); // Redirige a la página del admin
  }
);

// Ruta para iniciar el login con Google para estudiantes
router.get('/student/google', passport.authenticate('student-google', {
  scope: ['email'],
}));

// Ruta de callback de Google para estudiantes
router.get('/student/google/callback',
  passport.authenticate('student-google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/'); // Redirige a la página del estudiante
  }
);

module.exports = router;
