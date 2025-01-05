<template>
  <div class="container mx-auto p-6">
    <!-- Mensaje de carga mientras se obtiene el examen -->
    <div v-if="!exam" class="text-center">
      <p>Cargando examen...</p>
    </div>

    <div v-if="exam" class="text-center mb-8">
      <h1 class="text-3xl font-bold">{{ exam.name }}</h1>
      <h2 class="text-xl">{{ exam.Subject.name }}</h2>
    </div>

    <!-- Mostrar las preguntas -->
    <div v-if="exam && exam.Questions.length" class="space-y-6">
      <div
        v-for="question in exam.Questions"
        :key="question.id"
        class="bg-gray-100 p-4 rounded-lg shadow"
      >
        <p class="font-semibold">{{ question.question }}</p>
        <p class="text-sm italic">{{ question.content.description }}</p>

        <!-- Opciones de respuestas -->
        <div
          v-for="answer in question.Answers"
          :key="answer.id"
          class="flex items-center space-x-2"
        >
          <input
            type="radio"
            :id="'question_' + question.id + '_answer_' + answer.id"
            :name="'question_' + question.id"
            :value="answer.id"
            v-model="answers[question.id]"
            :disabled="isSubmitted"
            class="form-radio h-4 w-4 text-blue-600"
          />
          <label
            :for="'question_' + question.id + '_answer_' + answer.id"
            class="text-sm"
            >{{ answer.answer }}</label
          >
        </div>
      </div>
    </div>

    <!-- Botón para enviar las respuestas -->
    <div class="mt-8 text-center">
      <button
        :disabled="!isAllAnswered"
        @click="submitExam"
        class="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-400"
      >
        Enviar Respuestas
      </button>

      <AlertResultModal
        :show="showModal"
        :title="'Resultado del Examen'"
        :message="modalMessage"
        @confirm="handleModalConfirm"
      />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { API_BASE_URL } from "../../config/config";
import AlertResultModal from "../../components/AlertResultModal.vue";
import axios from "axios";

export default {
  components: {
    AlertResultModal,
  },
  name: "ExamView",
  data() {
    return {
      exam: null,
      answers: {},
      totalPoints: 70,
      questionsCount: 5,
      pointsPerQuestion: 70 / 5,
      obtainedPoints: 0,
      showModal: false,
      modalMessage: "",
      isSubmitted: false,
      userData: [],
    };
  },
  computed: {
    isAllAnswered() {
      // Asegúrate de que exam y exam.Questions no sean null o undefined
      if (this.exam && this.exam.Questions) {
        return this.exam.Questions.every(
          (question) => this.answers[question.id]
        );
      }
      return false;
    },
    percentage() {
      if (this.questionsCount > 0) {
        return (this.correctAnswers / this.questionsCount) * 100;
      }
      return 0;
    },
  },
  mounted() {
    const userDataString = localStorage.getItem("user");
    this.userData = JSON.parse(userDataString);
    this.fetchExamData();
  },
  methods: {
    async fetchExamData() {
      console.log("fetch");
      try {
        const examId = this.$route.params.examId;
        const response = await axios.get(`${API_BASE_URL}/test/${examId}`);

        if (response.status == 200) {
          this.exam = response.data;
        } else {
          this.toastMessage = "Error inesperado";
          this.toastType = "error";
          this.toastVisible = true;
        }
      } catch (error) {
        this.toastMessage = "Error inesperado";
        this.toastType = "error";
        this.toastVisible = true;
      }
    },

    async submitExam() {
      console.log("userdata ", this.userData);
      if (!this.exam || !this.exam.Questions) {
        console.error("El examen o las preguntas no están disponibles.");
        return;
      }

      // Contamos las respuestas correctas
      let correctCount = 0;

      const answersToSend = [];

      this.exam.Questions.forEach((question) => {
        const selectedAnswerId = this.answers[question.id];
        if (selectedAnswerId) {
          answersToSend.push({
            questionId: question.id,
            answerId: selectedAnswerId,
          });

          const correctAnswer = question.Answers.find(
            (answer) => answer.isCorrect
          );
          // Si la respuesta seleccionada es la correcta
          if (correctAnswer && correctAnswer.id === selectedAnswerId) {
            correctCount++;
          }
        }
      });

      // Calculamos el puntaje obtenido
      this.correctAnswers = correctCount;
      this.obtainedPoints = this.correctAnswers * this.pointsPerQuestion;
      this.showModal = true;

      this.modalMessage = `
    Respuestas correctas: ${this.correctAnswers} de ${this.questionsCount}
    Puntaje obtenido: ${this.obtainedPoints} puntos
    Porcentaje de respuestas correctas: ${this.percentage.toFixed(2)}%
  `;

      const payload = {
        profileId: this.userData.id,
        testId: this.exam.id,
        score: this.obtainedPoints,
        answers: answersToSend,
      };

      console.log("paylod", payload);
      try {
        const response = await axios.post(`${API_BASE_URL}/results`, payload);
        if (response.status == 200) {
          this.toastMessage = "Examen guardado";
          this.toastType = "success";
          this.toastVisible = true;
        }
      } catch (error) {
        this.toastMessage = "Error al guardar el examen";
        this.toastType = "error";
        this.toastVisible = true;
      }
    },

    handleModalConfirm() {
      this.showModal = false;
      this.$router.push(`/subjectTest/${this.exam.Subject.id}`);
    },
  },
};
</script>
