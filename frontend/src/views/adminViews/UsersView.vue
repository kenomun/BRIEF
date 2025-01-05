<!-- src/views/User.vue -->
<template>
  <div class="container mx-auto p-6">
    <h1 class="text-3xl font-bold text-center text-gray-800 mb-8">
      Gestión de Usuarios
    </h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Tarjeta para Administradores -->
      <Card
        title="Administradores"
        description="Gestiona a los  administrador."
        link="/admins"
      />
      <!-- Tarjeta para Profesores -->
      <Card
        title="Profesores"
        description="Gestiona a los profesores."
        link="/professors"
      />
      <!-- Tarjeta para Alumnos -->
      <Card
        title="Alumnos"
        description="Gestiona a los estudiantes."
        link="/students"
      />
    </div>
  </div>
</template>

<script>
import Card from "../../components/Card.vue";

export default {
  name: "User",
  components: {
    Card,
  },
};
</script>

<style scoped>
/* Aquí puedes agregar estilos específicos para la vista User si es necesario */
</style>
