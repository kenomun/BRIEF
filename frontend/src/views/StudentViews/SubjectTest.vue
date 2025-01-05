<template>
  <div class="container mx-auto p-6">
    <!-- Título Principal -->
    <h1 class="text-3xl font-bold text-gray-800 text-center mb-8">
      Lista de Exámenes
    </h1>

    <!-- Mensaje si no hay exámenes -->
    <div
      v-if="optionpendiente.length === 0 && completedRows.length === 0"
      class="text-center text-gray-600"
    >
      No hay exámenes creados para esta asignatura.
    </div>

    <!-- Exámenes Pendientes -->
    <div v-else>
      <h2 class="text-2xl font-bold text-gray-800 text-center mb-6">
        Exámenes Pendientes
      </h2>
      <Table
        class="mt-6 bg-white shadow-md rounded-lg overflow-hidden"
        :headers="headers"
        :rows="pendingRows"
        :actions="true"
        :options="optionpendiente"
        @actionSelect="handleAction"
      />
    </div>

    <!-- Exámenes Completados -->
    <div v-if="completedRows.length > 0">
      <h2 class="text-2xl font-bold text-gray-800 text-center mb-6">
        Exámenes Completados
      </h2>
      <Table
        class="mt-6 bg-white shadow-md rounded-lg overflow-hidden"
        :headers="headers"
        :rows="completedRows"
        :actions="true"
        :options="optionresuelto"
        @actionSelect="handleAction"
      />
    </div>

    <!-- Botón Volver -->
    <div class="flex justify-center mt-8">
      <button
        type="button"
        @click="goBack"
        class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-6 py-3 mb-4 transition-all duration-300"
      >
        Volver
      </button>
    </div>

    <!-- Toast Component -->
    <Toast
      v-if="toastVisible"
      :message="toastMessage"
      :type="toastType"
      :duration="3000"
      @closed="toastVisible = false"
    />

    <AlertResultModal
      :show="showModal"
      :title="'Resultado del Examen'"
      :message="modalMessage"
      @confirm="handleModalConfirm"
    />
  </div>
</template>

<script>
import Table from "../../components/Table.vue";
import Toast from "../../components/ToastComponent.vue";
import AlertResultModal from "../../components/AlertResultModal.vue";

import { API_BASE_URL } from "../../config/config";
import axios from "axios";

export default {
  name: "SubjectTest",
  components: {
    Table,
    Toast,
    AlertResultModal,
  },

  data() {
    return {
      headers: [{ key: "name", label: "Nombre del Examen" }],
      // rows: [],
      pendingRows: [], // Exámenes pendientes
      completedRows: [],
      optionpendiente: [
        {
          action: "edit",
          label: "Dar Examen",
          class:
            "bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-300",
        },
      ],

      optionresuelto: [
        {
          action: "view",
          label: "Ver resultados",
          class:
            "ml-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition duration-300 mr-2",
        },
      ],
      toastVisible: false,
      toastMessage: "",
      toastType: "success",
      userData: [],
      showModal: false,
      modalMessage: "",
    };
  },

  computed: {
    subjectId() {
      return this.$route.params.subjectId;
    },
  },

  mounted() {
    const userDataString = localStorage.getItem("user");
    this.userData = JSON.parse(userDataString);
    this.fetchTests();
  },

  methods: {
    async fetchTests() {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/test/subject/${this.subjectId}`
        );
        if (response.status == 200) {
          if (response.data.length > 0) {
            const pendingTests = [];
            const completedTests = [];

            // Separar los exámenes pendientes y los realizados
            await Promise.all(
              response.data.map(async (test) => {
                const hasTakenResponse = await axios.get(
                  `${API_BASE_URL}/test/${test.id}/profile/${this.userData.id}`
                );

                // Categorizar el examen como realizado o pendiente
                if (hasTakenResponse.data.hasTaken) {
                  completedTests.push(test);
                } else {
                  pendingTests.push(test);
                }
              })
            );
            console.log("completedTests", completedTests);
            console.log("pendingTests", pendingTests);
            // Asignar los exámenes pendientes y completados
            this.pendingRows = pendingTests;
            this.completedRows = completedTests;
          } else {
            this.pendingRows = [];
            this.completedRows = [];
          }
        }
      } catch (error) {
        this.toastMessage = "No hay exámenes creados.";
        this.toastType = "success";
        this.toastVisible = true;
      }
    },

    async handleAction(action, data) {
      if (data == 1) {
        this.$router.push(`/exam/${action.id}`);
      } else if (data == 2) {
        const score = await this.getScore(action);
        console.log(score);
        // Mostrar el modal con los resultados
        this.showModal = true;
        this.modalMessage = `
          Respuestas correctas: ${score.correctAnswers} de 5
          Puntaje obtenido: ${score.score} puntos
          Porcentaje de respuestas correctas: ${score.percentage}%
        `;
      }
    },

    async getScore(action) {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/results/test/${action.id}/student/${this.userData.id}`
        );
        if (response.status == 200) {
          const score = response.data.score;
          const maxScore = 70;
          const totalQuestions = 5;

          const correctAnswers =
            (response.data.score / maxScore) * totalQuestions;
          const percentage = ((response.data.score / maxScore) * 100).toFixed(
            2
          );

          return {
            score,
            correctAnswers: Math.round(correctAnswers),
            percentage: percentage,
          };
        }
      } catch {
        his.toastMessage = "Error inesperado.";
        this.toastType = "error";
        this.toastVisible = true;
      }
    },

    handleModalConfirm() {
      this.showModal = false;
    },

    goBack() {
      this.$router.go(-1); // Esto regresa a la página anterior
    },
  },
};
</script>

<style scoped>
.subject-test {
  text-align: center;
  font-size: 2rem;
  margin-top: 20px;
}
</style>
