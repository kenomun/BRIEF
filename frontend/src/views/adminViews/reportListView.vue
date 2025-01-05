<template>
    <div class="container mx-auto p-6">
        <h1 class="text-3xl font-bold text-gray-800 text-center mb-6">Lista de reportes</h1>


        <Table class="mt-6" :headers="headers" :rows="rows" :options="option" @actionSelect="handleAction"
            :actions="true" />

        <ModalReportComponent :isVisible="isVisible"  @close="handleCancel" :reportData="reportData" />

    </div>
</template>


<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import Table from "../../components/Table.vue";
import { API_BASE_URL } from "../../config/config";
import ModalReportComponent from "../../components/ModalReportComponent.vue";
import reportsData from "../../../data.json";
export default {
    name: "reportList",
    components: {
        Table,
        ModalReportComponent
    },
    data() {
        const reportData = ref({});
        const isVisible = ref(false);
        const option = ([
            { label: "Ver Detalles", class: "ml-2 bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 transition duration-300 mr-2", action: "view" },
        ]);
        const headers = ref([
            { key: "name", label: "Nombre del Estudiante" },
            { key: "subjectName", label: "Asignatura" },
            { key: "puntaje", label: "Puntaje" },
        ]);

        const rows = ref([]);

        const init = async () => {
            // const response = await axios.get(`${API_BASE_URL}/reports`);
            // rows.value = response.data.map((report) => ({
            //     id: report.id,
            //     name: report.profile.name,
            //     subjectName: report.Subject.name,
            //     puntaje: report.puntaje
            // }));

            rows.value = reportsData.map((report) => ({
                id: report.id,
                name: report.profile.name,
                subjectName: report.Subject.name,
                puntaje: report.puntaje
            }));
        }

        const handleAction = (data) => {
            console.log(data)
            reportData.value = data;
            isVisible.value = true;
        }

        const handleCancel = () => {
            reportData.value = {};
            isVisible.value = false;
        }

        onMounted(() => {
            init();
        });

        return {
            reportData,
            isVisible,
            headers,
            rows,
            option,
            handleCancel,
            handleAction
        }
    }
}

</script>