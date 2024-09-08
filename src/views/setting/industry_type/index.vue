<script setup>
import MainLayout from "@/components/MainLayout.vue";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons-vue";
import industryType from "@/stores/setting/industry-type-api.js";
import { onMounted, ref } from "vue";

const isLoading = ref(false);
const industryTypeData = ref([]);
const allIndustryType = ref({});
const page = ref(1);
const paginate = ref(10);

const deleteIndustryType = async (index) => {
  const industryTypeId = industryTypeData.value[index].id;
  try {
    await industryType.deleteIndustryType(industryTypeId);
    industryTypeData.value.splice(index, 1);
    allIndustryType.value.total -= 1;
  } catch (error) {
    console.error("Failed to delete organization Type:", error);
  }
};

const getAllIndustryType = async () => {
  isLoading.value = true;
  try {
    const response = await industryType.fetchIndustryTypeList(page.value, paginate.value);
    allIndustryType.value = response.data;
    industryTypeData.value = response.data.data;
  } catch (error) {
    console.error("Failed to fetch organization Type:", error);
  } finally {
    isLoading.value = false;
  }
};

const industryTypeSearch = async (input) => {
  if (input) {
    try {
      const response = await industryType.searchIndustryTypeList(input);
      allIndustryType.value = response.data;
      industryTypeData.value = response.data.data;
    } catch (error) {
      console.error("Failed to search organization Type:", error);
    }
  } else {
    getAllIndustryType();
  }
};

const handlePagination = (pageNo) => {
  page.value = pageNo;
  getAllIndustryType();
};

onMounted(() => {
  getAllIndustryType();
});
</script>

<template>
  <MainLayout>
    <div class="flex justify-between mb-4">
      <input
        type="text"
        placeholder="Search Industry Type..."
        class="px-4 py-2 border rounded"
        @input="industryTypeSearch($event?.target?.value)"
      />
      <router-link :to="{ name: 'industry-type-create' }">
        <button class="flex items-center px-4 py-2 bg-[#000180] text-white rounded hover:bg-indigo-600">
          <PlusOutlined class="mr-2" />
          New Industry Type
        </button>
      </router-link>
    </div>
    <h6 class="font-medium">Industry Type ({{ allIndustryType?.total || 0 }})</h6>
    <table class="table border-collapse border border-slate-400 w-full bg-white my-4">
      <thead class="table-header">
        <tr>
          <th>Actions</th>
          <th class="text-left font-bold">SL.</th>
          <th class="text-center">Industry Type Name</th>
          <th class="text-center">Status</th>
        </tr>
      </thead>
      <tbody class="table-body">
        <tr v-if="isLoading">
          <td colspan="4" class="text-red-600">Loading . . .</td>
        </tr>
        <tr v-if="!isLoading && !industryTypeData?.length">
          <td colspan="4" class="text-red-600">No Industry Type Found . . .</td>
        </tr>
        <tr
          v-for="(industryType, index) in industryTypeData"
          :key="index"
          class="hover:bg-gray-100 transition-colors duration-200"
        >
          <td class="text-center w-16">
            <button
              type="button"
              class="edit_btn"
              @click="$router.push({ name: 'industry-type-edit', params: { id: industryType?.id } })"
            >
              <EditOutlined class="align-middle" />
            </button>
            <a-popconfirm
              title="Are you sure you want to delete?"
              @confirm="deleteIndustryType(index)"
            >
              <button type="button" class="del_btn ml-2">
                <DeleteOutlined class="align-middle" />
              </button>
            </a-popconfirm>
          </td>
          <td class="font-bold">{{ allIndustryType?.from + index }}</td>
          <td class="text-center">{{ industryType.name || '-' }}</td>
          <td class="text-center">
            <button
              :class="[
                industryType.status === 1 ? 'bg-green-500' : 
                industryType.status === 0 ? 'bg-red-500' : 'bg-gray-500',
                'text-white font-bold py-1 px-3 rounded text-sm'
              ]"
            >
              {{ industryType.status === 1 ? 'Active' : 
                 industryType.status === 0 ? 'Inactive' : '-' }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <a-pagination
      v-model:current="page"
      v-model:page-size="paginate"
      :total="allIndustryType?.total"
      :show-total="(total) => `Total ${total} industry type`"
      @change="handlePagination"
    />
  </MainLayout>
</template>
