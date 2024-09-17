<template>
  <MainLayout>
    <div class="bg-white p-3 rounded-md">
      <div class="flex justify-between items-center mb-3">
        <h6 class="font-medium">Create New Quotation Item Wise</h6>
        <button type="button" class="px-4 py-2 bg-[#000180] text-white rounded hover:bg-indigo-600"
          @click="$router.go(-1)">
          Back
        </button>
      </div>
      <hr />
      <form @submit.prevent="submitForm">
        <div class="lg:grid grid-cols-12 gap-4 items-center">
          <!-- Quotation Number -->
          <div class="col-span-6">
            <!-- Occupy 6 columns -->
            <label for="quotation_number" class="block">
              Quotation Number <span class="text-red-600">*</span>
            </label>
            <input id="quotation_number" type="text" v-model="form.quotation_number"
              :class="{ 'border-red-500': formErrors.quotation_number }" class="input-text w-full"
              placeholder="Enter quotation number..." />
            <p v-if="formErrors.quotation_number" class="text-red-500">
              {{ formErrors.quotation_number }}
            </p>
          </div>

          <!-- Lead -->
          <div class="col-span-6">
            <label for="lead_id">Lead</label>
            <v-select v-model="form.lead_id" :options="allLeads" label="lead_name" :reduce="(lead) => lead.id"
              class="common-select w-full rounded-lg" placeholder="Select lead..."></v-select>
          </div>

          <!-- Quotation Subject -->
          <div class="col-span-6">
            <label for="quotation_subject">Quotation Subject</label>
            <input id="quotation_subject" type="text" v-model="form.quotation_subject" class="input-text w-full"
              placeholder="Enter subject..." />
          </div>

          <!-- Attention Person -->
          <div class="col-span-6">
            <label for="attention_person">Attention Person</label>
            <input id="attention_person" type="text" v-model="form.attention_person" class="input-text col-span-2"
              placeholder="Enter person name..." />
          </div>
          <div class="col-span-6">
            <label for="email">Email Address</label>
            <input id="email" type="email" v-model="form.email" class="input-text col-span-2"
              placeholder="Enter email..." />
          </div>

          <div class="col-span-6">
            <label for="designation">Designation</label>
            <v-select v-model="form.designation" :options="allDesignations" label="name"
              :reduce="(designation) => designation.id" class="common-select w-full rounded-lg"
              placeholder="Select designation..."></v-select>
          </div>

          <div class="col-span-12">
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table
                class="min-w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border-collapse border border-gray-200">
                <thead class="text-xs text-white uppercase bg-black dark:bg-black dark:text-white">
                  <tr>
                    <th scope="col" class="px-2 py-2 w-1/12">SL</th>
                    <th scope="col" class="px-2 py-2 w-2/12">Item #</th>
                    <th scope="col" class="px-2 py-2 w-2/12">Description</th>
                    <th scope="col" class="px-2 py-2 w-2/12">Model</th>
                    <th scope="col" class="px-2 py-2 w-1/12">Qty</th>
                    <th scope="col" class="px-2 py-2 w-1/12">U. Price</th>
                    <th scope="col" class="px-2 py-2 w-2/12">Line Total</th>
                    <th scope="col" class="px-2 py-2 w-1/12">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in form.quotation_items" :key="index">
                    <td class="px-2 py-2">{{ index + 1 }}</td>
                    <td class="px-2 py-2">
                      <v-select v-model="item.id" :options="allItems" :reduce="(itemData) => itemData.id"
                        label="item_name" @update:modelValue="onItemSelect(index, $event)" class="input-text w-full"
                        placeholder="Select item..."></v-select>
                    </td>
                    <td class="px-2 py-2">
                      <input type="text" v-model="item.description" class="input-text w-full"
                        placeholder="Enter description..." />
                    </td>
                    <td class="px-2 py-2">
                      <input type="text" v-model="item.model" class="input-text w-full" placeholder="Enter model..." />
                    </td>
                    <td class="px-2 py-2">
                      <input type="number" v-model="item.qty" step="0.0001" class="input-text w-full"
                        placeholder="Enter qty..." />
                    </td>
                    <td class="px-2 py-2">
                      <input type="number" v-model="item.unit_price" step="0.0001" class="input-text w-full"
                        placeholder="Enter unit price..." />
                    </td>
                    <td class="px-2 py-2 text-center">
                      {{ item.qty * item.unit_price || 0 }}
                    </td>
                    <td class="px-2 py-2 text-center">
                      <button type="button" class="text-red-600 hover:text-red-900" @click="removeItem(index)">
                        <i class="bi bi-trash" style="font-size: 2rem"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td scope="col" colspan="5"></td>
                    <td scope="col" class="px-1 py-1 font-bold text-black text-right">
                      Sub Total
                    </td>
                    <td scope="col" colspan="2" class="px-1 py-1">
                      <input type="number" step="0.0001" class="input-text w-full" v-model="form.subTotal" readonly />
                    </td>
                  </tr>
                  <tr>
                    <td scope="col" colspan="5"></td>
                    <td scope="col" class="px-1 py-1 font-bold text-black text-right">
                      (-)Discount(%)
                    </td>

                    <td scope="col" colspan="2" class="px-2 py-2">
                      <input type="number" step="0.0001" class="input-text w-full" v-model="form.discount"
                        @input="grandTotalUpdate" />
                    </td>
                  </tr>
                  <tr>
                    <td scope="col" colspan="5"></td>
                    <td scope="col" class="px-1 py-1 font-bold text-black text-right">
                      Amount After Discount
                    </td>

                    <td scope="col" class="px-2 py-2" colspan="2">
                      <input type="number" step="0.0001" class="input-text w-full" v-model="form.amountAfterDiscount"
                        @input="grandTotalUpdate" />
                    </td>
                  </tr>
                  <tr>
                    <td scope="col" colspan="5"></td>
                    <td scope="col" class="px-1 py-1 font-bold text-black text-right">
                      (+)VAT(%)
                    </td>
                    <td scope="col" class="px-1 py-1" colspan="2">
                      <input type="number" step="0.0001" class="input-text w-full" v-model="form.vat"
                        @input="grandTotalUpdate" />
                    </td>
                  </tr>
                  <tr>
                    <td scope="col" colspan="5"></td>
                    <td scope="col" class="px-1 py-1 font-bold text-black text-right">
                      (+)AIT(%)
                    </td>

                    <td scope="col" class="px-1 py-1" colspan="2">
                      <input type="number" step="0.0001" class="input-text w-full" v-model="form.ait"
                        @input="grandTotalUpdate" />
                    </td>
                  </tr>
                  <tr>
                    <td scope="col" colspan="5"></td>
                    <td scope="col" class="px-1 py-1 font-bold text-black text-right">
                      Grand Total
                    </td>

                    <td scope="col" class="px-1 py-1" colspan="2">
                      <input type="number" step="0.01" class="input-text w-full" v-model="form.grandTotal"
                        @input="grandTotalUpdate" />
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          <!-- Submit Button -->
          <div class="col-span-12 flex justify-end mt-3">
            <button type="submit" :disabled="loading"
              class="px-4 py-2 min-w-32 bg-[#000180] text-white rounded-lg hover:bg-indigo-600">
              {{ loading ? "Submitting..." : "Create Quotation" }}
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
  lead_id: null,
  quotation_subject: "",
  attention_person: "",
  email: "",
  designation: null,
  subTotal: 0,
  discount: 0,
  amountAfterDiscount: 0,
  vat: 0,
  ait: 0,
  grandTotal: 0,

  quotation_items: [
    {
      id: "",
      description: "",
      model: "",
      qty: 0,
      unit_price: 0,
      line_total: 0,
    },
  ],
};

const loading = ref(false);
const form = ref({ ...initialFormState });
const formErrors = ref({});
const allLeads = ref([]);
const allDesignations = ref([]);
const allItems = ref([]);

const router = useRouter();
const { getItems, getDesignation, getLeads } = useDataStore();

// Form validation
const validateForm = () => {
  formErrors.value = {};
  if (!form.value.quotation_number)
    formErrors.value.quotation_number = "Quotation number is required.";

  return Object.keys(formErrors.value).length === 0;
};

// Fetching data on mount
onMounted(() => {
  getLeads().then((res) => (allLeads.value = res));
  getDesignation().then((res) => (allDesignations.value = res));
  getItems().then((res) => (allItems.value = res));
});

const grandTotalUpdate = () => {
  const amountAfterDiscount = form.value.subTotal - form.value.discount;
  form.value.amountAfterDiscount = amountAfterDiscount;
  const vat = (form.value.amountAfterDiscount * form.value.vat) / 100;
  const ait = (form.value.amountAfterDiscount * form.value.ait) / 100;
  form.value.grandTotal = amountAfterDiscount - (vat + ait);
};

const onItemSelect = (index, itemId) => {
  const selectedItem = allItems.value.find((item) => item.id === itemId);
  form.value.quotation_items[index].description = selectedItem.description;
  form.value.quotation_items[index].model = selectedItem.model;
  form.value.quotation_items[index].qty = selectedItem.qty;
  form.value.quotation_items[index].unit_price = selectedItem.unit_price;
  form.value.quotation_items[index].line_total =
    selectedItem.qty * selectedItem.unit_price || 0;

  form.value.subTotal =
    form.value.subTotal + form.value.quotation_items[index].line_total;

  addItem();
  grandTotalUpdate();
};

// Add new quotation item
const addItem = () => {
  form.value.quotation_items.push({
    item_id: "",
    description: "",
    model: "",
    qty: 0,
    unit_price: 0,
    line_total: 0,
  });
};

// Remove quotation item
const removeItem = (index) => {
  form.value.subTotal =
    form.value.subTotal - form.value.quotation_items[index].line_total;
  grandTotalUpdate();
  form.value.quotation_items.splice(index, 1);
};

// Submitting the form
const submitForm = async () => {
  console.log("Okay.........!!!");

  if (!validateForm()) return;

  const formData = new FormData();
  formData.append("quotation_number", form.value.quotation_number);
  formData.append("quotation_subject", form.value.quotation_subject);
  formData.append("lead_id", form.value.lead_id);
  formData.append("attention_person", form.value.attention_person);
  formData.append("email", form.value.email);
  formData.append("designation", form.value.designation);
  formData.append("subTotal", form.value.subTotal);
  formData.append("discount", form.value.discount);
  formData.append("amountAfterDiscount", form.value.amountAfterDiscount);
  formData.append("vat", form.value.vat);
  formData.append("ait", form.value.ait);
  formData.append("grandTotal", form.value.grandTotal);

  form.value.quotation_items.forEach((item, index) => {
    formData.append(`quotation_items[${index}]`, JSON.stringify(item));
  });

  loading.value = true;
  try {
    await quotation.insertItemWiseQuotation(formData); // Send form data as FormData
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

table {
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #f1f1f1;
}

thead {
  background-color: #000;
  color: #f1f1f1;
}

tfoot {
  background-color: #f1f1f1;
  /* Light gray background for the footer */
}
</style>
