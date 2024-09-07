<template>
  <MainLayout>
    <div class="bg-white p-3 rounded-md">
      <div class="flex justify-between items-center mb-3">
        <h6 class="font-medium">Create New Zone</h6>
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
        <div class="lg:grid grid-cols-3 gap-4 items-center">
          <!-- Zone Name -->
          <label for="name">Zone Name <span class="text-red-600">*</span></label>
          <input
            id="name"
            type="text"
            placeholder="Enter here . . ."
            v-model="form.name"
            :class="{ 'border-red-500': formErrors.name }"
            class="input-text col-span-2"
          />

          <!-- Status -->
          <label for="status">Status</label>
          <select
            v-model="form.status"
            id="status"
            class="common-select col-span-2 rounded-lg"
          >
            <option value="1">Active</option>
            <option value="0">Inactive</option>
          </select>

          <!-- Submit Button -->
          <div class="col-span-3 flex justify-end mt-3">
            <button
              type="submit"
              :disabled="loading"
              class="px-4 py-2 min-w-32 bg-[#000180] text-white rounded-lg"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  </MainLayout>
</template>

<script setup>
import MainLayout from "@/components/MainLayout.vue";
import zone from "@/stores/setting/zone_api.js";
import { showNotification } from "@/utilities/notification";
import { ref } from "vue";
import { useRouter } from "vue-router";

// Form state and errors
const loading = ref(false);
const form = ref({ name: "", status: "1" });
const formErrors = ref({});

// Validate form fields
function validateForm() {
  const errors = {};
  if (!form.value.name) errors.name = "Zone Name is required";
  formErrors.value = errors;
  return !Object.keys(errors).length;
}

// Router setup
const router = useRouter();

// Submit form function
const submitForm = async () => {
  if (validateForm()) {
    loading.value = true;
    try {
      const response = await zone.insertZone(form.value);
      if (response?.status === 201) {
        showNotification("success", response.data.message || "Successfully inserted");
        router.push({ name: "zone" });
      }
    } catch (error) {
      showNotification(
        "error",
        error.response?.data?.message || error.request ? "Network error, please try again later." : "Failed to insert zone"
      );
    } finally {
      loading.value = false;
    }
  }
};
</script>
