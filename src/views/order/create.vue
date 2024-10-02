<template>
  <MainLayout>
    <div class="bg-white p-3 rounded-md">
      <div class="flex justify-between items-center mb-3">
        <h6 class="font-medium">Create Sale Order</h6>
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
        <div class="lg:grid grid-cols-12 gap-4 items-center">

          <div class="col-span-3">
            <!-- sale_order_no -->
            <label for="sale_order_no">
              Sale Order No
            </label>
            <input
              id="sale_order_no"
              type="text"
              v-model="form.sale_order_no"
              :class="{ 'border-red-500': formErrors.sale_order_no }"
              class="input-text w-full"
              placeholder="Enter Sale Order No..."
            />
            <p v-if="formErrors.sale_order_no" class="text-red-500">
              {{ formErrors.sale_order_no }}
            </p>
          </div>

          <div class="col-span-3">
            <!-- Sale Order Date -->
            <label for="sale_order_date">
              Sale Order Date <span class="text-red-600">*</span>
            </label>
            <input
              id="sale_order_date"
              type="date"
              v-model="form.sale_order_date"
              :class="{ 'border-red-500': formErrors.sale_order_date }"
              class="input-text w-full"
              placeholder="Enter Sale Order Date..."
              required
            />
            <p v-if="formErrors.sale_order_date" class="text-red-500">
              {{ formErrors.sale_order_date }}
            </p>
          </div>

          <div class="col-span-3">
            <!-- sale_order_no -->
            <label for="client_order_no">
              Client Order No<span class="text-red-600">*</span>
            </label>
            <input
              id="client_order_no"
              type="text"
              v-model="form.client_order_no"
              :class="{ 'border-red-500': formErrors.client_order_no }"
              class="input-text w-full"
              placeholder="Enter Client Order No..."
            />
            <p v-if="formErrors.client_order_no" class="text-red-500">
              {{ formErrors.client_order_no }}
            </p>
          </div>

          <div class="col-span-3">
            <!-- Client Order Date -->
            <label for="client_order_date">
              Client Order Date <span class="text-red-600">*</span>
            </label>
            <input
              id="client_order_date"
              type="date"
              v-model="form.client_order_date"
              :class="{ 'border-red-500': formErrors.client_order_date }"
              class="input-text w-full"
              placeholder="Enter Client Order Date..."
              required
            />
            <p v-if="formErrors.client_order_date" class="text-red-500">
              {{ formErrors.client_order_date }}
            </p>
          </div>

          <div class="col-span-12">
            <!-- Sale Order Subject -->
            <label for="sale_order_subject">
              Sale Order Subject<span class="text-red-600">*</span>
            </label>
            <input
              id="sale_order_subject"
              type="text"
              v-model="form.sale_order_subject"
              :class="{ 'border-red-500': formErrors.sale_order_subject }"
              class="input-text w-full"
              placeholder="Enter Sale Order Subject..."
            />
            <p v-if="formErrors.sale_order_subject" class="text-red-500">
              {{ formErrors.sale_order_subject }}
            </p>
          </div>

          <div class="col-span-4">
            <!-- Prospect -->
            <label for="prospect_id">Prospect Name<span class="text-red-600">*</span></label>
            <v-select
              v-model="form.prospect_id"
              :options="allProspects"
              label="name"
              :reduce="(prospect) => prospect.id"
              class="common-select w-full rounded-lg"
              placeholder="Select prospect..."
            ></v-select>
          </div>

          <div class="col-span-4">
            <label for="prospect_id">Lead Name</label>
              <!-- Lead -->
              <label for="lead_id">Lead</label>
            <v-select
              v-model="form.lead_id"
              :options="allLeads"
              label="lead_name"
              :reduce="(lead) => lead.id"
              class="common-select w-full rounded-lg"
              placeholder="Select lead..."
            ></v-select>
          </div>

          <div class="col-span-4">
            <!-- Quotation No -->
            <label for="quotation_id">Quotation No</label>
            <v-select
              v-model="form.quotation_id"
              :options="allQuotations"
              label="quotation_number"
              :reduce="(quotation) => quotation.id"
              class="common-select w-full rounded-lg"
              placeholder="Select quotation..."
            ></v-select>
          </div>

          <div class="col-span-12">
            <!-- Attention Person -->
            <label for="company_attention_person">Company Attention Person</label>
            <input
              id="company_attention_person"
              type="text"
              v-model="form.company_attention_person"
              class="input-text w-full"
              placeholder="Enter Attention Person..."
            />
          </div>

          <div class="col-span-6">
            <!-- Phone -->
            <label for="phone">Phone</label>
            <input
              id="phone"
              type="text"
              v-model="form.phone"
              class="input-text w-full"
              placeholder="Enter Phone..."
            />
          </div>

          <div class="col-span-6">
            <!-- email_address -->
            <label for="email_address">Email Address</label>
            <input
              id="email_address"
              type="text"
              v-model="form.email_address"
              class="input-text w-full"
              placeholder="Enter Phone..."
            />
          </div>

          <div class="col-span-6">
            <!-- Designation -->
            <label for="designation">Designation</label>
            <input
              id="designation"
              type="text"
              v-model="form.designation"
              class="input-text w-full"
              placeholder="Enter Designation..."
            />
          </div>

          <div class="col-span-6">
            <!-- department -->
            <label for="department">Department</label>
            <input
              id="department"
              type="text"
              v-model="form.department"
              class="input-text w-full"
              placeholder="Enter Department..."
            />
          </div>

          <div class="col-span-8">
            <label for="items">Order Item</label>
            <v-select
              id="items"
              v-model="form.items"
              :options="allItems"
              label="item_name"
              multiple
              class="input-text w-full"
              placeholder="Select Supplier Items..."
            ></v-select>
          </div>

          <div class="col-span-4">
            <!-- ordered_amount -->
            <label for="ordered_amount">Ordered Amount</label>
            <input
              id="ordered_amount"
              type="number"
              v-model="form.ordered_amount"
              class="input-text w-full"
              placeholder="Enter ordered_amount..."
            />
          </div>

          <div class="col-span-8">
            <!--Key Account Person -->
            <label for="key_account_person_id">Key Account Person</label>
            <input
              id="key_account_person_id"
              type="text"
              v-model="form.key_account_person_id"
              class="input-text w-full"
              placeholder="Enter Key Account Person..."
            />
          </div>

          <div class="col-span-4">
            <!--Delivered Status -->
            <label for="delivered_status">Delivered Status</label>
            <select
              v-model="form.delivered_status"
              id="delivered_status"
              class="common-select w-full rounded-lg"
            >
              <option value="1">Delivered</option>
              <option value="0">Not Delivered </option>
            </select>
          </div>

          <div class="col-span-12">
            <textarea
              id="sale_order_description"
              v-model="form.sale_order_description"
              class="input-text w-full"
              placeholder="Enter Sale Order Description..."
            ></textarea>
          </div>

          <div class="col-span-12">
            <!-- Attachments -->
            <label for="attachment">Attachments Doc/Media</label>
            <input
              id="attachment"
              type="file"
              @change="handleFileUpload"
              class="input-text w-full"
            />
          </div>

          <!-- Submit Button -->
          <div class="col-span-12 flex justify-end mt-3">
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
import order from "@/stores/order-api.js";
import { showNotification } from "@/utilities/notification";
import { useDataStore } from "@/stores/data";

// Initial form state
const initialFormState = {
  sale_order_no: "",
  sale_order_date: "",
  client_order_no: "",
  client_order_date: "",
  sale_order_subject: "",
  prospect_id: "",
  lead_id: "",
  prospect_id: "",
  quotation_id: "",
  company_attention_person_id: "",
  phone: "",
  items:[],
  email_address: "", 
  designation: "",
  ordered_amount: "",
  key_account_person_id: "",
  delivered_status: "", 
  sale_order_description: "",
  attachment: null, // Store attachment file(s)
};

const loading = ref(false);
const form = ref({ ...initialFormState });
const formErrors = ref({});
const allProspects = ref([]);
const allLeads = ref([]);
const allQuotations = ref([]);
const allItems = ref([]);

const router = useRouter();
const {getProspects, getLeads, getQuotations, getItems} =
  useDataStore();

// Form validation
const validateForm = () => {
  formErrors.value = {};

  if (!form.value.sale_order_no)
    formErrors.value.sale_order_no = "Sale Order No is required.";
  if (!form.value.sale_order_date)
    formErrors.value.sale_order_date = "Sale Order Date is required.";
  if (!form.value.client_order_no)
    formErrors.value.client_order_no = "Client Order No is required.";
  if (!form.value.client_order_date)
    formErrors.value.client_order_date = "Client Order Date is required.";
  if (!form.value.sale_order_subject)
    formErrors.value.sale_order_subject = "Sale Order Subject is required.";
  if (!form.value.prospect_id)
    formErrors.value.prospect_id = "Prospect Name is required.";

  return Object.keys(formErrors.value).length === 0;
};

// Handle file upload
const handleFileUpload = (event) => {
  form.value.attachment = event.target.files[0]; // Store the file in the form
};

// Fetching data on mount
onMounted(() => {
  getProspects().then((res) => (allProspects.value = res));
  getLeads().then((res) => (allLeads.value = res));
  getQuotations().then((res) => (allQuotations.value = res));
  getItems().then((res) => (allItems.value = res));
});

// Submitting the form
const submitForm = async () => {
  if (!validateForm()) return;

  const formData = new FormData();
  formData.append("sale_order_no", form.value.sale_order_no);
  formData.append("sale_order_date", form.value.sale_order_date);
  formData.append("client_order_no", form.value.client_order_no);
  formData.append("client_order_date", form.value.client_order_date);
  formData.append("sale_order_subject", form.value.sale_order_subject);
  formData.append("prospect_id", form.value.prospect_id);
  formData.append("lead_id", form.value.lead_id);
  formData.append("quotation_id", form.value.quotation_id);
  formData.append("company_attention_person", form.value.company_attention_person);
  formData.append("phone", form.value.phone);
  formData.append("email_address", form.value.email_address);
  formData.append("designation", form.value.designation);
  formData.append("ordered_amount", form.value.ordered_amount);
  formData.append("key_account_person_id", form.value.key_account_person_id);
  formData.append("delivered_status", form.value.delivered_status);
  formData.append("sale_order_description", form.value.sale_order_description);

  if (form.value.attachment) {
    formData.append("attachment", form.value.attachment); // Append attachment if exists
  }

   // If there are items
   form.value.items.forEach((item, index) => {
    // Append each item to formData with a unique key
    formData.append(`items[${index}]`, JSON.stringify(item)); // Corrected here
  });


  loading.value = true;
  try {
    await order.insertOrder(formData); // Assuming insertLead is the API call
    showNotification("success", "Sale Order created successfully!");
    router.push("/order"); // Navigate back to the order list
  } catch (error) {
    showNotification("error", "Error creating order.");
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
