<template>
  <MainLayout>
    <div class="bg-white p-3 rounded-md">
      <div class="flex justify-between items-center mb-3">
        <h6 class="font-medium">Edit Designation</h6>
        <button
          type="button"
          class="px-4 py-2 bg-[#000180] text-white rounded hover:bg-indigo-600"
          @click="$router.go(-1)"
        >
          Back
        </button>
      </div>
      <hr />
      <form @submit.prevent="submitForm">
        <div class="lg:grid grid-cols-3 gap-4 items-center mt-3">
          <label for="name">Name <span class="text-red-600">*</span></label>
          <input
            id="name"
            type="text"
            placeholder="Enter here . . ."
            v-model="form.name"
            :class="inputClass(formErrors.name)"
            class="input-text col-span-2"
          />

           <!-- Status -->
           <label for="status">Status</label>
           <select 
             v-model="form.status" 
             id="status" 
             class="common-select col-span-2 rounded-lg">
             <option value="1">Active</option>
             <option value="0">Inactive</option>
           </select>
 

          <div class="col-span-3 flex justify-end mt-3">
            <button
              type="submit"
              :disabled="loading"
              class="px-4 py-2 min-w-32 bg-[#000180] text-white rounded-lg hover:bg-indigo-600"
            >
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  </MainLayout>
</template>

<script setup>
import MainLayout from "@/components/MainLayout.vue";
import designation from "@/stores/setting/designation-api.js";
import { showNotification } from "@/utilities/notification";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

// State variables
const loading = ref(false);
const form = ref({ name: "", status: 1 });
const formErrors = ref({});

// Vue Router instance
const route = useRoute();
const router = useRouter();

// Input field validation
const validateForm = () => {
  const errors = {};
  if (!form.value.name) errors.name = "Designation Name is required";
  formErrors.value = errors;
  return !Object.keys(errors).length;
};

// Fetch Designation Details
const fetchDesignationDetails = async () => {
  try {
    const { id } = route.params;
    const response = await designation.showDesignation(id);
    form.value = response.data; // Populate the form with fetched data
  } catch (error) {
    console.error("Failed to fetch designation details:", error);
  }
};

// Handle form submission
const submitForm = async () => {
  if (!validateForm()) return;

  loading.value = true;
  try {
    const { id } = route.params;
    const response = await designation.updateDesignation(form.value, id);

    if (response?.status === 200) {
      showNotification("success", response.data.message || "Updated successfully");
      router.push({ name: "designation" });
    }
  } catch (error) {
    const errorMsg =
      error.response?.data.message || "Failed to update designation";
    showNotification("error", errorMsg);
  } finally {
    loading.value = false;
  }
};

// Utility function for input field classes
const inputClass = (error) => (error ? "border-red-500" : "");

// Fetch designation details when the component is mounted
onMounted(fetchDesignationDetails);
</script>
