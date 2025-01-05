<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <!-- Botón Volver -->
    <button @click="goBack" class="btn btn-secondary mb-6">
      ← Volver
    </button>

    <!-- Título Principal -->
    <h1 class="text-3xl font-extrabold text-blue-700 mb-6">Detalles del Test</h1>

    <!-- Contenido del Test -->
    <div v-if="test" class="bg-white shadow-md rounded-lg p-6">
      <!-- Nombre del Test -->
      <p class="text-lg font-semibold mb-2">
        <span class="font-bold text-gray-700">Nombre del Test:</span> {{ test.name }}
      </p>

      <!-- Asignatura -->
      <p class="text-lg font-semibold mb-6">
        <span class="font-bold text-gray-700">Asignatura:</span> {{ test.Subject.name }}
      </p>

      <!-- Preguntas -->
      <h2 class="text-2xl font-bold text-gray-800 mt-4 mb-4">Preguntas:</h2>
      <div
        v-for="question in test.Questions"
        :key="question.id"
        class="border-b border-gray-200 pb-4 mb-4"
      >
        <!-- Pregunta -->
        <p class="text-lg font-semibold text-gray-700">
          <span class="font-bold">Pregunta:</span> {{ question.question }}
        </p>

        <!-- Contenido -->
        <p class="text-sm text-gray-600 mb-2">
          <span class="font-bold">Contenido:</span> {{ question.content.description }}
        </p>

        <!-- Respuestas -->
        <p class="font-bold text-gray-700 mt-2">Respuestas:</p>
        <ul class="list-disc list-inside mt-2">
          <li
            v-for="answer in question.Answers"
            :key="answer.id"
            :class="{ 'font-bold text-green-600': answer.isCorrect }"
            class="text-gray-800"
          >
            {{ answer.answer }}
          </li>
        </ul>
      </div>
    </div>

    <!-- Cargando -->
    <div v-else-if="loading" class="text-center text-gray-500">
      <p>Cargando datos...</p>
    </div>

    <!-- Error -->
    <div v-else class="text-center text-red-500">
      <p>Error al cargar los datos. Intenta de nuevo.</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, nextTick } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router"; 

export default {
  setup() {
    // Definimos las propiedades reactivas con ref
    const test = ref(null);  
    const loading = ref(true);  
    const route = useRoute();  
    const router = useRouter();  

    // Función para obtener los detalles del test
    const loadTestData = async (id) => {
      console.log("Llamando a la API con ID:", id);  // Depuración
      try {
        const response = await axios.get(`http://localhost:5000/api/test/${id}`);
        console.log("Datos del test:", response.data);  
        test.value = response.data;  
      } catch (error) {
        console.error("Error al obtener los detalles del test:", error);
      } finally {
        loading.value = false;  
      }
    };

    // Función de inicialización
    const init = async () => {
      const testId = route.params.id;
      console.log("Cargando test con ID:", testId);  // Depuración

      if (testId) {
        await loadTestData(testId);  // Aseguramos que los datos sean cargados
      } else {
        console.error("ID de test no válido");
      }
    };

    // Llamamos a init cuando el componente se monta
    onMounted(() => {
      nextTick(() => {
        init(); // Aseguramos que el componente esté completamente montado
      });
    });

    // Método para navegar hacia atrás
    const goBack = () => {
      router.go(-1);  
    };

    // Retornamos los valores
    return {
      test,
      loading,
      goBack,
    };
  },
};
</script>

<style scoped>
/* Botones */
.btn {
  @apply px-4 py-2 rounded shadow text-white;
}
.btn-secondary {
  @apply bg-gray-500 hover:bg-gray-600 transition-all duration-200;
}
</style>
