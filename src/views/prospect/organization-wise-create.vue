<template>
  <MainLayout>
    <div class="bg-white p-3 rounded-md">
      <div class="flex justify-between items-center mb-3">
        <h6 class="font-medium">Create New Prospect</h6>
        <button type="button" class="px-4 py-2 bg-[#000180] text-white rounded hover:bg-indigo-600"
          @click="$router.go(-1)">
          Back
        </button>
      </div>
      <hr />
      <form @submit.prevent="submitForm">
        <!-- Initial Information Header -->
        <div class="col-span-12 mb-6">
          <h2 class="text-2xl font-semibold text-gray-800">
            <i class="bi bi-receipt"></i> Initial Information
          </h2>
        </div>
        <div class="lg:grid grid-cols-12 gap-4 items-center">
          <div class="col-span-3">
            <!-- Prospect Name -->
            <label for="prospect_name">Prospect Name<span class="text-red-600">*</span>
            </label>
            <input id="prospect_name" type="text" v-model="form.initial_info.prospect_name" class="input-text w-full"
              placeholder="Enter Prospect Name..." />
          </div>


          <div class="col-span-3">
            <!-- Prospect Short Name -->
            <label for="prospect_short_name">Prospect Short Name</label>
            <input id="prospect_short_name" type="text" v-model="form.initial_info.organization_short_name"
              class="input-text w-full" placeholder="Enter Prospect Short Name..." />
          </div>


          <div class="col-span-3">
            <!-- Primary Contact No (Mobile)-->
            <label for="mobile">Primary Contact No (Mobile)</label>
            <input id="mobile" type="text" v-model="form.initial_info.mobile" class="input-text w-full"
              placeholder="Enter mobile..." />
          </div>

          <div class="col-span-3">
            <!-- Primary Email-->
            <label for="email">Primary Email</label>
            <input id="email" type="text" v-model="form.initial_info.email" class="input-text w-full"
              placeholder="Enter Primary Email..." />
          </div>

          <div class="col-span-3">
            <!-- Project Name -->
            <label for="project_name">Project Name</label>
            <input id="project_name" type="text" v-model="form.initial_info.project_name" class="input-text w-full"
              placeholder="Enter Project Name..." />
          </div>

          <div class="col-span-3">
            <!-- Prospect Assigned To -->
            <label for="prospect_assigned_to">Prospect Assigned To</label>
            <v-select v-model="form.initial_info.prospect_assigned_to" :options="allEmployees" label="name"
              :reduce="(employee) => employee.name" class="common-select w-full rounded-lg"
              placeholder="Select Prospect Assigned To..."></v-select>
          </div>

          <div class="col-span-3">
            <!-- Attachments -->
            <label for="attachments">Initial Info Attachments</label>
            <input id="attachments" type="file" @change="handleFileUpload1" class="input-text w-full" />
          </div>
        </div>

        <!-- Basic Information -->
        <div class="col-span-12 mb-6">
          <br />
          <h2 class="text-2xl font-semibold text-gray-800">
            <i class="bi bi-receipt"></i> Basic Information
          </h2>
        </div>

        <div class="lg:grid grid-cols-12 gap-4 items-center">

          <div class="col-span-3">
            <!-- Priority -->
            <label for="priority">Priority</label>
            <select v-model="form.basic_info.priority" id="priority" class="common-select w-full rounded-lg" required>
              <option disabled value="">Select priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Urgent">Urgent</option>
              <option value="Critical">Critical</option>
            </select>
          </div>

          <div class="col-span-3">
            <!-- Interested Item/Service -->
            <label for="interested_item_service">Interested Item Or Service/ Prospect For</label>
            <input id="interested_item_service" type="text" v-model="form.basic_info.interested_item_service"
              class="input-text w-full" placeholder="Enter Interested Item Or Service..." />
          </div>

          <div class="col-span-3">
            <!-- Zone -->
            <label for="organization_zone">Zone (Residence/Interested)</label>
            <v-select v-model="form.basic_info.zone" :options="allZone" label="name" :reduce="(zone) => zone.name"
              class="common-select w-full rounded-lg" placeholder="Select Zone..."></v-select>
          </div>

          <div class="col-span-3">
            <!-- Prospect Status -->
            <label for="prospect_status">Prospect Status</label>
            <select v-model="form.basic_info.prospect_status" id="prospect_status"
              class="common-select w-full rounded-lg">
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>


          <div class="col-span-3">
            <!-- Campaign -->
            <label for="campaign">Campaign</label>
            <select v-model="form.basic_info.campaign" id="campaign"
              class="common-select w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
              <option disabled value="">Select a Campaign Type</option>
              <option value="Goal Setting">Goal Setting</option>
              <option value="Audience Segmentation">
                Audience Segmentation
              </option>
              <option value="Lead Nurturing">Lead Nurturing</option>
              <option value="Product Launch">Product Launch</option>
              <option value="Email Marketing">Email Marketing</option>
              <option value="Retention Campaign">Retention Campaign</option>
              <option value="Brand Awareness">Brand Awareness</option>
              <option value="Sales Promotion">Sales Promotion</option>
              <option value="Cross-Selling/Up-Selling">
                Cross-Selling / Up-Selling
              </option>
              <option value="Re-Engagement">Re-Engagement</option>
              <option value="Customer Feedback">Customer Feedback</option>
              <option value="Seasonal Campaign">Seasonal Campaign</option>
            </select>
          </div>

          <div class="col-span-3">
            <!-- Contacted By -->
            <label for="contacted_by">Contacted By</label>
            <v-select v-model="form.basic_info.contacted_by" :options="allEmployees" label="name"
              :reduce="(employee) => employee.name" class="common-select w-full rounded-lg"
              placeholder="Select Contacted By...">
            </v-select>
          </div>

          <div class="col-span-3">
            <!-- Information Source -->
            <label for="info_source">Information Source</label>
            <input id="info_source" type="text" v-model="form.basic_info.info_source" class="input-text w-full"
              placeholder="Enter Information Source..." />
          </div>


          <div class="col-span-3">
            <!-- Important Note -->
            <label for="important_note">Important Note</label>
            <textarea id="important_note" v-model="form.basic_info.important_note" class="input-text w-full"
              placeholder="Enter important note..."></textarea>
          </div>

          <div class="col-span-3">
            <!-- Attachments -->
            <label for="attachments">Attachments Doc/Media</label>
            <input id="attachments" type="file" @change="handleFileUpload2" class="input-text w-full" />
          </div>


        </div>
        <div class="col-span-12 mb-6">
          <br />
          <h2 class="text-2xl font-semibold text-gray-800">
            <i class="bi bi-receipt"></i>Personal Information
          </h2>
        </div>
        <div class="lg:grid grid-cols-12 gap-4 items-center">
          <div class="col-span-3">
            <!-- visiting_card -->
            <label for="visiting_card">Visiting Card</label>
            <input id="visiting_card" type="text" v-model="form.personal_info.visiting_card" class="input-text w-full"
              placeholder="Enter Visiting Card..." />
          </div>

          <div class="col-span-3">
            <!-- Job Type -->
            <label for="job_type">Job Type</label>
            <v-select v-model="form.personal_info.job_type" :options="allZone" label="name" :reduce="(zone) => zone.id"
              class="common-select w-full rounded-lg" placeholder="Select Job Type..."></v-select>
          </div>

          <div class="col-span-3">
            <!-- Profession -->
            <label for="profession">Profession</label>
            <v-select v-model="form.personal_info.profession" :options="allZone" label="name"
              :reduce="(zone) => zone.id" class="common-select w-full rounded-lg"
              placeholder="Select Profession..."></v-select>
          </div>

          <div class="col-span-3">
            <!-- Date Of Birth -->
            <label for="date_of_birth"> Date Of Birth </label>
            <input id="date_of_birth" type="date" v-model="form.personal_info.date_of_birth" class="input-text w-full"
              placeholder="Enter phone..." />
          </div>

          <div class="col-span-3">
            <!-- birthday_greetings -->
            <label for="birthday_greetings">Birthday Greetings</label>
            <select v-model="form.personal_info.birthday_greetings" id="birthday_greetings"
              class="common-select w-full rounded-lg">
              <option value="SMS">SMS</option>
              <option value="Email">Email</option>
            </select>
          </div>

          <div class="col-span-3">
            <!-- Gender -->
            <label for="gender">Gender</label>
            <select v-model="form.personal_info.gender" id="gender" class="common-select w-full rounded-lg">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>


          <div class="col-span-3">
            <!-- Marital Status -->
            <label for="marital_status">Marital Status</label>
            <select v-model="form.personal_info.marital_status" id="marital_status"
              class="common-select w-full rounded-lg">
              <option value="married">Married</option>
              <option value="Unmarried">Unmarried</option>
            </select>
          </div>

        </div>
        <div class="col-span-12 mb-6">
          <br />
          <h2 class="text-2xl font-semibold text-gray-800">
            <i class="bi bi-receipt"></i> Communication Information
          </h2>
        </div>
        <div class="lg:grid grid-cols-12 gap-4 items-center">

        </div>
        <div class="col-span-12 mb-6">
          <br />
          <h2 class="text-2xl font-semibold text-gray-800">
            <i class="bi bi-receipt"></i>  Service Information
          </h2>
        </div>
        <div class="lg:grid grid-cols-12 gap-4 items-center">


          <div class="col-span-12 flex justify-end mt-3">
            <button type="submit" :disabled="loading"
              class="px-4 py-2 min-w-32 bg-[#000180] text-white rounded-lg hover:bg-indigo-600">
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
import prospect from "@/stores/prospect-api.js";
import { showNotification } from "@/utilities/notification";
import { useDataStore } from "@/stores/data";

// Initial form state
const initialFormState = {
  initial_info: {
    prospect_name: "",
    prospect_short_name: "",
    mobile: "",
    email: "",
    project_name: "",
    prospect_assigned_to: "",
    attachments: ""
  },

  basic_info: {
    priority: "",
    interested_item_service: "",
    zone: "",
    prospect_status: "",
    campaign: "",
    contacted_by: "",
    info_source: "",
    note: "",
    attachment: "",
  },
  personal_info: {
    visiting_card: "",
    job_type: "",
    profession: "",
    date_of_birth: "",
    birthday_greetings: "",
    gender: "",
    marital_status: "",
  },
  communication_info: {
    contact_no: "",
    fax: "",
    social_network: "",
    email: "",
    website: "",
    image: ""
  },
  service_info: {
    name: "",
    designation_id: "",
    industry_id: "",
    country_id: "",
    district_id: "",
    zip: "",
    latitude: "",
    skype: "",
    social_network: "",
    department_id: "",
    income_range_id: "",
    address: "",
    division_id: "",
    thana_id: "",
    website: "",
    longitude: "",
    phone: "",
    image: ""

  }
};

const loading = ref(false);
const form = ref({ ...initialFormState });
const formErrors = ref({});
const allEmployees = ref([]);
const allLeads = ref([]);
const allDesignations = ref([]);
const allDepartments = ref([]);
const allItems = ref([]);
const allIndustryTypes = ref([]);
const allUser = ref([]);
const allOrganizationTypes = ref([]);
const allZone = ref([]);
const allBusinessIndustries = ref([]);
const allInfluencingRoles = ref([]);
const allGender = ref([]);
const allJobType = ref([]);

const router = useRouter();
const {
  getItems,
  getDepartment,
  getDesignation,
  getEmployees,
  getLeads,
  getZone,
  getIndustryTypes,
  getOrganizationTypes,
  getBusinessIndustries,
  getInfluencingRoles,
  getGender,
  getUser,
  getJobType,
} = useDataStore();

// Form validation
const validateForm = () => {
  formErrors.value = {};

  return Object.keys(formErrors.value).length === 0;
};

// Handle file upload
const handleFileUpload1 = (event) => {
  form.value.initial_info.attachments = event.target.files[0]; // Store the file in the form
};

const handleFileUpload2 = (event) => {
  form.value.concern_person.attachments = event.target.files[0]; // Store the file in the form
};

// Fetching data on mount
onMounted(() => {
  getEmployees().then((res) => (allEmployees.value = res));
  getLeads().then((res) => (allLeads.value = res));
  getDesignation().then((res) => (allDesignations.value = res));
  getDepartment().then((res) => (allDepartments.value = res));
  getItems().then((res) => (allItems.value = res));

  getZone().then((res) => (allZone.value = res));
  getIndustryTypes().then((res) => (allIndustryTypes.value = res));
  getOrganizationTypes().then((res) => (allOrganizationTypes.value = res));
  getBusinessIndustries().then((res) => (allBusinessIndustries.value = res));
  getInfluencingRoles().then((res) => (allInfluencingRoles.value = res));
  getGender().then((res) => (allGender.value = res));
  getUser().then((res) => (allUser.value = res));
  getJobType().then((res) => (allUser.value = res));
});

// Submitting the form
const submitForm = async () => {
  if (!validateForm()) return;

  const formData = new FormData();
  formData.append("initial_info", JSON.stringify(form.value.initial_info));
  formData.append("concern_person", JSON.stringify(form.value.concern_person));
  formData.append("organization_address", JSON.stringify(form.value.organization_address));

  // Append the file if it exists
  if (form.value.initial_info.attachments) {
    formData.append("attactment_initial_info", form.value.initial_info.attachments);
  }

  // Append the file if it exists
  if (form.value.concern_person.attachments) {
    formData.append("attactment_concern_person", form.value.concern_person.attachments);
  }



  loading.value = true;
  try {
    await prospect.insertProspect(formData); // Send form data as FormData
    showNotification("success", "Prospect created successfully!");
    router.push("/prospect");
  } catch (error) {
    console.log(error);
    showNotification("error", "Failed to create prospect.");
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
