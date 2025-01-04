<!-- FormButton.vue -->
<template>
    <button
      type="button"
      @click="openForm"
      class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
    >
      {{ buttonText }}
    </button>
  </template>
  
  <script>
  export default {
    name: 'FormButton',
    props: {
      buttonText: {
        type: String,
        required: true,
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
      openForm() {
        this.$emit('openForm', {
          formTitle: this.formTitle,
          formButtonText: this.formButtonText,
          fields: this.fields,
        });
      },
    },
  };
  </script>
  
  <style scoped>
  /* Aquí puedes añadir estilos si es necesario */
  </style>
  