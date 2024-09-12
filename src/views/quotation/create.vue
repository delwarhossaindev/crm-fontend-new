<template>
  <MainLayout>
    <div class="bg-white p-3 rounded-md">
      <div class="flex justify-between items-center mb-3">
        <h6 class="font-medium">Create New Quotation</h6>
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
          <!-- Quotation Number -->
          <label for="quotation_number">
            Quotation Number <span class="text-red-600">*</span>
          </label>
          <div class="col-span-2">
            <input
              id="quotation_number"
              type="text"
              v-model="form.quotation_number"
              :class="{ 'border-red-500': formErrors.quotation_number }"
              class="input-text w-full"
              placeholder="Enter quotation number..."
            />
            <p v-if="formErrors.quotation_number" class="text-red-500">
              {{ formErrors.quotation_number }}
            </p>
          </div>

          <!-- Quotation Date -->
          <label for="quotation_date">
            Quotation Date <span class="text-red-600">*</span>
          </label>
          <div class="col-span-2">
            <input
              id="quotation_date"
              type="date"
              v-model="form.quotation_date"
              :class="{ 'border-red-500': formErrors.quotation_date }"
              class="input-text w-full"
            />
            <p v-if="formErrors.quotation_date" class="text-red-500">
              {{ formErrors.quotation_date }}
            </p>
          </div>

          <!-- Quotation Subject -->
          <label for="quotation_subject">Quotation Subject</label>
          <div class="col-span-2">
            <input
              id="quotation_subject"
              type="text"
              v-model="form.quotation_subject"
              class="input-text w-full"
              placeholder="Enter subject..."
            />
          </div>

          <!-- Quoted Amount -->
          <label for="quoted_amount">
            Quoted Amount <span class="text-red-600">*</span>
          </label>
          <div class="col-span-2">
            <input
              id="quoted_amount"
              type="number"
              v-model="form.quoted_amount"
              :class="{ 'border-red-500': formErrors.quoted_amount }"
              class="input-text w-full"
              placeholder="Enter amount..."
            />
            <p v-if="formErrors.quoted_amount" class="text-red-500">
              {{ formErrors.quoted_amount }}
            </p>
          </div>

          <!-- Prospect -->
          <label for="prospect_id">Prospect</label>
          <div class="col-span-2">
            <v-select
              v-model="form.prospect_id"
              :options="allProspects"
              label="name"
              :reduce="(prospect) => prospect.id"
              class="common-select w-full rounded-lg"
              placeholder="Select prospect..."
            ></v-select>
          </div>

          <!-- Lead -->
          <label for="lead_id">Lead</label>
          <div class="col-span-2">
            <v-select
              v-model="form.lead_id"
              :options="allLeads"
              label="lead_name"
              :reduce="(lead) => lead.id"
              class="common-select w-full rounded-lg"
              placeholder="Select lead..."
            ></v-select>
          </div>

          <!-- Attention Person -->
          <label for="attention_person">Attention Person</label>
          <input
            id="attention_person"
            type="text"
            v-model="form.attention_person"
            class="input-text col-span-2"
            placeholder="Enter person name..."
          />

          <!-- Designation -->
          <label for="designation">Designation</label>
          <div class="col-span-2">
            <v-select
              v-model="form.designation"
              :options="allDesignations"
              label="name"
              :reduce="(designation) => designation.id"
              class="common-select w-full rounded-lg"
              placeholder="Select designation..."
            ></v-select>
          </div>

          <!-- Department -->
          <label for="department">Department</label>
          <div class="col-span-2">
            <v-select
              v-model="form.department"
              :options="allDepartments"
              label="name"
              :reduce="(department) => department.id"
              class="common-select w-full rounded-lg"
              placeholder="Select department..."
            ></v-select>
          </div>

          <!-- Phone -->
          <label for="phone">Phone</label>
          <input
            id="phone"
            type="text"
            v-model="form.phone"
            class="input-text col-span-2"
            placeholder="Enter phone number..."
          />

          <!-- Email -->
          <label for="email">Email</label>
          <input
            id="email"
            type="email"
            v-model="form.email"
            class="input-text col-span-2"
            placeholder="Enter email..."
          />

          <!-- Quotation Items -->
          <label for="quotation_items">Quotation Items</label>
          <div class="col-span-2">
            <v-select
              id="quotation_items"
              v-model="form.quotation_items"
              :options="allItems"
              label="item_name"
              multiple
              class="input-text w-full"
              placeholder="Select quotation items..."
            ></v-select>
          </div>

          <!-- Quotation Not Sent -->
          <label for="quotation_sent">Quotation Sent Status</label>
          <div class="col-span-2">
            <select
              v-model="form.quotation_sent"
              id="quotation_sent_status"
              class="common-select w-full rounded-lg"
            >
              <option value="1">Sent</option>
              <option value="0">Not Sent</option>
            </select>
          </div>

          <label for="quotation_description">Quotation Description</label>
          <div class="col-span-2">
            <textarea
              id="quotation_description"
              v-model="form.quotation_description"
              class="input-text w-full"
              placeholder="Enter item details..."
            ></textarea>
          </div>

          <label for="attachments">Attachments</label>
          <div class="col-span-2">
          <input
            id="attachments"
            type="file"
            @change="handleFileUpload"
            class="input-text w-full"
          />
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
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import MainLayout from "@/components/MainLayout.vue";
import quotation from "@/stores/quotation-api.js";
import { showNotification } from "@/utilities/notification";
import { useDataStore } from "@/stores/data";

// Initial form state
const initialFormState = {
  quotation_number: "",
  quotation_date: "",
  quotation_subject: "",
  quoted_amount: "",
  prospect_id: null,
  lead_id: null,
  attention_person: "",
  designation: null,
  department: null,
  phone: "",
  email: "",
  quotation_sent: "1",  // Set default value for Quotation Sent
  quotation_description: "",
  quotation_items: [],
  attachments: null,  // Store attachment file(s)
};

const loading = ref(false);
const form = ref({ ...initialFormState });
const formErrors = ref({});
const allProspects = ref([]);
const allLeads = ref([]);
const allDesignations = ref([]);
const allDepartments = ref([]);
const allItems = ref([]);

const router = useRouter();
const {
  getItems,
  getDepartment,
  getDesignation,
  getProspects,
  getLeads,
} = useDataStore();

// Form validation
const validateForm = () => {
  formErrors.value = {};
  if (!form.value.quotation_number)
    formErrors.value.quotation_number = "Quotation number is required.";
  if (!form.value.quotation_date)
    formErrors.value.quotation_date = "Quotation date is required.";
  if (!form.value.quoted_amount)
    formErrors.value.quoted_amount = "Quoted amount is required.";

  return Object.keys(formErrors.value).length === 0;
};

// Handle file upload
const handleFileUpload = (event) => {
  form.value.attachments = event.target.files[0]; // Store the file in the form
};

// Fetching data on mount
onMounted(() => {
  getProspects().then((res) => (allProspects.value = res));
  getLeads().then((res) => (allLeads.value = res));
  getDesignation().then((res) => (allDesignations.value = res));
  getDepartment().then((res) => (allDepartments.value = res));
  getItems().then((res) => (allItems.value = res));
});

// Submitting the form
const submitForm = async () => {
  if (!validateForm()) return;

  const formData = new FormData();
  formData.append("quotation_number", form.value.quotation_number);
  formData.append("quotation_date", form.value.quotation_date);
  formData.append("quotation_subject", form.value.quotation_subject);
  formData.append("quoted_amount", form.value.quoted_amount);
  formData.append("prospect_id", form.value.prospect_id);
  formData.append("lead_id", form.value.lead_id);
  formData.append("attention_person", form.value.attention_person);
  formData.append("designation", form.value.designation);
  formData.append("department", form.value.department);
  formData.append("phone", form.value.phone);
  formData.append("email", form.value.email);
  formData.append("quotation_sent", form.value.quotation_sent);
  formData.append("quotation_description", form.value.quotation_description);

  // If there are quotation items
form.value.quotation_items.forEach((item, index) => {
  // Convert each item to a JSON string before appending
  formData.append(`quotation_items[${index}]`, JSON.stringify(item));
});
  // Append the file if it exists
  if (form.value.attachments) {
    formData.append("attachments", form.value.attachments);
  }

  loading.value = true;
  try {
    await quotation.insertQuotation(formData);  // Send form data as FormData
    showNotification("success", "Quotation created successfully!");
    router.push("/quotation");
  } catch (error) {
    if (error.response && error.response.data.errors) {
      formErrors.value = error.response.data.errors;
    }
    showNotification("error", "Failed to create quotation.");
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.input-text {
  border: 1px solid #d1d5db;
  border-radius: 6px;
  padding: 8px 12px;
}
.common-select {
  border: 1px solid #d1d5db;
}
</style>
