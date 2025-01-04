<template>
    <div class="overflow-x-auto">
      <table class="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr class="bg-gray-200">
            <th v-for="header in headers" :key="header" class="border border-gray-300 px-4 py-2 text-left">
              {{ header }}
            </th>
            <th class="border border-gray-300 px-4 py-2 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="row in rows"
            :key="row.id"
            class="hover:bg-gray-100 transition duration-200"
          >
            <td class="border border-gray-300 px-4 py-2">{{ row.name }}</td>
            <td class="border border-gray-300 px-4 py-2">{{ row.email }}</td>
            <td class="border border-gray-300 px-4 py-2">
              <button
                class="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition duration-300 mr-2"
                @click="$emit('edit', row)"
              >
                Editar
              </button>
              <button
                class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-300"
                @click="$emit('delete', row)"
              >
                Eliminar
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
    },
  };
  </script>
  
  <style scoped>
  /* Estilos personalizados si es necesario */
  </style>
  