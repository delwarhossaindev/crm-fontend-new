<template>
  <MainLayout>
    <div class="bg-white p-3 rounded-md">
      <div class="flex justify-between items-center mb-3">
        <h6 class="font-medium">Edit Attendance</h6>
        <button type="button" class="px-4 py-2 bg-[#000180] text-white rounded hover:bg-indigo-600"
          @click="$router.go(-1)">
          Back
        </button>
      </div>
      <hr />
      <form @submit.prevent="submitForm">
        <div class="lg:grid grid-cols-3 gap-4 items-center">
          <!-- Date -->
          <label for="date">Date <span class="text-red-600">*</span></label>
          <div class="col-span-2">
            <input
              id="date"
              type="date"
              v-model="form.date"
              :class="{ 'border-red-500': formErrors.date }"
              class="input-text w-full"
            />
            <p v-if="formErrors.date" class="text-red-500">
              {{ formErrors.date }}
            </p>
          </div>

          <!-- Employee ID -->
          <label for="employee_id"
            >Employee Name <span class="text-red-600">*</span></label
          >
          <div class="col-span-2">
            <v-select
              v-model="form.employee_id"
              :options="allEmployee"
              label="name"
              :reduce="(employee) => employee.id"
              class="common-select w-full rounded-lg"
              placeholder="Select Employee..."
            ></v-select>
            <p v-if="formErrors.employee_id" class="text-red-500">
              {{ formErrors.employee_id }}
            </p>
          </div>

          <label for="item_name">
            Location <span class="text-red-600">*</span>
          </label>
          <input
            id="location"
            type="text"
            placeholder="Enter here . . ."
            v-model="form.location "
            :class="{ 'border-red-500': formErrors.location  }"
            class="input-text col-span-2"
          />
          <p v-if="formErrors.location" class="text-red-500">
              {{ formErrors.location }}
            </p>

          <!-- Check-In Latitude & Longitude -->
          <label for="check_in_latitude">Check-In Latitude</label>
          <div class="col-span-2">
            <input
              id="check_in_latitude"
              type="number"
               step="0.00000000001"
              placeholder="Enter check-in latitude..."
              v-model="form.check_in_latitude"
              class="input-text w-full"
            />
          </div>

          <label for="check_in_longitude">Check-In Longitude</label>
          <div class="col-span-2">
            <input
              id="check_in_longitude"
              type="number"
              step="0.00000000001"
              placeholder="Enter check-in longitude..."
              v-model="form.check_in_longitude"
              class="input-text w-full"
            />
          </div>

          <!-- Check-In Time -->
          <label for="check_in_time"
            >Check-Out Time <span class="text-red-600">*</span></label
          >
          <div class="col-span-2">
            <input
              id="check_out_time"
              type="time"
              v-model="form.check_out_time"
              :class="{ 'border-red-500': formErrors.check_out_time }"
              class="input-text w-full"
            />
            <p v-if="formErrors.check_out_time" class="text-red-500">
              {{ formErrors.check_out_time }}
            </p>
          </div>

        

          <!-- Submit Button -->
          <div class="col-span-3 flex justify-end mt-3">
            <button
              type="submit"
              :disabled="loading"
              class="px-4 py-2 min-w-32 bg-[#000180] text-white rounded-lg hover:bg-indigo-600"
            >
              {{ loading ? "Submitting..." : "Submit" }}
            </button>
          </div>
        </div>
      </form>
    </div>
  </MainLayout>
</template>

<script setup>
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import MainLayout from "@/components/MainLayout.vue";
import attendance from "@/stores/attendance-api.js";
import { showNotification } from "@/utilities/notification";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useDataStore } from "@/stores/data";

const loading = ref(false);
const initialFormState = {
  date: "",
  employee_id: "",
  check_in_latitude: "",
  check_in_longitude: "",
  check_out_time: "",
  location :""
};
const form = ref({ ...initialFormState });
const formErrors = ref({});
const allEmployee = ref([]);
const route = useRoute();
const router = useRouter();
const dataStore = useDataStore();
const { getEmployees } = dataStore;

const validateForm = () => {
  const errors = {};
  if (!form.value.date) errors.date = "Date is required";
  if (!form.value.location) errors.location = "Location is required";
  if (!form.value.employee_id) errors.employee_id = "Employee ID is required";
  if (!form.value.check_out_time)
    errors.check_out_time = "Check-Out Time is required";

  formErrors.value = errors;
  return Object.keys(errors).length === 0;
};

const fetchAttendanceDetails = async () => {
  try {
    const { id } = route.params;
    const response = await attendance.showAttendance(id);
    form.value = response.data;
  } catch (error) {
    console.error("Failed to fetch attendance details:", error);
  }
};

const submitForm = async () => {
  if (!validateForm()) return;

  loading.value = true;
  try {
    const { id } = route.params;
    const response = await attendance.updateAttendance(form.value, id);

    if (response?.status === 200) {
      showNotification("success", response.data.message || "Updated successfully");
      router.push({ name: "attendance" });
    }
  }
  catch (error) {
    if (error.response) {
      showNotification("error", error.response.data.message || "Failed to update attendance");
    } else if (error.request) {
      showNotification("error", "Network error, please try again later.");
    }
  }
  finally {
    loading.value = false;
  }
};

onMounted(async () => {
  await fetchAttendanceDetails();
  allEmployee.value = await getEmployees();
});
</script>
