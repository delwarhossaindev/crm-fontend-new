<script setup>
import MainLayout from "@/components/MainLayout.vue";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons-vue";
import designation from "@/stores/setting/designation_api.js";
import { onMounted, ref } from "vue";

const isLoading = ref(false);
const designationData = ref([]);
const allCountries = ref({});
const page = ref(1);
const paginate = ref(10);

const deleteDesignation = async (index) => {
  const designationId = designationData.value[index].id;
  try {
    await designation.deleteDesignation(designationId);
    designationData.value.splice(index, 1);
    allCountries.value.total -= 1;
  } catch (error) {
    console.error("Failed to delete designation:", error);
  }
};

const getAllDesignation = async () => {
  isLoading.value = true;
  try {
    const response = await designation.fetchDesignationList(page.value, paginate.value);
    allCountries.value = response.data;
    designationData.value = response.data.data;
  } catch (error) {
    console.error("Failed to fetch designation:", error);
  } finally {
    isLoading.value = false;
  }
};

const designationSearch = async (input) => {
  if (input) {
    try {
      const response = await designation.searchDesignationList(input);
      allCountries.value = response.data;
      designationData.value = response.data.data;
    } catch (error) {
      console.error("Failed to search designation:", error);
    }
  } else {
    getAllDesignation();
  }
};

const handlePagination = (pageNo) => {
  page.value = pageNo;
  getAllDesignation();
};

onMounted(() => {
  getAllDesignation();
});
</script>

<template>
  <MainLayout>
    <div class="flex justify-between mb-4">
      <input
        type="text"
        placeholder="Search Designation..."
        class="px-4 py-2 border rounded"
        @input="designationSearch($event?.target?.value)"
      />
      <router-link :to="{ name: 'designation-create' }">
        <button class="flex items-center px-4 py-2 bg-[#000180] text-white rounded hover:bg-indigo-600">
          <PlusOutlined class="mr-2" />
          New Designation
        </button>
      </router-link>
    </div>
    <h6 class="font-medium">Designation ({{ allCountries?.total || 0 }})</h6>
    <table class="table border-collapse border border-slate-400 w-full bg-white my-4">
      <thead class="table-header">
        <tr>
          <th>Actions</th>
          <th class="text-left font-bold">SL.</th>
          <th class="text-center">Designation Name</th>
          <th class="text-center">Status</th>
        </tr>
      </thead>
      <tbody class="table-body">
        <tr v-if="isLoading">
          <td colspan="4" class="text-red-600">Loading . . .</td>
        </tr>
        <tr v-if="!isLoading && !designationData?.length">
          <td colspan="4" class="text-red-600">No Designation Found . . .</td>
        </tr>
        <tr
          v-for="(designation, index) in designationData"
          :key="index"
          class="hover:bg-gray-100 transition-colors duration-200"
        >
          <td class="text-center w-16">
            <button
              type="button"
              class="edit_btn"
              @click="$router.push({ name: 'designation-edit', params: { id: designation?.id } })"
            >
              <EditOutlined class="align-middle" />
            </button>
            <a-popconfirm
              title="Are you sure you want to delete?"
              @confirm="deleteDesignation(index)"
            >
              <button type="button" class="del_btn ml-2">
                <DeleteOutlined class="align-middle" />
              </button>
            </a-popconfirm>
          </td>
          <td class="font-bold">{{ allCountries?.from + index }}</td>
          <td class="text-center">{{ designation.name || '-' }}</td>
          <td class="text-center">
            <button
              :class="[
                designation.status === 1 ? 'bg-green-500' : 
                designation.status === 0 ? 'bg-red-500' : 'bg-gray-500',
                'text-white font-bold py-1 px-3 rounded text-sm'
              ]"
            >
              {{ designation.status === 1 ? 'Active' : 
                 designation.status === 0 ? 'Inactive' : '-' }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <a-pagination
      v-model:current="page"
      v-model:page-size="paginate"
      :total="allCountries?.total"
      :show-total="(total) => `Total ${total} designation`"
      @change="handlePagination"
    />
  </MainLayout>
</template>
