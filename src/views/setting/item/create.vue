<template>
  <MainLayout>
    <div class="bg-white p-3 rounded-md">
      <div class="flex justify-between items-center mb-3">
        <h6 class="font-medium">Create New Item</h6>
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
          <label for="item_name">
            Item Name <span class="text-red-600">*</span>
          </label>
          <input
            id="item_name"
            type="text"
            placeholder="Enter here . . ."
            v-model="form.item_name"
            :class="{ 'border-red-500': formErrors.item_name }"
            class="input-text col-span-2"
          />

          <label for="model">Model</label>
          <input
            id="model"
            type="text"
            placeholder="Enter here . . ."
            v-model="form.model"
            :class="{ 'border-red-500': formErrors.model }"
            class="input-text col-span-2"
          />

          <label for="qty">Qty</label>
          <input
            id="qty"
            type="number"
            placeholder="Enter here . . ."
            v-model.number="form.qty"
            :class="{ 'border-red-500': formErrors.qty }"
            class="input-text col-span-2"
          />

          <label for="unit_price">Unit Price</label>
          <input
            id="unit_price"
            type="number"
            placeholder="Enter here . . ."
            v-model.number="form.unit_price"
            :class="{ 'border-red-500': formErrors.unit_price }"
            class="input-text col-span-2"
          />

          <!-- Submit Button in a full-width cell -->
          <div class="col-span-3 flex justify-end mt-3">
            <button
              type="submit"
              :disabled="loading"
              class="px-4 py-2 min-w-32 bg-[#000180] text-white rounded-lg hover:bg-indigo-600"
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
import item from "@/stores/setting/item_api.js";
import { showNotification } from "@/utilities/notification";
import { ref } from "vue";
import { useRouter } from "vue-router";

const loading = ref(false);

const form = ref({
  item_name: "",
  model: "",
  qty: "",
  unit_price: "",
});

const formErrors = ref({});

const validateForm = () => {
  const errors = {};

  if (!form.value.item_name) errors.item_name = "Item Name is required";
  if (!form.value.qty || form.value.qty <= 0) errors.qty = "Quantity must be greater than 0";
  if (!form.value.unit_price || form.value.unit_price <= 0) errors.unit_price = "Unit Price must be greater than 0";

  formErrors.value = errors;
  return Object.keys(errors).length === 0;
};

const router = useRouter();

const submitForm = async () => {
  if (!validateForm()) return;

  loading.value = true;

  try {
    const response = await item.insertItem(form.value);

    if (response?.status === 201) {
      showNotification(
        "success",
        response?.data?.message || "Successfully inserted"
      );
      form.value = { item_name: "", model: "", qty: "", unit_price: "" }; // Reset form
      router.push({ name: "item" });
    }
  } catch (error) {
    if (error.response) {
      showNotification(
        "error",
        error.response.data.message || "Failed to insert item"
      );
    } else {
      showNotification("error", "Network error, please try again later.");
    }
  } finally {
    loading.value = false;
  }
};
</script>
