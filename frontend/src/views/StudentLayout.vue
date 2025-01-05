<template>
  <div class="flex flex-col h-screen">
    <!-- Navbar -->
    <Navbar />

    <div class="flex flex-row h-full">
      <!-- Sidebar -->
      <div
        class="w-64 bg-gray-800 text-white h-screen fixed top-16 left-0 z-40"
      >
        <SidebarStudent />
      </div>

      <!-- Main content -->
      <main class="flex-1 p-6 bg-gray-100 ml-64">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script>
import SidebarStudent from "../components/SidebarStudent.vue";
import Navbar from "../components/Navbar.vue";

export default {
  name: "Layout",
  components: {
    SidebarStudent,
    Navbar,
  },
};
</script>

<style scoped>
/* Asegura que el contenido principal esté desplazado a la derecha */
main {
  margin-top: 4rem;
}
</style>
