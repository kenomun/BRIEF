const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

passport.use('admin-google', new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
  },
  async (accessToken, refreshToken, profile, done) => {

    // Verificar si el usuario es un admin en la base de datos
    const admin = await prisma.admin.findUnique({
      where: { email: profile.emails[0].value },
    });

    if (!admin) {
      const newAdmin = await prisma.admin.create({
        data: {
          name: profile.displayName,
          email: profile.emails[0].value,
          password: '', // Si es solo OAuth, no es necesario un password
        },
      });
      return done(null, newAdmin);
    }

    return done(null, admin);
  }
));

passport.use('student-google', new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
  },
  async (accessToken, refreshToken, profile, done) => {
    // Verificar si el usuario es un estudiante en la base de datos
    const student = await prisma.student.findUnique({
      where: { email: profile.emails[0].value },
    });

    if (!student) {
      const newStudent = await prisma.student.create({
        data: {
          name: profile.displayName,
          email: profile.emails[0].value,
          password: '', // Si es solo OAuth, no es necesario un password
        },
      });
      return done(null, newStudent);
    }

    return done(null, student);
  }
));

// Serializar el usuario
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserializar el usuario
passport.deserializeUser(async (id, done) => {
  // Aquí podemos elegir entre admin o student dependiendo de la lógica de la aplicación
  const admin = await prisma.admin.findUnique({ where: { id } });
  if (admin) return done(null, admin);

  const student = await prisma.student.findUnique({ where: { id } });
  if (student) return done(null, student);

  return done(null, null); // Si no encuentra el usuario
});
