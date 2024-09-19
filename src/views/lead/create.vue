<template>
  <MainLayout>
    <div class="bg-white p-3 rounded-md">
      <div class="flex justify-between items-center mb-3">
        <h6 class="font-medium">Create New Lead</h6>
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
            <!-- Prospect -->
            <label for="prospect_id">Prospect Name</label>
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
            <!-- Lead Name -->
            <label for="lead_name">
              Lead Name <span class="text-red-600">*</span>
            </label>
            <input
              id="lead_name"
              type="text"
              v-model="form.lead_name"
              :class="{ 'border-red-500': formErrors.lead_name }"
              class="input-text w-full"
              placeholder="Enter Lead Name..."
            />
            <p v-if="formErrors.lead_name" class="text-red-500">
              {{ formErrors.lead_name }}
            </p>
          </div>

          <div class="col-span-4">
            <!-- Win Probability -->
            <label for="win_probability_id">Win Probability</label>
            <v-select
              v-model="form.win_probability_id"
              :options="allWinProbability"
              label="name"
              :reduce="(winProbability) => winProbability.id"
              class="common-select w-full rounded-lg"
              placeholder="Select Win Probability..."
            ></v-select>
          </div>

          <div class="col-span-12">
            <!-- Items -->
            <label for="items">Items</label>
            <v-select
              id="items"
              v-model="form.items"
              :options="allItems"
              label="item_name"
              multiple
              class="input-text w-full"
              placeholder="Select items..."
            ></v-select>
          </div>

          <div class="col-span-4">
            <!-- Estimated Closing Date -->
            <label for="estimated_closing_date">
              Estimated Closing Date <span class="text-red-600">*</span>
            </label>
            <input
              id="estimated_closing_date"
              type="date"
              v-model="form.estimated_closing_date"
              :class="{ 'border-red-500': formErrors.estimated_closing_date }"
              class="input-text w-full"
              required
            />
            <p v-if="formErrors.estimated_closing_date" class="text-red-500">
              {{ formErrors.estimated_closing_date }}
            </p>
          </div>

          <div class="col-span-4">
            <!-- Estimated Closing Amount -->
            <label for="estimated_closing_amount">
              Estimated Closing Amount <span class="text-red-600">*</span>
            </label>
            <input
              id="estimated_closing_amount"
              type="number"
              v-model="form.estimated_closing_amount"
              :class="{ 'border-red-500': formErrors.estimated_closing_amount }"
              class="input-text w-full"
              placeholder="Enter Estimated Closing Amount..."
            />
            <p v-if="formErrors.estimated_closing_amount" class="text-red-500">
              {{ formErrors.estimated_closing_amount }}
            </p>
          </div>

          <div class="col-span-4">
            <!-- Attention Person -->
            <label for="attention_person">Attention Person</label>
            <input
              id="attention_person"
              type="text"
              v-model="form.attention_person"
              class="input-text w-full"
              placeholder="Enter Attention Person..."
            />
          </div>

          <div class="col-span-4">
            <!-- Lead Stage -->
            <label for="lead_stage">Lead Stage</label>
            <select
              v-model="form.lead_stage"
              id="lead_stage"
              class="common-select w-full rounded-lg"
              required
            >
              <option disabled value="">Select Lead Stage</option>
              <option value="New/Unqualified Lead">New/Unqualified Lead</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified Lead">Qualified Lead</option>
              <option value="Interested/Engaged">Interested/Engaged</option>
              <option value="Proposal Sent">Proposal Sent</option>
              <option value="Negotiation">Negotiation</option>
              <option value="Closed - Won">Closed - Won</option>
              <option value="Closed - Lost">Closed - Lost</option>
              <option value="Nurturing">Nurturing</option>
            </select>
            <p v-if="formErrors.lead_stage" class="text-red-500 mt-1">
              {{ formErrors.lead_stage }}
            </p>
          </div>

          <div class="col-span-4">
            <!-- Stage Date -->
            <label for="stage_date">
              Stage Date <span class="text-red-600">*</span>
            </label>
            <input
              id="stage_date"
              type="date"
              v-model="form.stage_date"
              :class="{ 'border-red-500': formErrors.stage_date }"
              class="input-text w-full"
              required
            />
            <p v-if="formErrors.stage_date" class="text-red-500">
              {{ formErrors.stage_date }}
            </p>
          </div>

          <div class="col-span-4">
            <!-- Priority -->
            <label for="priority">Priority</label>
            <select
              v-model="form.priority"
              id="priority"
              class="common-select w-full rounded-lg"
              required
            >
              <option disabled value="">Select lead priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Urgent">Urgent</option>
              <option value="Critical">Critical</option>
            </select>
            <p v-if="formErrors.priority" class="text-red-500">
              {{ formErrors.priority }}
            </p>
          </div>

          <div class="col-span-12">
            <!-- Comments/Notes -->
            <textarea
              id="comment"
              v-model="form.comment"
              class="input-text w-full"
              placeholder="Enter Comments/Notes..."
            ></textarea>
          </div>

          <div class="col-span-4">
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
import lead from "@/stores/lead-api.js";
import { showNotification } from "@/utilities/notification";
import { useDataStore } from "@/stores/data";

// Initial form state
const initialFormState = {
  prospect_id: "",
  lead_name: "",
  win_probability_id: "",
  items: [],
  estimated_closing_date: "",
  estimated_closing_amount: "",
  attention_person: "",
  lead_stage: "",
  stage_date: "",
  priority: "",
  comment: "",
  attachment: null, // Store attachment file(s)
};

const loading = ref(false);
const form = ref({ ...initialFormState });
const formErrors = ref({});
const allProspects = ref([]);
const allWinProbability = ref([]);
const allItems = ref([]);

const router = useRouter();
const { getProspects, getWinProbability, getItems } = useDataStore();

// Form validation
const validateForm = () => {
  formErrors.value = {};
  if (!form.value.lead_name)
    formErrors.value.lead_name = "Lead name is required.";
  if (!form.value.estimated_closing_date)
    formErrors.value.estimated_closing_date =
      "Estimated closing date is required.";
  if (!form.value.estimated_closing_amount)
    formErrors.value.estimated_closing_amount =
      "Estimated closing amount is required.";
  if (!form.value.stage_date)
    formErrors.value.stage_date = "Stage date is required.";
  if (!form.value.priority) formErrors.value.priority = "Priority is required.";

  return Object.keys(formErrors.value).length === 0;
};

// Submitting the form
const submitForm = async () => {
  if (!validateForm()) return;

  const formData = new FormData();
  formData.append("prospect_id", form.value.prospect_id);
  formData.append("lead_name", form.value.lead_name);
  formData.append("win_probability_id", form.value.win_probability_id);
  formData.append("estimated_closing_date", form.value.estimated_closing_date);
  formData.append(
    "estimated_closing_amount",
    form.value.estimated_closing_amount
  );
  formData.append("attention_person", form.value.attention_person);
  formData.append("lead_stage", form.value.lead_stage);
  formData.append("stage_date", form.value.stage_date);
  formData.append("priority", form.value.priority);
  formData.append("comment", form.value.comment);

  // If there are  items
  form.value.items.forEach((item, index) => {
    // Convert each item to a JSON string and append to formData with a unique key
    formData.append(`items[${index}]`, JSON.stringify(item));
  });

  if (form.value.attachment) {
    formData.append("attachment", form.value.attachment);
  }

  loading.value = true;
  try {
    await lead.insertLead(formData); // Assuming insertLead is the API call
    showNotification("success", "Lead created successfully!");
    router.push("/lead"); // Navigate back to the lead list
  } catch (error) {
    showNotification("error", "Error creating lead.");
  } finally {
    loading.value = false;
  }
};
// File upload handler
const handleFileUpload = (event) => {
  form.value.attachment = event.target.files[0];
};

// Fetch prospects, win probabilities, and items on mount
onMounted(async () => {
  allProspects.value = await getProspects();
  allWinProbability.value = await getWinProbability();
  allItems.value = await getItems();
});
</script>

<style scoped>
.input-text {
  padding: 0.75rem 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}
.input-text:focus {
  outline: none;
  border-color: #000180;
}
.common-select {
  padding: 0.5rem;
  border: 1px solid #ccc;
}
.common-select:focus {
  outline: none;
  border-color: #000180;
}
</style>
