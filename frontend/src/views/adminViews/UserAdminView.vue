<template>
  <div class="container mx-auto p-6">
    <h1 class="text-3xl font-bold text-gray-800 text-center mb-6">Lista de Administradores</h1>
    <FormButtonComponent
      class="mt-6"
      buttonText="Crear Administrador"
      formTitle="Nuevo Administrador"
      formButtonText="Crear administrador"
      :fields="['name', 'email']"
      :entity="{}"
      @openForm="openFormCreate"
    />
    <Table
      class="mt-6"
      :headers="headers"
      :rows="rows"
      :actions="true"
      :actionType="'edit'"
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
      adminToEdit: null,
      isEditing: false,
      adminFields: [
      { name: 'name', type: 'text', label: 'Nombre', placeholder: 'Nombre del administrador' },
      { name: 'email', type: 'email', label: 'Correo Electrónico', placeholder: 'Correo electrónico' }
    ],
    };
  },
 
  async created() {
      try {
        const response = await axios.get(`${API_BASE_URL}/admins`);
        const admins = response.data.filter((user) => user.roleId === 2);

        // Determina dinámicamente los encabezados en base a los datos
        this.headers = [
          { key: "name", label: "Nombre" },
          { key: "email", label: "Correo Electrónico" },
        ];

        // Transforma los datos de los profesores en el formato necesario
        this.rows = admins.map((admin) => ({
          id: admin.id,
          name: admin.name,
          email: admin.email,
          roleId: admin.roleId
        }));
      } catch (error) {
        console.error("Error al obtener los administadores:", error);
      }
    },
  methods: {

    goBack() {
      this.$router.go(-1); // Esto te lleva a la vista anterior
    },

    getTableHeaders() {
        if (!this.admins || this.admins.length === 0) return [];
        
        // Obtén las claves del primer objeto para generar encabezados
        const headers = Object.keys(this.admins[0]).map(key => ({
          label: this.formatHeaderLabel(key), // Formatear etiquetas (opcional)
          key: key
        }));

        // Agrega las columnas de acción si es necesario
        if (this.actions) {
          headers.push({ label: "Acciones", key: "actions" });
        }
        return headers;
      },


    handleFormSave(admin) {
    if (this.isEditing) {
      this.handleSave(admin);
    } else {
      this.handleCreate(admin);
    }
  },
    openFomrEdit(admin) {
      this.isEditing = true; 
      this.adminToEdit = { ...admin };
      this.formTitle = "Editar Administrador";
      this.formButtonText = "Guardar Cambios";
      this.formModalVisible = true;
    },

    openFormCreate(data) {
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
        const response = await axios.put(`${API_BASE_URL}/admin/${updatedAdmin.id}`, {
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
        await this.loadAdmins();
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
        await this.loadAdmins();
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
        const admins = response.data.filter((user) => user.roleId === 2);

        // Determina dinámicamente los encabezados en base a los datos
        this.headers = [
          { key: "name", label: "Nombre" },
          { key: "email", label: "Correo Electrónico" },
        ];

        // Transforma los datos de los profesores en el formato necesario
        this.rows = admins.map((admin) => ({
          id: admin.id,
          name: admin.name,
          email: admin.email,
        }));
      } catch (error) {
        console.error("Error al obtener los administadores:", error);
      }
    },
  },
};
</script>

<style scoped>
/* Estilos personalizados si es necesario */
</style>


