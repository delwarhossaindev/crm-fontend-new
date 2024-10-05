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
        <div class="lg:grid grid-cols-12 gap-4 items-center">
          <div class="col-span-3">
            <!-- Organization Name -->
            <label for="organization_name">Organization Name<span class="text-red-600">*</span>
            </label>
            <input id="organization_name" type="text" v-model="form.initial_info.organization_name"
              class="input-text w-full" placeholder="Enter organization name..." />
          </div>

          <div class="col-span-3">
            <!-- Industry Type -->
            <label for="industry_type">Industry Type</label>
            <v-select v-model="form.initial_info.industry_type" :options="allIndustryTypes" label="name"
              :reduce="(industry_type) => industry_type.id" class="common-select w-full rounded-lg"
              placeholder="Select Industry Type..."></v-select>
          </div>

          <div class="col-span-3">
            <!-- Project Name -->
            <label for="project_name">Project Name<span class="text-red-600">*</span></label>
            <input id="project_name" type="text" v-model="form.initial_info.project_name" class="input-text w-full"
              placeholder="Enter project name..." />
          </div>

          <div class="col-span-3">
            <!-- Organization Short Name -->
            <label for="organization_short_name">Organization Short Name<span class="text-red-600">*</span></label>
            <input id="organization_short_name" type="text" v-model="form.initial_info.organization_short_name"
              class="input-text w-full" placeholder="Enter organization short name..." />
          </div>

          <div class="col-span-3">
            <!-- Interested Item/Service -->
            <label for="interested_item_service">Interested Item/Service<span class="text-red-600">*</span></label>
            <input id="interested_item_service" type="text" v-model="form.initial_info.interested_item_service"
              class="input-text w-full" placeholder="Enter interested item/service..." />
          </div>

          <div class="col-span-3">
            <!-- Information Source -->
            <label for="information_source">Information Source<span class="text-red-600">*</span></label>
            <input id="information_source" type="text" v-model="form.initial_info.information_source"
              class="input-text w-full" placeholder="Enter information source..." />
          </div>

          <div class="col-span-3">
            <!-- Prospect Assigned To -->
            <label for="prospect_assigned_to">Prospect Assigned To</label>
            <v-select v-model="form.initial_info.prospect_assigned_to" :options="allUsers" label="name"
              :reduce="(user) => user.id" class="common-select w-full rounded-lg"
              placeholder="Select user..."></v-select>
          </div>

          <div class="col-span-3">
            <!-- Organization Type -->
            <label for="organization_type">Organization Type</label>
            <v-select v-model="form.initial_info.organization_type" :options="allOrganizationTypes" label="name"
              :reduce="(orgType) => orgType.id" class="common-select w-full rounded-lg"
              placeholder="Select type..."></v-select>
          </div>

          <div class="col-span-3">
            <!-- Campaign -->
            <label for="campaign">Campaign</label>
            <v-select v-model="form.initial_info.campaign" :options="allCampaigns" label="name"
              :reduce="(campaign) => campaign.id" class="common-select w-full rounded-lg"
              placeholder="Select campaign..."></v-select>
          </div>

          <div class="col-span-3">
            <!-- Contacted By -->
            <label for="contacted_by">Contacted By</label>
            <v-select v-model="form.initial_info.contacted_by" :options="allUsers" label="name"
              :reduce="(user) => user.id" class="common-select w-full rounded-lg"
              placeholder="Select user..."></v-select>
          </div>

          <div class="col-span-3">
            <!-- Important Note -->
            <label for="important_note">Important Note</label>
            <textarea id="important_note" v-model="form.initial_info.important_note" class="input-text w-full"
              placeholder="Enter important note..."></textarea>
          </div>

          <div class="col-span-3">
            <!-- Attachments -->
            <label for="attachments">Attachments</label>
            <input id="attachments" type="file" @change="handleFileUpload1" class="input-text w-full" />
          </div>

          <div class="col-span-3">
            <!-- Concern Person Name -->
            <label for="concern_person_name">Concern Person Name<span class="text-red-600">*</span></label>
            <input id="concern_person_name" type="text" v-model="form.concern_person.name" class="input-text w-full"
              placeholder="Enter concern person's name..." />
          </div>

          <div class="col-span-3">
            <!-- Primary Status -->
            <label for="primary_status">Primary Status</label>
            <select v-model="form.primary_status" id="primary_status" class="common-select w-full rounded-lg">
              <option value="1">Primary</option>
              <option value="0">Not Primary</option>
            </select>
          </div>

          <div class="col-span-3">
            <!-- Phone -->
            <label for="concern_person_phone">Phone<span class="text-red-600">*</span></label>
            <input id="concern_person_phone" type="text" v-model="form.concern_person.phone" class="input-text w-full"
              placeholder="Enter phone..." />
          </div>

          <div class="col-span-3">
            <!-- Email -->
            <label for="concern_person_email">Email<span class="text-red-600">*</span></label>
            <input id="concern_person_email" type="text" v-model="form.concern_person.email" class="input-text w-full"
              placeholder="Enter email..." />
          </div>

          <div class="col-span-3">
            <!-- Date of Birth -->
            <label for="date_of_birth">Date of Birth<span class="text-red-600">*</span></label>
            <input id="date_of_birth" type="date" v-model="form.concern_person.date_of_birth"
              class="input-text w-full" />
          </div>

          <div class="col-span-3">
            <!-- Designation -->
            <label for="designation">Designation</label>
            <v-select v-model="form.concern_person.designation" :options="allDesignations" label="name"
              :reduce="(designation) => designation.id" class="common-select w-full rounded-lg"
              placeholder="Select designation..."></v-select>
          </div>

          <div class="col-span-3">
            <!-- Influencing Role -->
            <label for="influencing_role">Influencing Role</label>
            <v-select v-model="form.concern_person.influencing_role" :options="allInfluencingRoles" label="name"
              :reduce="(role) => role.id" class="common-select w-full rounded-lg"
              placeholder="Select influencing role..."></v-select>
          </div>

          <div class="col-span-3">
            <!-- Department -->
            <label for="department">Department</label>
            <v-select v-model="form.concern_person.department" :options="allDepartments" label="name"
              :reduce="(department) => department.id" class="common-select w-full rounded-lg"
              placeholder="Select department..."></v-select>
          </div>

          <div class="col-span-3">
            <!-- Job Type -->
            <label for="job_type">Job Type</label>
            <select v-model="form.concern_person.job_type" id="job_type" class="common-select w-full rounded-lg">
              <option value="1">Primary</option>
              <option value="0">Not Primary</option>
            </select>
          </div>

          <div class="col-span-3">
            <!-- Gender -->
            <label for="gender">Gender</label>
            <select v-model="form.concern_person.gender" id="gender" class="common-select w-full rounded-lg">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div class="col-span-3">
            <!-- Social Network -->
            <label for="social_network">Social Network<span class="text-red-600">*</span></label>
            <input id="social_network" type="text" v-model="form.concern_person.social_network"
              class="input-text w-full" placeholder="Enter social network..." />
          </div>

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
    organization_name: "",
    industry_type: "",
    project_name: "",
    organization_short_name: "",
    interested_item_service: "",
    information_source: "",
    prospect_assigned_to: "",
    organization_type: "",
    campaign: "",
    contacted_by: "",
    important_note: "",
    attactment: null
  },

  concern_person: {
    name: "",
    primary_status: true,
    phone: "",
    email: "",
    date_of_birth: "",
    designation: "",
    influencing_role: "",
    department: "",
    job_type: "",
    profession: "",
    gender: "",
    social_network: "",
    attactment: null,

  },
  organization_address: {
    address: "",
    zone: "",
    zip: "",
    phone: "",
    website: "",
    latitude: "",
    longitude: "",
    fax: "",
    social_network: "",
  },
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
const allUsers = ref([]);
const allOrganizationTypes = ref([]);
const allCampaigns = ref([]);
const allZone = ref([]);
const allBusinessIndustries = ref([]);
const allInfluencingRoles = ref([]);
const allGender = ref([]);

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
  getuser
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
  getuser().then((res) => (allUsers.value = res));
});

// Submitting the form
const submitForm = async () => {
  if (!validateForm()) return;

  const formData = new FormData();
  formData.append("initial_info", form.value.initial_info);
  formData.append("concern_person", form.value.concern_person);
  formData.append("organization_address", form.value.organization_address);

  loading.value = true;
  try {
    await prospect.insertQuotation(formData);  // Send form data as FormData
    showNotification("success", "Quotation created successfully!");
    router.push("/prospect");
  } catch (error) {
    if (error.response && error.response.data.errors) {
      formErrors.value = error.response.data.errors;
    }
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
