<template>
  <div
    class="min-h-screen flex flex-col justify-center items-center bg-gray-100 py-10"
  >
    <!-- Mensaje de Bienvenida -->
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold text-green-600">
        ¡Bienvenido(a) al Dashboard del Estudiante!
      </h1>
      <p class="text-lg text-gray-600 mt-4">
        Tu espacio para ver tus resultados, exámenes y progreso académico.
      </p>
    </div>

    <!-- Contenido del Dashboard -->
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 w-full max-w-6xl"
    >
      <!-- Exámenes Pendientes -->
      <div class="bg-white p-6 rounded-lg shadow-lg text-center">
        <h3 class="text-2xl font-semibold text-gray-800">
          Exámenes Pendientes
        </h3>
        <p class="text-gray-500 mt-4">
          Revisa los exámenes que tienes por realizar.
        </p>
      </div>

      <!-- Exámenes Completados -->
      <div class="bg-white p-6 rounded-lg shadow-lg text-center">
        <h3 class="text-2xl font-semibold text-gray-800">
          Exámenes Completados
        </h3>
        <p class="text-gray-500 mt-4">
          Consulta tus exámenes completados y resultados.
        </p>
      </div>

      <!-- Progreso Académico -->
      <div class="bg-white p-6 rounded-lg shadow-lg text-center">
        <h3 class="text-2xl font-semibold text-gray-800">Progreso Académico</h3>
        <p class="text-gray-500 mt-4">
          Visualiza tu progreso y desempeño en los exámenes.
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
