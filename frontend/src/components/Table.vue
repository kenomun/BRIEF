<template>
  <div class="overflow-x-auto">
    <table class="table-auto w-full border-collapse border border-gray-300">
      <thead>
        <tr class="bg-gray-200">
          <!-- Renderiza los encabezados dinámicamente -->
          <th v-for="header in headers" :key="header.key" class="border border-gray-300 px-4 py-2 text-left">
            {{ header.label }}
          </th>
          <th v-if="actions" class="border border-gray-300 px-4 py-2 text-left">
            Acciones
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row.id" class="hover:bg-gray-100 transition duration-200">
          <!-- Renderiza las celdas dinámicamente -->
          <td v-for="header in headers" :key="header.key" class="border border-gray-300 px-4 py-2">
            {{ getCellValue(row, header.key) }}
          </td>
          <!-- Renderiza las acciones si están habilitadas -->
          <td v-if="actions" class="border border-gray-300 px-4 py-2">
            <button type="button" v-for="option in options" :key="option.action" :class="option.class"
              @click="handleAction(option.action, row)">
              {{ option.label }}
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
    options: {
      type: Array,
      default: () => [],
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

    handleAction(action, data) {
      // Aquí manejamos el evento según el tipo de acción
      if (action === 'edit') {
        this.$emit('actionSelect', data , 1); 
      } else if (action === 'view') {
        this.$emit('actionSelect', data, 2); 
      } else if (action === 'delete') {
        this.$emit('actionSelect', data, 3);
      }
    }
  }
}
</script>