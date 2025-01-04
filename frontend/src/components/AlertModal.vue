<template>
    <div v-if="show" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div class="bg-white rounded-lg shadow-lg w-96">
        <div class="p-4">
          <h3 class="text-lg font-bold text-gray-800 mb-4">{{ title }}</h3>
          <p class="text-gray-600">{{ message }}</p>
        </div>
        <div class="flex justify-end p-4 gap-2">
          <button
            class="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition duration-200"
            @click="onCancel"
          >
            Cancelar
          </button>
          <button
            class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
            @click="onConfirm"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "AlertModal",
    props: {
      show: {
        type: Boolean,
        required: true,
      },
      title: {
        type: String,
        default: "¿Estás seguro?",
      },
      message: {
        type: String,
        default: "Esta acción no se puede deshacer.",
      },
    },
    emits: ["confirm", "cancel"],
    methods: {
      onConfirm() {
        this.$emit("confirm");
      },
      onCancel() {
        this.$emit("cancel");
      },
    },
  };
  </script>
  
  <style scoped>
  /* Personaliza el estilo según tu diseño */
  </style>
  