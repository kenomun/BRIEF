<template>
  <div
    v-if="isVisible"
    id="progress-modal"
    tabindex="-1"
    aria-hidden="true"
    class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50"
  >
    <div class="relative bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
      <!-- Modal Content -->
      <div class="p-4">
        <h3 class="mb-2 text-2xl font-bold text-gray-900">
          Reporte del Estudiante {{ reportData.name }}
        </h3>
        <p class="text-gray-500 mb-6">
          Esta es una descripcion del reporte el cual el estudiante realizo.
        </p>

        <div class="flex justify-between mb-4 text-gray-500">
          <span class="text-base">Asignatura</span>
          <span class="text-sm font-semibold text-gray-900">{{
            reportData.subjectName
          }}</span>
        </div>

        <div class="flex justify-between mb-4 text-gray-500">
          <span class="text-base">Profesor(s)</span>
          <span class="text-sm font-semibold text-gray-900">{{
            reportData.professorName
          }}</span>
        </div>

        <!-- Progress Bar -->
        <div class="flex justify-between mb-4 text-gray-500">
          <span class="text-base">Mi Puntaje</span>
          <span class="text-sm font-semibold text-gray-900"
            >{{ reportData.puntaje }} de {{ reportData.maxScore }}</span
          >
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2.5">
          <div
            class="bg-orange-500 h-2.5 rounded-full"
            :style="{ width: reportData.percentage + '%' }"
          ></div>
        </div>

        <!-- Modal Footer -->
        <div class="flex justify-between mt-6">
          <button
            type="button"
            @click="cancelModal"
            class="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalReportComponent",
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
    reportData: {
      type: Object,
      default: () => ({}),
    },
  },

  setup(props, { emit }) {
    const cancelModal = () => {
      emit("close");
    };

    return {
      cancelModal,
    };
  },
};
</script>

<style scoped>
#progress-modal {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
