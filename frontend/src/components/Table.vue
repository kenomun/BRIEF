<template>
  <div class="overflow-x-auto">
    <table class="table-auto w-full border-collapse border border-gray-300">
      <thead>
        <tr class="bg-gray-200">
          <!-- Renderiza los encabezados dinámicamente -->
          <th
            v-for="header in headers"
            :key="header.key"
            class="border border-gray-300 px-4 py-2 text-left"
          >
            {{ header.label }}
          </th>
          <th v-if="actions" class="border border-gray-300 px-4 py-2 text-left">
            Acciones
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="row in rows"
          :key="row.id"
          class="hover:bg-gray-100 transition duration-200"
        >
          <!-- Renderiza las celdas dinámicamente -->
          <td
            v-for="header in headers"
            :key="header.key"
            class="border border-gray-300 px-4 py-2"
          >
            {{ getCellValue(row, header.key) }}
          </td>
          <!-- Renderiza las acciones si están habilitadas -->
          <td v-if="actions" class="border border-gray-300 px-4 py-2">
            <button
              class="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition duration-300 mr-2"
              @click="handleAction(row)"
            >
              {{ actionButtonText }}
            </button>
            <button
              class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-300"
              @click="$emit('delete', row)"
            >
              {{ deleteButtonText }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "Table",
  props: {
    headers: {
      type: Array,
      required: true,
    },
    rows: {
      type: Array,
      required: true,
    },
    actions: {
      type: Boolean,
      default: false,
    },
    actionButtonText: {
      type: String,
      default: 'Editar', // Valor predeterminado, pero puede ser sobrescrito
    },
    deleteButtonText: {
      type: String,
      default: 'Eliminar', // Valor predeterminado, pero puede ser sobrescrito
    },
    actionType: {
      type: String,
      default: 'view', // Default puede ser 'view' o 'edit'
    },
  },

  omputed: {
    actionButtonText() {
      return this.actionType === 'edit' ? 'Editar' : 'Ver detalles';
    },
  },
  
  methods: {
    getCellValue(row, key) {
      if (!(key in row)) return "--";
      const value = row[key];

      // Si el valor es un array de asignaturas (ya convertido en una cadena)
      if (Array.isArray(value)) {
        return value.join(", ");
      }

      if (typeof value === "object" && value !== null) {
        return JSON.stringify(value);
      }

      return value;
    },

    handleAction(row) {
      // Aquí manejamos el evento según el tipo de acción
      if (this.actionType === 'edit') {
        this.$emit('edit', row); // Emitir evento 'edit'
      } else {
        this.$emit('view', row); // Emitir evento 'view'
      }
    },
  },
};
</script>

<style scoped>
/* Agrega estilos personalizados si es necesario */
</style>

  