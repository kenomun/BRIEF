<template>
    <div v-if="show" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div class="bg-white rounded-lg shadow-lg w-96 max-h-screen overflow-y-auto">
        <div class="p-4">
          <h3 class="text-lg font-bold text-gray-800 mb-4">{{ title }}</h3>
  
          <!-- Mostrar los campos dinámicamente -->
          <div v-for="(field, index) in fields" :key="index" class="mb-4">
            <label :for="field.name" class="block font-semibold text-gray-700">{{ field.label }}</label>
            <input
              v-if="field.type === 'text'"
              type="text"
              v-model="formData[field.name]"
              :placeholder="field.placeholder"
              class="w-full mt-2 p-2 border border-gray-300 rounded"
            />
            <textarea
              v-if="field.type === 'textarea'"
              v-model="formData[field.name]"
              :placeholder="field.placeholder"
              class="w-full mt-2 p-2 border border-gray-300 rounded"
            ></textarea>
            <!-- Aquí podrías agregar otros tipos de campos dinámicamente -->
          </div>
        </div>
  
        <div class="flex justify-between p-4 gap-2">
          <!-- Botones dinámicos -->
          <button
            v-for="(button, index) in buttons"
            :key="index"
            :class="button.class"
            @click="handleButtonClick(button.action)"
            class="px-4 py-2 rounded transition duration-200"
          >
            {{ button.label }}
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "DynamicModal",
    props: {
      show: {
        type: Boolean,
        required: true,
      },
      title: {
        type: String,
        default: "Detalles",
      },
      fields: {
        type: Array,
        default: () => [],
      },
      buttons: {
        type: Array,
        default: () => [
          { label: "Cancelar", class: "bg-gray-300 text-gray-800", action: "cancel" },
          { label: "Confirmar", class: "bg-blue-500 text-white", action: "confirm" },
        ],
      },
    },
    data() {
      return {
        formData: {},
      };
    },
    watch: {
      fields: {
        handler(newFields) {
          console.log("Campos recibidos:", newFields);
          // Inicializa los datos del formulario cuando los campos cambian
          this.formData = {};
          newFields.forEach(field => {
            this.$set(this.formData, field.name, "");
          });
        },
        immediate: true,
      },
    },
    methods: {
      handleButtonClick(action) {
        if (action === "cancel") {
          this.$emit("close");
        } else if (action === "confirm") {
          this.$emit("confirm", this.formData);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Personaliza el estilo según tu diseño */
  </style>
  