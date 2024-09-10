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
          <label for="quotation_number">Quotation Number <span class="text-red-600">*</span></label>
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

          <label for="quotation_date">Quotation Date <span class="text-red-600">*</span></label>
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

          <label for="quoted_amount">Quoted Amount <span class="text-red-600">*</span></label>
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

          <label for="lead_id">Lead</label>
          <div class="col-span-2">
            <v-select
              v-model="form.lead_id"
              :options="allLeads"
              label="name"
              :reduce="(lead) => lead.id"
              class="common-select w-full rounded-lg"
              placeholder="Select lead..."
            ></v-select>
          </div>

          <label for="attention_person">Attention Person</label>
          <input
            id="attention_person"
            type="text"
            v-model="form.attention_person"
            class="input-text col-span-2"
            placeholder="Enter person name..."
          />

          <label for="designation">Designation</label>
          <input
            id="designation"
            type="text"
            v-model="form.designation"
            class="input-text col-span-2"
            placeholder="Enter designation..."
          />

          <label for="department">Department</label>
          <input
            id="department"
            type="text"
            v-model="form.department"
            class="input-text col-span-2"
            placeholder="Enter department..."
          />

          <label for="phone">Phone</label>
          <input
            id="phone"
            type="text"
            v-model="form.phone"
            class="input-text col-span-2"
            placeholder="Enter phone number..."
          />

          <label for="email">Email</label>
          <input
            id="email"
            type="email"
            v-model="form.email"
            class="input-text col-span-2"
            placeholder="Enter email..."
          />

          <label for="quotation_items">Quotation Items</label>
          <div class="col-span-2">
            <textarea
              id="quotation_items"
              v-model="form.quotation_items"
              class="input-text w-full"
              placeholder="Enter item details..."
            ></textarea>
          </div>

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

const loading = ref(false);
const form = ref({
  quotation_number: "",
  quotation_date: "",
  quotation_subject: "",
  quoted_amount: "",
  prospect_id: "",
  lead_id: "",
  attention_person: "",
  designation: "",
  department: "",
  phone: "",
  email: "",
  quotation_items: [],
});

const formErrors = ref({});
const allProspects = ref([]);
const allLeads = ref([]);
const router = useRouter();
const { getEmployees } = useDataStore();

const validateForm = () => {
  formErrors.value = {};
  if (!form.value.quotation_number) formErrors.value.quotation_number = "Quotation number is required.";
  if (!form.value.quotation_date) formErrors.value.quotation_date = "Quotation date is required.";
  if (!form.value.quoted_amount) formErrors.value.quoted_amount = "Quoted amount is required.";
  return !Object.keys(formErrors.value).length;
};

const submitForm = async () => {
  if (!validateForm()) return;
  loading.value = true;
  try {
    const response = await quotation.insertQuotation(form.value);
    if (response?.status === 201) {
      showNotification("success", response?.data?.message || "Quotation successfully created.");
      form.value = { ...initialFormState }; // Reset form
      router.push({ name: "quotation" });
    }
  } catch (error) {
    showNotification("error", error.response?.data?.message || "Failed to create quotation.");
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  const allEmployee = await getEmployees();
  // Fetch allProspects and allLeads
});
</script>
