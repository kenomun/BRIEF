<template>
  <div class="max-w-sm w-full bg-white rounded-lg shadow-md overflow-hidden">
    <div class="px-6 py-4">
      <h2 class="text-2xl font-semibold text-center text-gray-900 mb-4">
        {{ title }}
      </h2>
      <p class="text-gray-600 text-center">{{ description }}</p>
    </div>
    <div class="px-6 py-4 text-center">
      <router-link
        :to="link"
        class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
      >
        Ver más
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
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
