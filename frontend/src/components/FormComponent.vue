<template>
    <div class="bg-white p-6 rounded-lg shadow-lg w-1/3">
      <h2 class="text-2xl font-bold mb-4">{{ formTitle }}</h2>
      <form @submit.prevent="handleSubmit">
        <div v-for="(field, index) in fields" :key="index" class="mb-4">
          <label :for="field.name" class="block text-sm font-medium text-gray-700">{{ field.label }}</label>
          <input
            v-if="field.type === 'text' || field.type === 'email'" 
            :type="field.type"
            :id="field.name"
            v-model="entity[field.name]"
            :placeholder="field.placeholder || field.label"
            class="mt-1 p-2 border border-gray-300 rounded-lg w-full"
            required
          />
        </div>
  
        <div class="flex justify-between">
          <button
            type="button"
            @click="$emit('cancel')"
            class="bg-gray-400 text-white px-4 py-2 rounded-lg"
          >
            Cancelar
          </button>
          <button
            type="submit"
            class="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            {{ formButtonText }}
          </button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: "DynamicForm",
    props: {
      entity: {
        type: Object,
        default: () => ({

        }),
      },
      formTitle: {
        type: String,
        required: true,
      },
      formButtonText: {
        type: String,
        required: true,
      },
      fields: {
        type: Array,
        required: true,
      },
    },

    methods: {
      handleSubmit() {
        this.$emit("save", { ...this.entity });
      },
    },
  };
  </script>
  
  <style scoped>
  /* Estilos para el formulario */
  </style>
  