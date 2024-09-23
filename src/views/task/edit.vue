<template>
  <MainLayout>
    <div class="bg-white p-3 rounded-md">
      <div class="flex justify-between items-center mb-3">
        <h6 class="font-medium">Edit Task</h6>
        <button type="button" class="px-4 py-2 bg-[#000180] text-white rounded hover:bg-indigo-600"
          @click="$router.go(-1)">
          Back
        </button>
      </div>
      <hr />
      <form @submit.prevent="submitForm">
        <div class="lg:grid grid-cols-12 gap-4 items-center">
          <div class="col-span-4">
            <!-- Task Title -->
            <label for="task_title">
              Task Title <span class="text-red-600">*</span>
            </label>
            <input
              id="task_title"
              type="text"
              v-model="form.task_title"
              :class="{ 'border-red-500': formErrors.task_title }"
              class="input-text w-full"
              placeholder="Enter Task Title..."
            />
            <p v-if="formErrors.task_title" class="text-red-500">
              {{ formErrors.task_title }}
            </p>
          </div>

          <div class="col-span-4">
            <!-- type -->
            <label for="type"> Type <span class="text-red-600">*</span> </label>
            <select
              v-model="form.type"
              id="type"
              class="common-select w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option disabled value="">Select task type</option>
              <option value="Follow-up Tasks">Follow-up Tasks</option>
              <option value="Meetings or Appointments">
                Meetings or Appointments
              </option>
              <option value="Calls">Calls</option>
              <option value="Emails">Emails</option>
              <option value="Sales Tasks">Sales Tasks</option>
              <option value="Customer Support or Service Tasks">
                Customer Support or Service Tasks
              </option>
              <option value="Lead Qualification Tasks">
                Lead Qualification Tasks
              </option>
              <option value="Internal Tasks">Internal Tasks</option>
            </select>
            <p v-if="formErrors.type" class="text-red-500">
              {{ formErrors.type }}
            </p>
          </div>

          <div class="col-span-4">
            <!-- Priority -->
            <label for="priority">Priority</label>
            <select
              v-model="form.priority"
              id="priority"
              class="common-select w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option disabled value="">Select task priority</option>
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

          <div class="col-span-3">
            <!-- Start Date -->
            <label for="start_date">
              Start Date <span class="text-red-600">*</span>
            </label>
            <input
              id="start_date"
              type="date"
              v-model="form.start_date"
              :class="{ 'border-red-500': formErrors.start_date }"
              class="input-text w-full"
              placeholder="Enter start date..."
              required
            />
            <p v-if="formErrors.start_date" class="text-red-500">
              {{ formErrors.start_date }}
            </p>
          </div>

          <div class="col-span-3">
            <!-- Start Time -->
            <label for="start_time">
              Start Time <span class="text-red-600">*</span>
            </label>
            <input
              id="start_time"
              type="time"
              v-model="form.start_time"
              :class="{ 'border-red-500': formErrors.start_time }"
              class="input-text w-full"
              placeholder="Enter start time..."
              required
            />
            <p v-if="formErrors.start_time" class="text-red-500">
              {{ formErrors.start_time }}
            </p>
          </div>

          <div class="col-span-3">
            <!-- Due Date -->
            <label for="due_date">
              Due Date <span class="text-red-600">*</span>
            </label>
            <input
              id="due_date"
              type="date"
              v-model="form.due_date"
              :class="{ 'border-red-500': formErrors.due_date }"
              class="input-text w-full"
              placeholder="Enter due date..."
              required
            />
            <p v-if="formErrors.due_date" class="text-red-500">
              {{ formErrors.due_date }}
            </p>
          </div>

          <div class="col-span-3">
            <!-- Due Time -->
            <label for="due_time">
              Due Time <span class="text-red-600">*</span>
            </label>
            <input
              id="due_time"
              type="time"
              v-model="form.due_time"
              :class="{ 'border-red-500': formErrors.due_time }"
              class="input-text w-full"
              placeholder="Enter due time..."
              required
            />
            <p v-if="formErrors.due_time" class="text-red-500">
              {{ formErrors.due_time }}
            </p>
          </div>

          <div class="col-span-3">
            <!-- Prospect -->
            <label for="prospect_id">Prospect</label>
            <v-select
              v-model="form.prospect_id"
              :options="allProspects"
              label="name"
              :reduce="(prospect) => prospect.id"
              class="common-select w-full rounded-lg"
              placeholder="Select prospect..."
            ></v-select>
          </div>

          <div class="col-span-3">
            <!-- Contact -->
            <label for="contact">Contact</label>
            <select
              v-model="form.contact"
              id="contact"
              class="common-select w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option disabled value="">Select contact</option>
              <option value="Customer">Customer</option>
              <option value="Lead">Lead</option>
              <option value="Prospect">Prospect</option>
              <option value="Internal Contact">Internal Contact</option>
              <option value="Business Contact">Business Contact</option>
            </select>
            <p v-if="formErrors.contact" class="text-red-500">
              {{ formErrors.contact }}
            </p>
          </div>

          <div class="col-span-3">
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

          <div class="col-span-3">
            <!-- Attention Person -->
            <label for="attention_person">Attention Person</label>
            <input
              id="attention_person"
              type="text"
              v-model="form.attention_person"
              class="input-text w-full"
              placeholder="Enter person name..."
            />
          </div>

          <div class="col-span-4">
            <!-- Status -->
            <label for="status">Status</label>
            <select
              v-model="form.status"
              id="status"
              class="common-select w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option disabled value="">Select task status</option>
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Deferred">Deferred</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Pending">Pending</option>
            </select>
            <p v-if="formErrors.status" class="text-red-500">
              {{ formErrors.status }}
            </p>
          </div>


          <div class="col-span-4">
            <!-- Task Description -->
            <label for="description">Task Description</label>
            <textarea
              id="description"
              v-model="form.description"
              class="input-text w-full"
              placeholder="Enter Task Description..."
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
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router'; // Import useRoute to get route params
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import MainLayout from '@/components/MainLayout.vue';
import task from '@/stores/task-api.js';
import { showNotification } from '@/utilities/notification';
import { useDataStore } from '@/stores/data';

// Initial form state
const initialFormState = {
  task_title: '',
  type: '',
  priority: '',
  start_date: '',
  start_time: '',
  due_date: '',
  due_time: '',
  prospect_id: '',
  contact: '',
  lead_id: '',
  attention_person: '',
  status: '', 
  description: '',
  attachment: null, // Store attachment file(s)
};

const loading = ref(false);
const form = ref({ ...initialFormState });
const formErrors = ref({});
const allProspects = ref([]);
const allLeads = ref([]);

// Access route params to get task ID
const route = useRoute();
const router = useRouter();
const taskId = route.params.id; // Assume task ID is passed as a route param

const { getProspects, getLeads } = useDataStore();

// Form validation
const validateForm = () => {
  formErrors.value = {};
  if (!form.value.task_title) formErrors.value.task_title = 'Task title is required.';
  if (!form.value.type) formErrors.value.type = 'Task type is required.';
  if (!form.value.start_date) formErrors.value.start_date = 'Start date is required.';
  if (!form.value.start_time) formErrors.value.start_time = 'Start time is required.';
  if (!form.value.due_date) formErrors.value.due_date = 'Due date is required.';
  if (!form.value.due_time) formErrors.value.due_time = 'Due time is required.';

  return Object.keys(formErrors.value).length === 0;
};

// Handle file upload
const handleFileUpload = (event) => {
  form.value.attachment = event.target.files[0]; // Store the file in the form
};

// Fetching data on mount
onMounted(async () => {
  if (taskId) {
    try {
      const response = await task.showTask(taskId); // Fetch task details
      Object.assign(form.value, response.data); // Populate form with task data
    } catch (error) {
      showNotification('error', 'Error fetching task details.');
    }
  }

  try {
    const prospects = await getProspects();
    allProspects.value = prospects;
  } catch (error) {
    showNotification('error', 'Error fetching prospects.');
  }

  try {
    const leads = await getLeads();
    allLeads.value = leads;
  } catch (error) {
    showNotification('error', 'Error fetching leads.');
  }
});

// Submitting the form
const submitForm = async () => {
  if (!validateForm()) return;

  const formData = new FormData();
  formData.append('task_title', form.value.task_title);
  formData.append('type', form.value.type);
  formData.append('priority', form.value.priority);
  formData.append('start_date', form.value.start_date);
  formData.append('start_time', form.value.start_time);
  formData.append('due_date', form.value.due_date);
  formData.append('due_time', form.value.due_time);
  formData.append('contact', form.value.contact);
  formData.append('prospect_id', form.value.prospect_id);
  formData.append('lead_id', form.value.lead_id);
  formData.append('attention_person', form.value.attention_person);
  formData.append('status', form.value.status);
  formData.append('description', form.value.description);

  if (form.value.attachment) {
    formData.append('attachment', form.value.attachment);
  }

  loading.value = true;
  try {
    await task.updateTask(formData,taskId); 
    showNotification('success', 'Task Updated successfully!');
    router.push('/task'); 
  } catch (error) {
    showNotification('error', 'Error creating task.');
  } finally {
    loading.value = false;
  }
};
</script>

