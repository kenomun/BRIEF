<template>
  <nav
    class="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600"
  >
    <div class="max-w-screen-xl flex items-center justify-between mx-auto p-4">
      <!-- Logo -->
      <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img
          src="https://flowbite.com/docs/images/logo.svg"
          class="h-8"
          alt="Logo"
        />
        <span
          class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
          >ExamPass</span
        >
      </a>

      <!-- Información del Usuario -->
      <div v-if="userData" class="flex items-center space-x-3">
        <img
          :src="userData.picture"
          alt="User Picture"
          class="w-8 h-8 rounded-full"
        />
        <div>
          <span class="block text-gray-900 dark:text-white font-semibold">{{
            userData.name
          }}</span>
          <span class="text-gray-500 dark:text-gray-400">{{
            userData.email
          }}</span>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      userData: [],
    };
  },

  mounted() {
    const userDataString = localStorage.getItem("user");
    this.userData = JSON.parse(userDataString);
  },
};
</script>

<style scoped>
/* Estilos específicos para tu sidebar si es necesario */
</style>
