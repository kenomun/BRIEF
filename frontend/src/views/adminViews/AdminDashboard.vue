<template>
  <div
    class="min-h-screen flex flex-col justify-center items-center bg-gray-100 py-10"
  >
    <!-- Mensaje de Bienvenida -->
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold text-green-600">
        ¡Bienvenido(a) al Dashboard del Administrador!
      </h1>
      <p class="text-lg text-gray-600 mt-4">
        Tu espacio para ver tus administrar, Alumnos, Profesores y Examenes.
      </p>
    </div>

    <!-- Contenido del Dashboard -->
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 w-full max-w-6xl"
    >
      <!-- Exámenes Pendientes -->
      <div class="bg-white p-6 rounded-lg shadow-lg text-center">
        <h3 class="text-2xl font-semibold text-gray-800">Administradores</h3>
        <p class="text-gray-500 mt-4">
          Pdra gestionar los usuarios como administradores, Parofesores o
          Alumnos
        </p>
      </div>

      <!-- Exámenes Completados -->
      <div class="bg-white p-6 rounded-lg shadow-lg text-center">
        <h3 class="text-2xl font-semibold text-gray-800">Exámenes</h3>
        <p class="text-gray-500 mt-4">
          podras gestionar los examenes para los alumnos.
        </p>
      </div>

      <!-- Progreso Académico -->
      <div class="bg-white p-6 rounded-lg shadow-lg text-center">
        <h3 class="text-2xl font-semibold text-gray-800">Reposrtes</h3>
        <p class="text-gray-500 mt-4">
          Podras obtener reportes de resultados de examenes.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {},
};
</script>

<style scoped>
/* Personalización adicional si es necesario */
</style>
