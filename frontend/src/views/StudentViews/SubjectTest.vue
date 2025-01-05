<template>
  <div class="container mx-auto p-6">
    <h1 class="text-3xl font-bold text-gray-800 text-center mb-6">Lista de examenes</h1>

    <div v-if="rows.length === 0" class="text-center text-gray-600">
      No hay exámenes creados para esta asignatura.
    </div>
    
    <Table v-else class="mt-6" :headers="headers" :rows="rows" :actions="true" :options="option"
    @actionSelect="handleAction" />

    <button type="button" @click="goBack"
      class=" mt-10 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Volver</button>


    <Toast v-if="toastVisible" :message="toastMessage" :type="toastType" :duration="3000"
      @closed="toastVisible = false" />

  </div>
</template>

<script>
import Table from '../../components/Table.vue'
import Toast from '../../components/ToastComponent.vue'
import { API_BASE_URL } from "../../config/config";
import axios from 'axios';


export default {
  name: 'SubjectTest',
  components: {
    Table,
    Toast
  },

  data() {
    return {
      headers: [
        { key: 'name', label: 'Nombre del Examen' },
      ],
      rows: [], 
      option: [
        { action: 'exam', label: 'Dar Examen', class: 'text-white bg-blue-600 hover:bg-blue-700' },
      ],
      toastVisible: false,
      toastMessage: '',
      toastType: 'success',
    };
  },

  computed: {
    subjectId() {
      return this.$route.params.subjectId;
    }
  },

  mounted() {
    this.fetchTests();
  },

  methods: {
    // Función para obtener los tests desde la API
    async fetchTests() {
      try {
        const response = await axios.get(`${API_BASE_URL}/test/subject/${this.subjectId}`);
        
        if (response.status == 200) {
          if (response.data.length > 0) {
          this.rows = response.data.map(test => ({
            id: test.id,
            name: test.name
            }));
          } else {
            this.rows = []; 
          }
        }

      } catch (error) {
        this.toastMessage = "No hay examenes creados.";
        this.toastType = 'success';
        this.toastVisible = true;

      }
    },

    // Función para manejar la acción de dar examen
    handleAction(action, row) {
      if (action === 'exam') {
        this.toastMessage = `Comenzando examen: ${row.name}`;
        this.toastType = 'success';
        this.toastVisible = true;
        // Aquí puedes redirigir al examen o manejar el flujo del examen
        console.log("Iniciar examen para el test ID:", row.id);
      }
    },

    // Función para regresar a la vista anterior
    goBack() {
      this.$router.go(-1); // Esto regresa a la página anterior
    }
  }
};



</script>


<style scoped>
.subject-test {
  text-align: center;
  font-size: 2rem;
  margin-top: 20px;
}
</style>
