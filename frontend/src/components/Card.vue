<template>
    <div class="max-w-sm w-full bg-white rounded-lg shadow-md overflow-hidden">
      <div class="px-6 py-4">
        <h2 class="text-2xl font-semibold text-center text-gray-900 mb-4">{{ title }}</h2>
        <p class="text-gray-600 text-center">{{ description }}</p>
      </div>
      <div class="px-6 py-4 text-center">
        <router-link
          :to="link"
          class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          Ver más
        </router-link>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Card',
    props: {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      link: {
        type: String,
        required: true,
      },
    },
  };
  </script>
  