<template>
  <MainLayout>
    <div class="bg-white p-3 rounded-md">
      <div class="flex justify-between items-center mb-3">
        <h6 class="font-medium">Create New Prospect</h6>
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
        <!-- Initial Information Header -->
        <div class="col-span-12 mb-6">
          <h2 class="text-2xl font-semibold text-gray-800">
            <i class="bi bi-receipt"></i> Initial Information
          </h2>
        </div>
        <div class="lg:grid grid-cols-12 gap-4 items-center">
          <div class="col-span-3">
            <!-- Organization Name -->
            <label for="organization_name"
              >Organization Name<span class="text-red-600">*</span>
            </label>
            <input
              id="organization_name"
              type="text"
              v-model="form.initial_info.organization_name"
              class="input-text w-full"
              placeholder="Enter organization name..."
            />
          </div>

          <div class="col-span-3">
            <!-- Industry Type -->
            <label for="industry_type">Industry Type</label>
            <v-select
              v-model="form.initial_info.industry_type"
              :options="allIndustryTypes"
              label="name"
              :reduce="(industry_type) => industry_type.name"
              class="common-select w-full rounded-lg"
              placeholder="Select Industry Type..."
            ></v-select>
          </div>

          <div class="col-span-3">
            <!-- Project Name -->
            <label for="project_name">Project Name</label>
            <input
              id="project_name"
              type="text"
              v-model="form.initial_info.project_name"
              class="input-text w-full"
              placeholder="Enter Project Name..."
            />
          </div>

          <div class="col-span-3">
            <!-- Organization Short Name -->
            <label for="organization_short_name">Organization Short Name</label>
            <input
              id="organization_short_name"
              type="text"
              v-model="form.initial_info.organization_short_name"
              class="input-text w-full"
              placeholder="Enter organization short name..."
            />
          </div>

          <div class="col-span-3">
            <!-- Interested Item/Service -->
            <label for="interested_item_service"
              >Interested Item Or Service/ Prospect For</label
            >
            <input
              id="interested_item_service"
              type="text"
              v-model="form.initial_info.interested_item_service"
              class="input-text w-full"
              placeholder="Enter interested item/service..."
            />
          </div>

          <div class="col-span-3">
            <!-- Information Source -->
            <label for="information_source">Information Source</label>
            <input
              id="information_source"
              type="text"
              v-model="form.initial_info.information_source"
              class="input-text w-full"
              placeholder="Enter information source..."
            />
          </div>

          <div class="col-span-3">
            <!-- Prospect Assigned To -->
            <label for="prospect_assigned_to">Prospect Assigned To</label>
            <v-select
              v-model="form.initial_info.prospect_assigned_to"
              :options="allEmployees"
              label="name"
              :reduce="(employee) => employee.name"
              class="common-select w-full rounded-lg"
              placeholder="Select Prospect Assigned To..."
            ></v-select>
          </div>

          <div class="col-span-3">
            <!-- Organization Type -->
            <label for="organization_type">Organization Type</label>
            <v-select
              v-model="form.initial_info.organization_type"
              :options="allOrganizationTypes"
              label="name"
              :reduce="(orgType) => orgType.name"
              class="common-select w-full rounded-lg"
              placeholder="Select type..."
            ></v-select>
          </div>

          <div class="col-span-3">
            <!-- Campaign -->
            <label for="campaign">Campaign</label>
            <select
              v-model="form.initial_info.campaign"
              id="campaign"
              class="common-select w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
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
            <v-select
              v-model="form.initial_info.contacted_by"
              :options="allEmployees"
              label="name"
              :reduce="(employee) => employee.name"
              class="common-select w-full rounded-lg"
              placeholder="Select Prospect Assigned To..."
            >
            </v-select>
          </div>

          <div class="col-span-3">
            <!-- Important Note -->
            <label for="important_note">Important Note</label>
            <textarea
              id="important_note"
              v-model="form.initial_info.important_note"
              class="input-text w-full"
              placeholder="Enter important note..."
            ></textarea>
          </div>

          <div class="col-span-3">
            <!-- Attachments -->
            <label for="attachments">Initial Info Attachments</label>
            <input
              id="attachments"
              type="file"
              @change="handleFileUpload1"
              class="input-text w-full"
            />
          </div>
        </div>

        <!-- Concern Person Header -->
        <div class="col-span-12 mb-6">
          <br />
          <h2 class="text-2xl font-semibold text-gray-800">
            <i class="bi bi-receipt"></i> Concern Person Information
          </h2>
        </div>

        <div class="lg:grid grid-cols-12 gap-4 items-center">
          <div class="col-span-3">
            <!-- Concern Person Name -->
            <label for="concern_person_name">Concern Person Name</label>
            <input
              id="concern_person_name"
              type="text"
              v-model="form.concern_person.name"
              class="input-text w-full"
              placeholder="Enter concern person's name..."
            />
          </div>

          <div class="col-span-3">
            <!-- Primary Status -->
            <label for="primary_status">Primary Status</label>
            <select
              v-model="form.concern_person.primary_status"
              id="primary_status"
              class="common-select w-full rounded-lg"
            >
              <option value="Primary">Primary</option>
              <option value="Not Primary">Not Primary</option>
            </select>
          </div>

          <div class="col-span-3">
            <!-- Phone -->
            <label for="concern_person_phone">Phone</label>
            <input
              id="concern_person_phone"
              type="text"
              v-model="form.concern_person.phone"
              class="input-text w-full"
              placeholder="Enter phone..."
            />
          </div>

          <div class="col-span-3">
            <!-- Email -->
            <label for="concern_person_email">Email</label>
            <input
              id="concern_person_email"
              type="text"
              v-model="form.concern_person.email"
              class="input-text w-full"
              placeholder="Enter email..."
            />
          </div>

          <div class="col-span-3">
            <!-- Date of Birth -->
            <label for="date_of_birth">Date of Birth</label>
            <input
              id="date_of_birth"
              type="date"
              v-model="form.concern_person.date_of_birth"
              class="input-text w-full"
            />
          </div>

          <div class="col-span-3">
            <!-- Designation -->
            <label for="designation">Designation</label>
            <v-select
              v-model="form.concern_person.designation"
              :options="allDesignations"
              label="name"
              :reduce="(designation) => designation.id"
              class="common-select w-full rounded-lg"
              placeholder="Select Designation..."
            ></v-select>
          </div>

          <div class="col-span-3">
            <!-- Influencing Role -->
            <label for="influencing_role">Influencing Role</label>
            <v-select
              v-model="form.concern_person.influencing_role"
              :options="allInfluencingRoles"
              label="name"
              :reduce="(role) => role.name"
              class="common-select w-full rounded-lg"
              placeholder="Select influencing role..."
            ></v-select>
          </div>

          <div class="col-span-3">
            <!-- Department -->
            <label for="department">Department</label>
            <v-select
              v-model="form.concern_person.department"
              :options="allDepartments"
              label="name"
              :reduce="(department) => department.name"
              class="common-select w-full rounded-lg"
              placeholder="Select department..."
            ></v-select>
          </div>

          <div class="col-span-3">
            <!-- Job Type -->
            <label for="job_type">Job Type</label>
            <v-select
              v-model="form.concern_person.job_type"
              :options="allInfluencingRoles"
              label="name"
              :reduce="(role) => role.name"
              class="common-select w-full rounded-lg"
              placeholder="Select influencing role..."
            ></v-select>
          </div>

          <div class="col-span-3">
            <!-- Gender -->
            <label for="gender">Gender</label>
            <select
              v-model="form.concern_person.gender"
              id="gender"
              class="common-select w-full rounded-lg"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div class="col-span-3">
            <!-- Social Network -->
            <label for="social_network">Social Network</label>
            <input
              id="social_network"
              type="text"
              v-model="form.concern_person.social_network"
              class="input-text w-full"
              placeholder="Enter social network..."
            />
          </div>

          <div class="col-span-3">
            <!-- Attachments -->
            <label for="attachments">Concern Person Attachments</label>
            <input
              id="attachments"
              type="file"
              @change="handleFileUpload2"
              class="input-text w-full"
            />
          </div>
        </div>
        <div class="col-span-12 mb-6">
          <br />
          <h2 class="text-2xl font-semibold text-gray-800">
            <i class="bi bi-receipt"></i> Organization Address
          </h2>
        </div>
        <div class="lg:grid grid-cols-12 gap-4 items-center">
          <div class="col-span-3">
            <!-- organization_address -->
            <label for="organization_address"> Organization Address </label>
            <input
              id="organization_address"
              type="text"
              v-model="form.organization_address.address"
              class="input-text w-full"
              placeholder="Enter amount..."
            />
          </div>

          <div class="col-span-3">
            <!-- Organization Zone -->
            <label for="organization_zone">Organization Zone</label>
            <v-select
              v-model="form.concern_person.zone"
              :options="allZone"
              label="name"
              :reduce="(zone) => zone.id"
              class="common-select w-full rounded-lg"
              placeholder="Select Profession..."
            ></v-select>
          </div>

          <div class="col-span-3">
            <!-- Zip/PO -->
            <label for="organization_zip"> Zip/PO </label>
            <input
              id="organization_zip"
              type="text"
              v-model="form.organization_address.zip"
              class="input-text w-full"
              placeholder="Enter Zip/PO..."
            />
          </div>

          <div class="col-span-3">
            <!-- Phone -->
            <label for="organization_phone"> Phone </label>
            <input
              id="organization_phone"
              type="text"
              v-model="form.organization_address.phone"
              class="input-text w-full"
              placeholder="Enter phone..."
            />
          </div>

          <div class="col-span-3">
            <!-- website -->
            <label for="organization_website"> Website </label>
            <input
              id="organization_website"
              type="text"
              v-model="form.organization_address.website"
              class="input-text w-full"
              placeholder="Enter Website..."
            />
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
    attactment: null,
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
