<template>
  <div class="container mx-auto p-6">
    <h1 class="text-3xl font-bold text-gray-800 text-center mb-6">
      Lista de reportes
    </h1>

    <Table
      class="mt-6"
      :headers="headers"
      :rows="rows"
      :options="option"
      @actionSelect="handleAction"
      :actions="true"
    />

    <ModalReportComponent
      :isVisible="isVisible"
      @close="handleCancel"
      :reportData="reportData"
    />
  </div>
</template>

<script>
import axios from "axios";
import Table from "../../components/Table.vue";
import { API_BASE_URL } from "../../config/config";
import ModalReportComponent from "../../components/ModalReportComponent.vue";

export default {
  name: "reportList",
  components: {
    Table,
    ModalReportComponent,
  },
  data() {
    return {
      reportData: {},
      isVisible: false,
      headers: [
        { key: "name", label: "Nombre del Estudiante" },
        { key: "subjectName", label: "Asignatura" },
        { key: "puntaje", label: "Puntaje" },
        { key: "percentagetable", label: "Aprobación" },
      ],
      rows: [],
      option: [
        {
          label: "Ver Detalles",
          class:
            "ml-2 bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 transition duration-300 mr-2",
          action: "view",
        },
      ],
    };
  },
  methods: {
    async init() {
      try {
        // Para obtener datos  desde la API:
        const response = await axios.get(`${API_BASE_URL}/results/report/`);

        this.rows = response.data.map((report) => ({
          id: report.ProfileId,
          name: report.ProfileName,
          subjectName: report.SubjectName,
          puntaje: report.Score,
          professorName: report.ProfessorName,
          maxScore: report.maxScore,
          percentagetable: `${report.Percentage} %`,
          percentage: parseInt(report.Percentage),
        }));
      } catch (error) {
        console.error("Error al cargar los reportes:", error);
      }
    },
    handleAction(data) {
      console.log("Acción seleccionada:", data);
      this.reportData = data;
      this.isVisible = true;
    },
    handleCancel() {
      this.reportData = {};
      this.isVisible = false;
    },
  },
  mounted() {
    this.init();
  },
};
</script>
