<template>
  <MainLayout>
    <div class="bg-white p-3 rounded-md">
      <div class="flex justify-between items-center mb-3">
        <h6 class="font-medium">Edit Industry Type</h6>
        <button type="button" class="px-4 py-2 bg-[#000180] text-white rounded hover:bg-indigo-600"
          @click="$router.go(-1)">
          Back
        </button>
      </div>
      <hr />
      <form @submit.prevent="submitForm">
        <div class="lg:grid grid-cols-3 gap-4 items-center mt-3">
          <!-- Name Field -->
          <label for="name">Name <span class="text-red-600">*</span></label>
          <div class="col-span-2">
            <input id="name" type="text" placeholder="Enter here . . ." v-model="form.name"
              :class="{ 'border-red-500': formErrors.name }" class="input-text w-full" />
            <p v-if="formErrors.name" class="text-red-500">{{ formErrors.name }}</p>
          </div>

          <!-- Status Field -->
          <label for="status">Status</label>
          <div class="col-span-2">
            <select 
              v-model="form.status" 
              id="status" 
              :class="{ 'border-red-500': formErrors.status }" 
              class="common-select rounded-lg w-full">
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>
            <p v-if="formErrors.status" class="text-red-500">{{ formErrors.status }}</p>
          </div>

          <!-- Submit Button -->
          <div class="col-span-3 flex justify-end mt-3">
            <button type="submit" :disabled="loading"
              class="px-4 py-2 min-w-32 bg-[#000180] text-white rounded-lg hover:bg-indigo-600">
              {{ loading ? 'Updating...' : 'Update' }}
            </button>
          </div>
        </div>
      </form>
    </div>
  </MainLayout>
</template>

<script setup>
import MainLayout from "@/components/MainLayout.vue";
import industryType from "@/stores/setting/industry_type_api.js";
import { showNotification } from "@/utilities/notification";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const loading = ref(false);
const form = ref({ name: "", status: 1 });
const formErrors = ref({});
const route = useRoute();
const router = useRouter();

const validateForm = () => {
  const errors = {};
  if (!form.value.name) errors.name = "Organization type name is required";
  formErrors.value = errors;
  return !Object.keys(errors).length;
};

const fetchIndustryTypeDetails = async () => {
  try {
    const { id } = route.params;
    const response = await industryType.showIndustryType(id);
    form.value = response.data;
  } catch (error) {
    console.error("Failed to fetch industry type details:", error);
  }
};

const submitForm = async () => {
  if (!validateForm()) return;

  loading.value = true;
  try {
    const { id } = route.params;
    const response = await industryType.updateIndustryType(form.value, id);

    if (response?.status === 200) {
      showNotification("success", response.data.message || "Updated successfully");
      router.push({ name: "industry-type" });
    }
  }
  catch (error) {
    if (error.response) {
      showNotification("error", error.response.data.message || "Failed to update industry type");
    } else if (error.request) {
      showNotification("error", "Network error, please try again later.");
    }
  }
  finally {
    loading.value = false;
  }
};

onMounted(fetchIndustryTypeDetails);
</script>
