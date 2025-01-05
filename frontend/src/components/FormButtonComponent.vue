<!-- FormButton.vue -->
<template>
  <button
    type="button"
    @click="openForm"
    class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
  >
    {{ buttonText }}
  </button>
</template>

<script>
export default {
  name: "FormButton",
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
      this.$emit("openForm", {
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
