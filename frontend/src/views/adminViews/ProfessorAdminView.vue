<template>
  <div class="container mx-auto p-6">
    <h1 class="text-3xl font-bold text-gray-800 text-center mb-6">Lista de Profesores</h1>
    <FormButtonComponent class="mt-6" buttonText="Crear Profesor" formTitle="Nuevo Profesor"
      formButtonText="Crear Profesor" :fields="['name', 'email']" :entity="{}" @openForm="openFormCreate" />
    <Table class="mt-6" :headers="headers" :rows="rows" :options="option" :actions="true"
      @actionSelect="handleAction" />

    <button type="button" @click="goBack"
      class=" mt-10 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Volver</button>

    <!-- Componente de Toast -->
    <Toast v-if="toastVisible" :message="toastMessage" :type="toastType" :duration="3000"
      @closed="toastVisible = false" />

    <!-- Modal de Confirmación de Eliminación -->
    <AlertModal v-if="alertVisible" :show="alertVisible" title="Eliminar Administrador"
      message="¿Estás seguro de que deseas eliminar este administrador? Esta acción no se puede deshacer."
      @confirm="confirmDelete" @cancel="cancelDelete" />

    <!-- Formulario de edición de administrador -->
    <FormComponent :isVisible="formModalVisible" :formTitle="formTitle" :entity="professorToEdit"
      :formButtonText="formButtonText" :fields="professorFields" @save="handleFormSave" @cancel="handleCancel" />
  </div>
</template>

<script>
import axios from "axios";
import Table from "../../components/Table.vue";
import Toast from "../../components/ToastComponent.vue";
import AlertModal from "../../components/AlertModal.vue";
import FormComponent from "../../components/FormComponent.vue";
import FormButtonComponent from "../../components/FormButtonComponent.vue"
import { API_BASE_URL } from "../../config/config";

export default {
  name: "UserAdminView",
  components: {
    Table,
    Toast,
    AlertModal,
    FormComponent,
    FormButtonComponent
  },
  data() {
    return {
      professors: [],
      rows: [],
      headers: [],
      adminToDelete: null,
      alertVisible: false,
      toastVisible: false,
      toastMessage: "",
      toastType: "success",
      formModalVisible: false,
      formTitle: "",
      formButtonText: "",
      professorToEdit: null,
      isEditing: false,
      option: [
        { label: "Editar", class: "ml-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition duration-300 mr-2", action: "edit" },
        { label: "Eliminar", class: "bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-300", action: "delete" },
      ],
      professorFields: [
        { name: 'name', type: 'text', label: 'Nombre', placeholder: 'Nombre del administrador' },
        { name: 'email', type: 'email', label: 'Correo electrónico', placeholder: 'Email del administrador' },
      ],
    };
  },
  async created() {
    try {
      const response = await axios.get(`${API_BASE_URL}/professors`);
      const professors = response.data.filter((user) => user.roleId === 1);

      // Determina dinámicamente los encabezados en base a los datos
      this.headers = [
        { key: "name", label: "Nombre" },
        { key: "email", label: "Correo Electrónico" },
        { key: "subjectsNames", label: "Asignaturas" },
      ];

      // Transforma los datos de los profesores en el formato necesario
      this.rows = professors.map((professor) => ({
        id: professor.id,
        name: professor.name,
        email: professor.email,
        roldeId: professor.roleId,
        subjectsNames: professor.Subjects
          .map((subject) => subject.Subject.name)
          .join(", "),
        subjectsIds: professor.Subjects
          .map((subject) => subject.Subject.id),
      }));
    } catch (error) {
      console.error("Error al obtener los profesores:", error);
    }
  },



  methods: {

    goBack() {
      this.$router.go(-1); // Esto te lleva a la vista anterior
    },

    getTableHeaders() {
      if (!this.professors || this.professors.length === 0) return [];

      // Obtén las claves del primer objeto para generar encabezados
      const headers = Object.keys(this.professors[0]).map(key => ({
        label: this.formatHeaderLabel(key), // Formatear etiquetas (opcional)
        key: key
      }));

      // Agrega las columnas de acción si es necesario
      if (this.actions) {
        headers.push({ label: "Acciones", key: "actions" });
      }

      return headers;
    },
    formatHeaderLabel(key) {
      // Formatear nombres de claves en etiquetas más legibles
      return key.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase());
    },


    handleFormSave(professor) {
      if (this.isEditing) {
        this.handleSave(professor);  // Llama a handleSave para editar
      } else {
        this.handleCreate(professor);  // Llama a handleCreate para crear
      }
    },
    openFomrEdit(professor) {
      this.isEditing = true;
      this.professorToEdit = { ...professor };
      this.formTitle = "Editar Profesor";
      this.formButtonText = "Guardar Cambios";
      this.formModalVisible = true;
    },

    openFormCreate(data) {
      this.professorToEdit = { name: '', email: '' };
      this.isEditing = false;
      this.formTitle = data.formTitle;
      this.formButtonText = data.formButtonText;
      this.fields = data.fields;
      this.formModalVisible = true;
    },

    async handleCreate(createAdmin) {
      try {
        const payload = {
          name: createAdmin.name,
          email: createAdmin.email,
          roleId: 1,
          subjectIds: [2, 4, 5]
        };
        console.log("payload", payload)
        const response = await axios.post(`${API_BASE_URL}/professors`, payload);
        await this.loadProfessor();
        this.$emit('save', response.data);
        this.formModalVisible = false;

      } catch (error) {
        if (error.response) {
          console.error('Error en la creación del usuario:', error.response.data);
        } else if (error.request) {
          console.error('No se recibió respuesta del servidor:', error.request);
        } else {
          console.error('Error al realizar la solicitud:', error.message);
        }
      }
    },


    async handleSave(updatedProfessor) {
      // Guardar los cambios realizados en el administrador
      try {
        await axios.put(`${API_BASE_URL}/professor/${updatedProfessor.id}`, {
          name: updatedProfessor.name,
          email: updatedProfessor.email,
          roleId: updatedProfessor.roleId,
          subjectIds: updatedProfessor.subjectsIds,
        });

        this.toastMessage = `Administrador ${updatedProfessor.name} actualizado correctamente.`;
        this.toastType = "success";
        this.toastVisible = true;
        await this.loadProfessor();
        this.formModalVisible = false;
      } catch (error) {
        this.toastMessage = "Ocurrió un error al intentar guardar los cambios.";
        this.toastType = "error";
        this.toastVisible = true;
      }
    },
    handleCancel() {
      this.formModalVisible = false;
    },
    handleDelete(professor) {
      this.professorToDelete = professor;
      this.alertVisible = true;
    },

    handleAction(data, actionId) {
      if (actionId === 1) {
        this.openFomrEdit(data)
      } else if (actionId === 3) {
        this.handleDelete(data);
      }
    },

    async confirmDelete() {
      try {
        await axios.delete(`${API_BASE_URL}/professor/${this.professorToDelete.id}`);
        this.alertVisible = false;
        this.toastMessage = `profesor ${this.professorToDelete.name} eliminado correctamente.`;
        this.toastType = "success";
        await this.loadProfessor();
        this.toastVisible = true;
      } catch (error) {
        this.toastMessage = "Ocurrió un error al intentar eliminar al profesor.";
        this.toastType = "error";
        this.toastVisible = true;
      }
    },
    cancelDelete() {
      this.alertVisible = false;
    },

    async loadProfessor() {
      try {
        const response = await axios.get(`${API_BASE_URL}/professors`);
        const professors = response.data.filter((user) => user.roleId === 1);

        // Determina dinámicamente los encabezados en base a los datos
        this.headers = [
          { key: "name", label: "Nombre" },
          { key: "email", label: "Correo Electrónico" },
          { key: "subjectsNames", label: "Asignaturas" },
        ];

        // Transforma los datos de los profesores en el formato necesario
        this.rows = professors.map((professor) => ({
          id: professor.id,
          name: professor.name,
          email: professor.email,
          roldeId: professor.roleId,
          subjectsNames: professor.Subjects
            .map((subject) => subject.Subject.name)
            .join(", "),
          subjectsIds: professor.Subjects
            .map((subject) => subject.Subject.id),
        }));
      } catch (error) {
        console.error("Error al obtener los profesores:", error);
      }
    },
  },
};
</script>

<style scoped>
/* Estilos personalizados si es necesario */
</style>