<template>
  <MainLayout>
    <div class="bg-white p-3 rounded-md">
      <div class="flex justify-between items-center mb-3">
        <h6 class="font-medium">Edit Supplier</h6>
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
          <div class="col-span-4">
            <label for="supplier_name">
              Supplier Name <span class="text-red-600">*</span>
            </label>
            <input
              id="supplier_name"
              type="text"
              v-model="form.supplier_name"
              :class="{ 'border-red-500': formErrors.supplier_name }"
              class="input-text w-full"
              placeholder="Enter Supplier Name..."
              required
            />
            <p v-if="formErrors.supplier_name" class="text-red-500">
              {{ formErrors.supplier_name }}
            </p>
          </div>

          <div class="col-span-4">
            <label for="supplier_category" class="block text-sm font-medium text-gray-700">
              Supplier Category
            </label>
            <select
              v-model="form.supplier_category"
              id="supplier_category"
              class="common-select w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option disabled value="">Select Supplier Category</option>
              <option v-for="category in supplierCategories" :key="category" :value="category">{{ category }}</option>
            </select>
            <p v-if="formErrors.supplier_category" class="text-red-500 text-sm">
              {{ formErrors.supplier_category }}
            </p>
          </div>

          <div class="col-span-4">
            <label for="supplier_reputation_brand" class="block text-sm font-medium text-gray-700">
              Supplier Reputation / Brand Value
            </label>
            <select
              v-model="form.supplier_reputation_brand"
              id="supplier_reputation_brand"
              class="common-select w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option disabled value="">Select Supplier Reputation</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <p v-if="formErrors.supplier_reputation_brand" class="text-red-500 text-sm">
              {{ formErrors.supplier_reputation_brand }}
            </p>
          </div>

          <div class="col-span-12">
            <label for="items">Supplier Items</label>
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

          <div class="col-span-12">
            <label for="important_note">Important Note</label>
            <textarea
              id="important_note"
              v-model="form.important_note"
              class="input-text w-full"
              placeholder="Enter Important Notes..."
            ></textarea>
          </div>

          <div class="col-span-4">
            <label for="attachment">Attachments Doc/Media</label>
            <input
              id="attachment"
              type="file"
              @change="handleFileUpload"
              class="input-text w-full"
            />
          </div>

          <div class="col-span-12">
            <label for="concern_person_info">Concern Person Info</label>
            <textarea
              id="concern_person_info"
              v-model="form.concern_person_info"
              class="input-text w-full"
              placeholder="Enter Concern Person Info..."
            ></textarea>
          </div>

          <div class="col-span-4">
            <label for="country">Country</label>
            <v-select
              v-model="form.country"
              :options="allCountry"
              label="name"
              :reduce="(country) => country.id"
              class="common-select w-full rounded-lg"
              placeholder="Select Country..."
            ></v-select>
          </div>

          <div class="col-span-4">
            <label for="zone">Zone</label>
            <v-select
              v-model="form.zone"
              :options="allZone"
              label="name"
              :reduce="(zone) => zone.id"
              class="common-select w-full rounded-lg"
              placeholder="Select Zone..."
            ></v-select>
          </div>

          <div class="col-span-4">
            <label for="zip_po"> ZIP/PO </label>
            <input
              id="zip_po"
              type="text"
              v-model="form.zip_po"
              :class="{ 'border-red-500': formErrors.zip_po }"
              class="input-text w-full"
              placeholder="Enter Zip/PO..."
            />
            <p v-if="formErrors.zip_po" class="text-red-500">
              {{ formErrors.zip_po }}
            </p>
          </div>

          <div class="col-span-12">
            <label for="address">Address</label>
            <textarea
              id="address"
              v-model="form.address"
              class="input-text w-full"
              placeholder="Enter Address Info..."
            ></textarea>
          </div>

          <div class="col-span-6">
            <label for="phone"> Phone </label>
            <input
              id="phone"
              type="text"
              v-model="form.phone"
              :class="{ 'border-red-500': formErrors.phone }"
              class="input-text w-full"
              placeholder="Enter Phone..."
            />
            <p v-if="formErrors.phone" class="text-red-500">
              {{ formErrors.phone }}
            </p>
          </div>

          <div class="col-span-6">
            <label for="fax"> FAX</label>
            <input
              id="fax"
              type="text"
              v-model="form.fax"
              :class="{ 'border-red-500': formErrors.fax }"
              class="input-text w-full"
              placeholder="Enter FAX..."
            />
            <p v-if="formErrors.fax" class="text-red-500">
              {{ formErrors.fax }}
            </p>
          </div>

          <div class="col-span-6">
            <label for="website"> Website </label>
            <input
              id="website"
              type="text"
              v-model="form.website"
              :class="{ 'border-red-500': formErrors.website }"
              class="input-text w-full"
              placeholder="Enter Website..."
            />
            <p v-if="formErrors.website" class="text-red-500">
              {{ formErrors.website }}
            </p>
          </div>

          <div class="col-span-6">
            <label for="social_network"> Social Network </label>
            <input
              id="social_network"
              type="text"
              v-model="form.social_network"
              :class="{ 'border-red-500': formErrors.social_network }"
              class="input-text w-full"
              placeholder="Enter Social Network..."
            />
            <p v-if="formErrors.social_network" class="text-red-500">
              {{ formErrors.social_network }}
            </p>
          </div>

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
import supplier from "@/stores/supplier-api.js";
import { showNotification } from "@/utilities/notification";
import { useDataStore } from "@/stores/data";

// Initial form state
const initialFormState = {
  supplier_name: "",
  supplier_category: "",
  supplier_reputation_brand: "",
  items: [],
  important_note: "",
  concern_person_info: "",
  country: null,
  zone: null,
  zip_po: "",
  address: "",
  phone: "",
  fax: "",
  website: "",
  social_network: "",
  attachment: null,
};

const loading = ref(false);
const form = ref({ ...initialFormState });
const formErrors = ref({});
const allCountry = ref([]);
const allZone = ref([]);
const allItems = ref([]);

const router = useRouter();
const { getCountry, getZone, getItems } = useDataStore();

const supplierId = router.currentRoute.value.params.id;

const fetchInitialData = async () => {
  try {
    if (supplierId) {
      // Fetch the supplier data using the show method
      const response = await supplier.showSupplier(supplierId);


      console.log(response.data.items);
      // Map response data to the form fields
      form.value = {
        ...form.value,
        supplier_name: response.data.supplier.supplier_name || "",
        supplier_category: response.data.supplier.supplier_category || "",
        supplier_reputation_brand: response.data.supplier.supplier_reputation_brand || "",
        items: response.data.items, // Ensure items are properly formatted
        important_note: response.data.supplier.important_note || "",
        concern_person_info:
          response.data.supplier.concern_person_info || "",
          country: parseInt(response.data.supplier.country) || "",
          zone: parseInt(response.data.supplier.zone) || "",
          zip_po: response.data.supplier.zip_po || "",
          address: response.data.supplier.address || "",
          phone: response.data.supplier.phone || "",
          fax: response.data.supplier.fax || "",
          website: response.data.supplier.website || "",
          social_network: response.data.supplier.social_network || "",
      };

      // Optional: If you want to load other data like prospects, win probabilities, and items
      allCountry.value = await getCountry();
  allZone.value = await getZone();
  allItems.value = await getItems();
    }
  } catch (error) {
    console.error("Error fetching initial data:", error);
    showNotification("Failed to fetch supplier data", "error");
  }
};

const supplierCategories = [
  "Raw Material Suppliers",
  "Service Providers",
  "Wholesale Distributors",
  "Manufacturers",
  // Add more categories as needed
];

// Fetch countries, zones, and items
onMounted(fetchInitialData);

// Handle file upload
const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    form.value.attachment = file;
  }
};

// Validate form fields
const validateForm = () => {
  formErrors.value = {};
  let valid = true;

  if (!form.value.supplier_name) {
    formErrors.value.supplier_name = "Supplier name is required.";
    valid = false;
  }

  if (!form.value.supplier_category) {
    formErrors.value.supplier_category = "Supplier category is required.";
    valid = false;
  }

  if (!form.value.supplier_reputation_brand) {
    formErrors.value.supplier_reputation_brand = "Supplier reputation is required.";
    valid = false;
  }


  // Add more validation rules as needed

  return valid;
};

// Submit form
const submitForm = async () => {
  if (!validateForm()) return;

  const formData = new FormData();
  formData.append("supplier_name", form.value.supplier_name);
  formData.append("supplier_category", form.value.supplier_category);
  formData.append("supplier_reputation_brand", form.value.supplier_reputation_brand);
  formData.append("important_note", form.value.important_note);
  formData.append("concern_person_info", form.value.concern_person_info);
  formData.append("country", form.value.country);
  formData.append("zone", form.value.zone);
  formData.append("zip_po", form.value.zip_po);
  formData.append("address", form.value.address);
  formData.append("phone", form.value.phone);
  formData.append("fax", form.value.fax);
  formData.append("website", form.value.website);
  formData.append("social_network", form.value.social_network);
  formData.append("id", supplierId);

  // If there are items
  form.value.items.forEach((item, index) => {
    // Append each item to formData with a unique key
    formData.append(`items[${index}]`, JSON.stringify(item)); // Corrected here
  });

  if (form.value.attachment) {
    formData.append("attachment", form.value.attachment);
  }
      
  loading.value = true;
  try {
    await supplier.updateSupplier(formData); // Assuming insertSupplier is the API call
    showNotification("success", "Supplier created successfully!");
    router.push("/supplier"); // Navigate back to the supplier list
  } catch (error) {
    showNotification("error", "Error creating supplier."+error);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.input-text {
  border: 1px solid #d1d5db; /* Tailwind's gray-300 */
  border-radius: 0.375rem; /* Tailwind's rounded-lg */
  padding: 0.5rem;
  transition: border-color 0.2s;
}
.input-text:focus {
  border-color: #4f46e5; /* Tailwind's indigo-600 */
  outline: none;
  box-shadow: 0 0 0 0.2rem rgba(79, 70, 229, 0.25); /* Tailwind's focus ring */
}
.common-select {
  border-radius: 0.375rem; /* Tailwind's rounded-lg */
}
</style>
