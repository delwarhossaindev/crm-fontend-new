<script setup>
import MainLayout from "@/components/MainLayout.vue";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons-vue";
import organizationType from "@/stores/setting/organization-type-api.js";
import { onMounted, ref } from "vue";

const isLoading = ref(false);
const organizationTypeData = ref([]);
const allOrganizationType = ref({});
const page = ref(1);
const paginate = ref(10);

const deleteOrganizationType = async (index) => {
  const organizationTypeId = organizationTypeData.value[index].id;
  try {
    await organizationType.deleteOrganizationType(organizationTypeId);
    organizationTypeData.value.splice(index, 1);
    allOrganizationType.value.total -= 1;
  } catch (error) {
    console.error("Failed to delete organization Type:", error);
  }
};

const getAllOrganizationType = async () => {
  isLoading.value = true;
  try {
    const response = await organizationType.fetchOrganizationTypeList(page.value, paginate.value);
    allOrganizationType.value = response.data;
    organizationTypeData.value = response.data.data;
  } catch (error) {
    console.error("Failed to fetch organization Type:", error);
  } finally {
    isLoading.value = false;
  }
};

const organizationTypeSearch = async (input) => {
  if (input) {
    try {
      const response = await organizationType.searchOrganizationTypeList(input);
      allOrganizationType.value = response.data;
      organizationTypeData.value = response.data.data;
    } catch (error) {
      console.error("Failed to search organization Type:", error);
    }
  } else {
    getAllOrganizationType();
  }
};

const handlePagination = (pageNo) => {
  page.value = pageNo;
  getAllOrganizationType();
};

onMounted(() => {
  getAllOrganizationType();
});
</script>

<template>
  <MainLayout>
    <div class="flex justify-between mb-4">
      <input
        type="text"
        placeholder="Search Organization Type..."
        class="px-4 py-2 border rounded"
        @input="organizationTypeSearch($event?.target?.value)"
      />
      <router-link :to="{ name: 'organization-type-create' }">
        <button class="flex items-center px-4 py-2 bg-[#000180] text-white rounded hover:bg-indigo-600">
          <PlusOutlined class="mr-2" />
          New Organization Type
        </button>
      </router-link>
    </div>
    <h6 class="font-medium">Organization Type ({{ allOrganizationType?.total || 0 }})</h6>
    <table class="table border-collapse border border-slate-400 w-full bg-white my-4">
      <thead class="table-header">
        <tr>
          <th>Actions</th>
          <th class="text-left font-bold">SL.</th>
          <th class="text-center">Organization Type Name</th>
          <th class="text-center">Status</th>
        </tr>
      </thead>
      <tbody class="table-body">
        <tr v-if="isLoading">
          <td colspan="4" class="text-red-600">Loading . . .</td>
        </tr>
        <tr v-if="!isLoading && !organizationTypeData?.length">
          <td colspan="4" class="text-red-600">No Organization Type Found . . .</td>
        </tr>
        <tr
          v-for="(organizationType, index) in organizationTypeData"
          :key="index"
          class="hover:bg-gray-100 transition-colors duration-200"
        >
          <td class="text-center w-16">
            <button
              type="button"
              class="edit_btn"
              @click="$router.push({ name: 'organization-type-edit', params: { id: organizationType?.id } })"
            >
              <EditOutlined class="align-middle" />
            </button>
            <a-popconfirm
              title="Are you sure you want to delete?"
              @confirm="deleteOrganizationType(index)"
            >
              <button type="button" class="del_btn ml-2">
                <DeleteOutlined class="align-middle" />
              </button>
            </a-popconfirm>
          </td>
          <td class="font-bold">{{ allOrganizationType?.from + index }}</td>
          <td class="text-center">{{ organizationType.name || '-' }}</td>
          <td class="text-center">
            <button
              :class="[
                organizationType.status === 1 ? 'bg-green-500' : 
                organizationType.status === 0 ? 'bg-red-500' : 'bg-gray-500',
                'text-white font-bold py-1 px-3 rounded text-sm'
              ]"
            >
              {{ organizationType.status === 1 ? 'Active' : 
                 organizationType.status === 0 ? 'Inactive' : '-' }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <a-pagination
      v-model:current="page"
      v-model:page-size="paginate"
      :total="allOrganizationType?.total"
      :show-total="(total) => `Total ${total} organization type`"
      @change="handlePagination"
    />
  </MainLayout>
</template>
