<template>
    <div class="container mx-auto p-6">
      <h1 class="text-3xl font-bold text-gray-800 text-center mb-6">Lista de Estudiantes</h1>
      <FormButtonComponent
        class="mt-6"
        buttonText="Crear Profesor"
        formTitle="Nuevo Profesor"
        formButtonText="Crear Profesor"
        :fields="['name', 'email']"
        :entity="{}"
        @openForm="openFormCreate"
      />
      <Table
        class="mt-6"
        :headers="headers"
        :rows="rows"
        :actions="true"
        @edit="openFomrEdit"
        @delete="handleDelete"
      />
  
      <button 
      type="button"
      @click="goBack" 
      class=" mt-10 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Volver</button>
  
      <!-- Componente de Toast -->
      <Toast
        v-if="toastVisible"
        :message="toastMessage"
        :type="toastType"
        :duration="3000"
        @closed="toastVisible = false"
      />
  
      <!-- Modal de Confirmación de Eliminación -->
      <AlertModal
        v-if="alertVisible"
        :show="alertVisible"
        title="Eliminar Administrador"
        message="¿Estás seguro de que deseas eliminar este administrador? Esta acción no se puede deshacer."
        @confirm="confirmDelete"
        @cancel="cancelDelete"
      />
  
      <!-- Formulario de edición de administrador -->
      <FormComponent
        v-if="formModalVisible"
        :entity="studentToEdit"
        :formTitle="formTitle"
        :formButtonText="formButtonText"
        :fields="studentFields"
        @save="handleFormSave"
        @cancel="handleCancel"
      />
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
    name: "StudentAdminView",
    components: {
      Table,
      Toast,
      AlertModal,
      FormComponent,
      FormButtonComponent
    },
    data() {
      return {
        students: [],
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
        studentToEdit: null,
        isEditing: false,
        studentFields: [
          { name: 'name', type: 'text', label: 'Nombre', placeholder: 'Nombre del estudiante' },
          { name: 'email', type: 'email', label: 'Correo electrónico', placeholder: 'Email del estudiante' },
          { name: 'schoolName', type: 'text', label: 'colegio', placeholder: 'Colegio del estudiante' },
        ],
      };
    },
    async created() {
      try {
        const response = await axios.get(`${API_BASE_URL}/students`);
        const students = response.data.data.filter((user) => user.roleId === 3);
        
        // Determina dinámicamente los encabezados en base a los datos
        this.headers = [
          { key: "name", label: "Nombre" },
          { key: "email", label: "Correo Electrónico" },
          { key: "schoolName", label: "colegio" },
          { key: "subjectsNames", label: "asignatura" }
        ];

        // Transforma los datos de los estudiantes en el formato necesario
        this.rows = students.map((student) => ({
            id: student.id,
            name: student.name,
            email: student.email,
            roleId: student.roleId,
            schoolName: student.schoolName,
            subjectsNames: student.subjects
                .map((subject) => subject.name)
                .join(", "),
            subjectsIds: student.subjects
                .map((subject) => subject.id)
        }));
      } catch (error) {
        console.error("Error al obtener los estudiantes:", error);
      }
    },



    methods: {
  
      goBack() {
        this.$router.go(-1); // Esto te lleva a la vista anterior
      },

      getTableHeaders() {
        if (!this.student || this.student.length === 0) return [];
        
        // Obtén las claves del primer objeto para generar encabezados
        const headers = Object.keys(this.student[0]).map(key => ({
          label: this.formatHeaderLabel(key),
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


      handleFormSave(student) {
      if (this.isEditing) {
        this.handleSave(student);
      } else {
        this.handleCreate(student);
      }
    },
      openFomrEdit(student) {
        this.isEditing = true; 
        this.studentToEdit = { ...student };
        this.formTitle = "Editar Estudiante";
        this.formButtonText = "Guardar Cambios";
        this.formModalVisible = true;
      },
  
      openFormCreate(data) {
        this.studentToEdit = { name: '', email: '', schoolName: '' };
        this.isEditing = false;
        this.formTitle = data.formTitle;
        this.formButtonText = data.formButtonText;
        this.fields = data.fields;
        this.formModalVisible = true;
      },
  
      async handleCreate(createStudent) {
        try {
          const payload = {
            name: createStudent.name,
            email: createStudent.email,
            schoolName: createStudent.schoolName,
            subjectIds:[2,4,5]
          };
          const response = await axios.post(`${API_BASE_URL}/students`, payload);
          await this.loadStudent();
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
  
  
      async handleSave(updatedStudent) {
        // Guardar los cambios realizados en el administrador
        try {
          await axios.put(`${API_BASE_URL}/student/${updatedStudent.id}`, {
            name: updatedStudent.name,
            email: updatedStudent.email,
            schoolName: updatedStudent.schoolName,
            subjectIds: updatedStudent.subjectsIds,
          });
          
          this.toastMessage = `Administrador ${updatedStudent.name} actualizado correctamente.`;
          this.toastType = "success";
          this.toastVisible = true;
          await this.loadStudent();
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
      handleDelete(student) {
        this.studentToDelete = student;
        this.alertVisible = true;
      },
      async confirmDelete() {
        try {
          await axios.delete(`${API_BASE_URL}/student/${this.studentToDelete.id}`);
          this.alertVisible = false;
          this.toastMessage = `profesor ${this.studentToDelete.name} eliminado correctamente.`;
          this.toastType = "success";
          await this.loadStudent();
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
  
      async loadStudent() {
      try {
        const response = await axios.get(`${API_BASE_URL}/students`);
        const students = response.data.data.filter((user) => user.roleId === 3);
        
        // Determina dinámicamente los encabezados en base a los datos
        this.headers = [
          { key: "name", label: "Nombre" },
          { key: "email", label: "Correo Electrónico" },
          { key: "schoolName", label: "colegio" },
          { key: "subjectsNames", label: "asignatura" }
        ];

        // Transforma los datos de los estudiantes en el formato necesario
        this.rows = students.map((student) => ({
            id: student.id,
            name: student.name,
            email: student.email,
            roleId: student.roleId,
            schoolName: student.schoolName,
            subjectsNames: student.subjects
                .map((subject) => subject.name)
                .join(", "),
            subjectsIds: student.subjects
                .map((subject) => subject.id)
        }));
      } catch (error) {
        console.error("Error al obtener los estudiantes:", error);
      }
    },
    },
  };
  </script>
  
  <style scoped>
  /* Estilos personalizados si es necesario */
  </style>