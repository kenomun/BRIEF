<template>
  <div class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded-lg shadow-lg w-2/5 h-[90%] overflow-y-auto">
      <h2 class="text-2xl font-bold mb-4">{{ formTitle }}</h2>
      <form @submit.prevent="handleFormSave">
        <!-- Campos básicos del Test -->
        <div v-for="(field, index) in basicFields" :key="index" class="mb-4">
          <label :for="field.name" class="block text-sm font-medium text-gray-700">{{ field.label }}</label>
          <div v-if="field.name === 'subject'">
            <select v-model="testData.subjectId" :id="field.name"
              class="mt-1 p-2 border border-gray-300 rounded-lg w-full" required>
              <option value="">Selecciona una asignatura</option>
              <option v-for="subject in subjects" :key="subject.id" :value="subject.id">
                {{ subject.name }}
              </option>
            </select>
          </div>
          <div v-else>
            <input v-if="field.type === 'text' || field.type === 'email'" :type="field.type" :id="field.name"
              v-model="testData[field.name]" :placeholder="field.placeholder || field.label"
              class="mt-1 p-2 border border-gray-300 rounded-lg w-full" required />
          </div>
        </div>

        <!-- Preguntas y respuestas -->
        <div v-for="(question, index) in testData.questions" :key="index" class="mb-6">
          <h3 class="text-lg font-semibold mb-2">Pregunta {{ index + 1 }}</h3>
          <div class="mb-2">
            <label :for="'question-' + index" class="block text-sm font-medium text-gray-700">
              Escribe la pregunta
            </label>
            <input v-model="question.questionText" :id="'question-' + index" type="text"
              placeholder="Escribe la pregunta" class="mt-1 p-2 border border-gray-300 rounded-lg w-full" required />
          </div>

          <!-- Contenido adicional para la pregunta -->
          <div class="mb-2">
            <label :for="'content-' + index" class="block text-sm font-medium text-gray-700">
              Contenido de la pregunta (opcional)
            </label>
            <textarea v-model="question.content" :id="'content-' + index" placeholder="Agrega un contenido adicional"
              class="mt-1 p-2 border border-gray-300 rounded-lg w-full"></textarea>
          </div>

          <div v-for="(answer, answerIndex) in question.answers" :key="answerIndex" class="mb-2">
            <label :for="'answer-' + index + '-' + answerIndex" class="block text-sm font-medium text-gray-700">
              Respuesta {{ answerIndex + 1 }}
            </label>
            <input v-model="question.answers[answerIndex]" :id="'answer-' + index + '-' + answerIndex" type="text"
              placeholder="Escribe una respuesta" class="mt-1 p-2 border border-gray-300 rounded-lg w-full" required />
          </div>
          <div class="mt-2">
            <label :for="'correct-answer-' + index" class="block text-sm font-medium text-gray-700">
              Respuesta Correcta
            </label>
            <select v-model="question.correctAnswer" :id="'correct-answer-' + index"
              class="mt-1 p-2 border border-gray-300 rounded-lg w-full" required>
              <option value="0">Respuesta 1</option>
              <option value="1">Respuesta 2</option>
              <option value="2">Respuesta 3</option>
              <option value="3">Respuesta 4</option>
            </select>
          </div>
        </div>

        <!-- Botones de acción -->
        <div class="flex justify-between">
          <button type="button" @click="cancelForm" class="bg-gray-400 text-white px-4 py-2 rounded-lg">
            Cancelar
          </button>
          <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-lg">
            {{ formButtonText }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
  
<script>
export default {
  name: 'TestForm',
  props: {
    formTitle: {
      type: String,
      required: true,
    },
    formButtonText: {
      type: String,
      required: true,
    },
    testToEdit: {
      type: Object,
      default: () => ({
        name: '',
        subjectId: null,
        content: '',
        questions: [
          { questionText: '', answers: ['', '', '', ''], correctAnswer: 0, content: '' },
          { questionText: '', answers: ['', '', '', ''], correctAnswer: 0, content: '' },
          { questionText: '', answers: ['', '', '', ''], correctAnswer: 0, content: '' },
          { questionText: '', answers: ['', '', '', ''], correctAnswer: 0, content: '' },
          { questionText: '', answers: ['', '', '', ''], correctAnswer: 0, content: '' },
        ],
      }),
    },
  },
  data() {
    return {
      subjects: [
        { id: 1, name: 'Matemáticas' },
        { id: 2, name: 'Lengua y Literatura' },
        { id: 3, name: 'Ciencias' },
        { id: 4, name: 'Historia' },
        { id: 5, name: 'Geografía' },
        { id: 6, name: 'Inglés' },
        { id: 7, name: 'Arte' },
        { id: 8, name: 'Educación Física' },
      ],
      basicFields: [
        { name: 'name', type: 'text', label: 'Nombre', placeholder: 'Nombre del test' },
        { name: 'subject', type: 'text', label: 'Asignatura', placeholder: 'Asignatura del test' },
        { name: 'content', type: 'text', label: 'Contenido', placeholder: 'Contenido del test' },
      ],
      testData: { ...this.testToEdit },
    };
  },
  methods: {
    handleFormSave() {
      console.log("TESTDATA",this.testData)
      const formattedData = {
        testName: this.testData.name,  // El nombre del test
        subjectId: this.testData.subjectId,  // El ID de la asignatura
        questions: this.testData.questions.map(question => ({
          question: question.questionText,  // El texto de la pregunta
          content: {
            description: question.content || ''  // El contenido (puedes agregar un campo de contenido si es necesario)
          },
          answers: question.answers.map((answer, index) => ({
            answer: answer,  // El texto de la respuesta
            isCorrect: parseInt(question.correctAnswer) === index  // Marcar la respuesta correcta
          }))
        }))
      };

      console.log("form",formattedData)

      // Aquí enviarás la data al backend para guardarla
      this.$emit('save', formattedData);
    },
    cancelForm() {
      this.$emit('cancel');
    },
  },
};
</script>