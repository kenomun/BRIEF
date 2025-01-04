<template>
    <div class="container mx-auto p-6">
      <h1 class="text-3xl font-bold text-gray-800 text-center mb-6">Lista de Administradores</h1>
      <FormButtonComponent
        class="mt-6"
        buttonText="Crear Administrador"
        formTitle="Nuevo Administrador"
        formButtonText="Crear"
        :fields="['name', 'email']"
        :entity="{}"
        @openForm="openFormcreate"
      />
      <Table
        class="mt-6"
        :headers="['Nombre', 'Email']"
        :rows="admins"
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
        :entity="adminToEdit"
        :formTitle="formTitle"
        :formButtonText="formButtonText"
        :fields="adminFields"
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
        admins: [],
        adminToDelete: null,
        alertVisible: false,
        toastVisible: false,
        toastMessage: "",
        toastType: "success",
        formModalVisible: false,
        formTitle: "",
        formButtonText: "",
        adminToEdit: null,
        isEditing: false,
        adminFields: [
          { name: 'name', type: 'text', label: 'Nombre', placeholder: 'Nombre del administrador' },
          { name: 'email', type: 'email', label: 'Correo electrónico', placeholder: 'Email del administrador' },
        ],
      };
    },
    async created() {
      try {
        const response = await axios.get(`${API_BASE_URL}/professors`);
        this.admins = response.data.filter((user) => user.roleId === 1);
      } catch (error) {
        console.error("Error al obtener los administradores:", error);
      }
    },
    methods: {
  
      goBack() {
        this.$router.go(-1); // Esto te lleva a la vista anterior
      },
      handleFormSave(admin) {
      if (this.isEditing) {
        this.handleSave(admin);  // Llama a handleSave para editar
      } else {
        this.handleCreate(admin);  // Llama a handleCreate para crear
      }
    },
      openFomrEdit(admin) {
        this.isEditing = true; 
        this.adminToEdit = { ...admin };
        this.formTitle = "Editar Administrador";
        this.formButtonText = "Guardar Cambios";
        this.formModalVisible = true;
      },
  
      openFormcreate(data) {
        this.adminToEdit = { name: '', email: '' };
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
            roleId: 2,
          };
          const response = await axios.post(`${API_BASE_URL}/admins`, payload);
          console.log('Usuario creado:', response.data);
          await this.loadAdmins();
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
  
  
      async handleSave(updatedAdmin) {
        // Guardar los cambios realizados en el administrador
        try {
          await axios.put(`${API_BASE_URL}/admin/${updatedAdmin.id}`, {
            name: updatedAdmin.name,
            email: updatedAdmin.email,
            roleId: updatedAdmin.roleId,
          });
          const index = this.admins.findIndex((admin) => admin.id === updatedAdmin.id);
          if (index !== -1) {
            this.admins[index] = { ...updatedAdmin };
          }
          this.toastMessage = `Administrador ${updatedAdmin.name} actualizado correctamente.`;
          this.toastType = "success";
          this.toastVisible = true;
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
      handleDelete(admin) {
        this.adminToDelete = admin;
        this.alertVisible = true;
      },
      async confirmDelete() {
        try {
          await axios.delete(`${API_BASE_URL}/admin/${this.adminToDelete.id}`);
          this.admins = this.admins.filter((a) => a.id !== this.adminToDelete.id);
          this.alertVisible = false;
          this.toastMessage = `Administrador ${this.adminToDelete.name} eliminado correctamente.`;
          this.toastType = "success";
          this.toastVisible = true;
        } catch (error) {
          this.toastMessage = "Ocurrió un error al intentar eliminar al administrador.";
          this.toastType = "error";
          this.toastVisible = true;
        }
      },
      cancelDelete() {
        this.alertVisible = false;
      },
  
      async loadAdmins() {
        try {
          const response = await axios.get(`${API_BASE_URL}/admins`);
          this.admins = response.data.filter((user) => user.roleId === 2);
        } catch (error) {
          console.error("Error al obtener los administradores:", error);
        }
      }
    },
  };
  </script>
  
  <style scoped>
  /* Estilos personalizados si es necesario */
  </style>