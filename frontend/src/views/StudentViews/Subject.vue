<template>
  <div class="container mx-auto py-4">
    <div v-if="loading" class="text-center">
      <p>Cargando materias...</p>
    </div>
    <div v-else-if="error" class="text-center text-red-500">
      <p>{{ error }}</p>
    </div>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <Card
        v-for="subject in subjects"
        :key="subject.Subject.id"
        :title="subject.Subject.name"
        description="ver examenes"
        :link="`/subjectTest/${subject.Subject.id}`"
      />
    </div>
  </div>
</template>

<script>
import { API_BASE_URL } from "../../config/config";
import Card from "../../components/Card.vue";
import axios from 'axios';

export default {
  name: "StudentSubjects",
  components: {
    Card,
  },
  data() {

    return {
      subjects: [],
      loading: true,
      error: null,

    };
  },


  mounted() {
    const userDataString = localStorage.getItem('user')
    const userData = JSON.parse(userDataString)
    console.log(userData)
    this.getStudentData(userData);
  },

  methods: {
    async getStudentData(userData) {
      try {
        // Obtén el ID del estudiante del localStorage
        
        if (!userData.id) {
          throw new Error("No se encontró al buscar asignatura");
        }

        const response = await axios.get(`${API_BASE_URL}/student/${userData.id}`);

        if (response.status != 200) {
          throw new Error("Error al obtener la información del estudiante.");
        }

        const data = response.data;

        this.subjects = data.Subjects;
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
  },
  
};
</script>
