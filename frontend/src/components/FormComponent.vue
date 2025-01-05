<template>
  <div v-if="isVisible" class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded-lg shadow-lg w-2/5 h-auto overflow-y-auto relative">
      <h2 class="text-2xl font-bold mb-4 text-center">{{ formTitle }}</h2>
      <form @submit.prevent="handleSubmit">
        <div v-for="(field, index) in fields" :key="index" class="mb-4">
          <label :for="field.name" class="block text-sm font-medium text-gray-700">{{ field.label }}</label>
          <input v-if="field.type === 'text' || field.type === 'email'" :type="field.type" :id="field.name"
            v-model="entity[field.name]" :placeholder="field.placeholder || field.label"
            class="mt-1 p-2 border border-gray-300 rounded-lg w-full" required />
        </div>

        <div class="flex justify-between mt-6">
          <button type="button" @click="$emit('cancel')"
            class="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500">
            Cancelar
          </button>
          <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            {{ formButtonText }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "DynamicForm",
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
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