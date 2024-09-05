<template>
  <MainLayout>
    <div class="bg-white p-3 rounded-md">
      <div class="flex justify-between items-center mb-3">
        <h6 class="font-medium">Edit Zone</h6>
        <button type="button" class="px-4 py-2 bg-[#000180] text-white rounded hover:bg-indigo-600"
          @click="$router.go(-1)">
          Back
        </button>
      </div>
      <hr />
      <form @submit.prevent="submitForm">
        <div class="lg:grid grid-cols-3 gap-4 items-center mt-3">
          <label for="name">Name <span class="text-red-600">*</span></label>
          <input id="name" type="text" placeholder="Enter here . . ." v-model="form.name"
            :class="{ 'border-red-500': formErrors.name }" class="input-text col-span-2" />
          <div class="col-span-3 flex justify-end mt-3">
            <button type="submit" :disabled="loading"
              class="px-4 py-2 min-w-32 bg-[#000180] text-white rounded-lg hover:bg-indigo-600">
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
import zone from "@/stores/setting/zone_api.js";
import { showNotification } from "@/utilities/notification";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const loading = ref(false);
const form = ref({ name: "" });
const formErrors = ref({});
const route = useRoute();

const validateForm = () => {
  const errors = {};
  if (!form.value.name) errors.name = "Zone Name is required";
  formErrors.value = errors;
  return !Object.keys(errors).length;
};

const fetchZoneDetails = async () => {
  try {
    const { id } = route.params;
    const response = await zone.showZone(id);
    form.value = response.data;
  } catch (error) {
    console.error("Failed to fetch zone details:", error);
  }
};

const submitForm = async () => {
  if (!validateForm()) return;

  loading.value = true;
  try {
    const { id } = route.params;
    const response = await zone.updateZone(form.value, id);

    // Check if the response status indicates success
    if (response?.status === 200) {
      showNotification("success", response.data.message || "Updated successfully");
      route.push({ name: "zone" });
    }
  }
  catch (error) {

    if (error.response) {

      showNotification("error", error.response.data.message || "Failed to update zone");
    } else if (error.request) {

      showNotification("error", "Network error, please try again later.");
    }
  }
  finally {
    loading.value = false;
  }
};


onMounted(fetchZoneDetails);
</script>
