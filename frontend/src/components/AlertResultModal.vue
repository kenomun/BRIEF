<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50"
  >
    <div class="bg-white rounded-lg shadow-lg w-96">
      <div class="p-4">
        <h3 class="text-lg font-bold text-gray-800 mb-4">{{ title }}</h3>
        <div class="text-gray-600">
          <p v-for="(line, index) in messageLines" :key="index">{{ line }}</p>
        </div>
      </div>
      <div class="flex justify-end p-4">
        <button
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
          @click="onConfirm"
        >
          Aceptar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ResultModal",
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      default: "Resultados",
    },
    message: {
      type: String,
      required: true,
    },
  },
  computed: {
    messageLines() {
      return this.message.split("\n");
    },
  },
  emits: ["confirm"],
  methods: {
    onConfirm() {
      this.$emit("confirm");
    },
  },
};
</script>

<style scoped>
/* Estilos personalizados si son necesarios */
</style>
