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

      <AlertModal
        :show="showModal"
        :title="'Resultado del Examen'"
        :message="modalMessage"
        @confirm="handleModalConfirm"
        @cancel="handleModalCancel"
      />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { API_BASE_URL } from "../../config/config";
import AlertModal from "../../components/AlertModal.vue";

export default {
  components: {
    AlertModal,
  },
  name: "ExamView",
  data() {
    return {
      exam: null, // Objeto que almacenará el examen
      answers: {}, // Respuestas seleccionadas (almacenará los ids de las respuestas seleccionadas)
      correctAnswers: 0, // Número de respuestas correctas
      totalPoints: 70, // Total de puntos
      questionsCount: 5, // Número de preguntas en el examen
      pointsPerQuestion: 70 / 5, // Puntos por cada pregunta (total de puntos dividido por el número de preguntas)
      obtainedPoints: 0, // Puntaje obtenido por el usuario
      showModal: false, // Controla la visibilidad del modal
      modalMessage: "", // Mensaje que se mostrará en el modal
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
      // Calcular el porcentaje de respuestas correctas
      if (this.questionsCount > 0) {
        return (this.correctAnswers / this.questionsCount) * 100;
      }
      return 0;
    },
  },
  mounted() {
    this.fetchExamData();
  },
  methods: {
    async fetchExamData() {
      console.log("fetch");
      try {
        const examId = this.$route.params.examId;
        const response = await fetch(`${API_BASE_URL}/test/${examId}`);
        const data = await response.json();
        this.exam = data;
      } catch (error) {
        console.error("Error fetching exam data:", error);
      }
    },
    submitExam() {
      if (!this.exam || !this.exam.Questions) {
        console.error("El examen o las preguntas no están disponibles.");
        return;
      }

      // Contamos las respuestas correctas
      let correctCount = 0;

      // Recorrer las preguntas del test
      this.exam.Questions.forEach((question) => {
        // Buscar la respuesta seleccionada del usuario para esta pregunta
        const selectedAnswerId = this.answers[question.id];

        // Si se seleccionó una respuesta
        if (selectedAnswerId) {
          // Buscar la respuesta correcta para esta pregunta
          const correctAnswer = question.Answers.find(
            (answer) => answer.isCorrect
          );

          // Si la respuesta seleccionada es la correcta
          if (correctAnswer && correctAnswer.id === selectedAnswerId) {
            correctCount++;
          }
        }
      });

      // Calculamos el puntaje obtenido (por ejemplo, cada respuesta correcta vale puntos según "pointsPerQuestion")
      this.correctAnswers = correctCount;
      this.obtainedPoints = this.correctAnswers * this.pointsPerQuestion;

      // Mostrar el número de respuestas correctas, el puntaje obtenido y el porcentaje en el modal
      this.showModal = true;
      console.log("this.correctAnswers", this.correctAnswers);
      console.log("this.obtainedPoints", this.obtainedPoints);
      console.log(this.percentage.toFixed(2));

      this.modalMessage = `
        Respuestas correctas: ${this.correctAnswers} de ${this.questionsCount}
        Puntaje obtenido: ${this.obtainedPoints} puntos
        Porcentaje de respuestas correctas: ${this.percentage.toFixed(2)}%
      `;
    },
    handleModalConfirm() {
      // Acción cuando el usuario confirma el modal
      this.showModal = false;
      console.log("Modal confirmado");
    },
    handleModalCancel() {
      // Acción cuando el usuario cancela el modal
      this.showModal = false;
      console.log("Modal cancelado");
    },
  },
};
</script>
