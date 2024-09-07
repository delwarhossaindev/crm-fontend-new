<script setup>
import MainLayout from "@/components/MainLayout.vue";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons-vue";
import businessIndustry from "@/stores/setting/business_industry_api.js";
import { onMounted, ref } from "vue";

const isLoading = ref(false);
const businessIndustryData = ref([]);
const allBusinessIndustry = ref({});
const page = ref(1);
const paginate = ref(10);

const deleteBusinessIndustry = async (index) => {
  const businessIndustryId = businessIndustryData.value[index].id;
  try {
    await businessIndustry.deleteBusinessIndustry(businessIndustryId);
    businessIndustryData.value.splice(index, 1);
    allBusinessIndustry.value.total -= 1;
  } catch (error) {
    console.error("Failed to delete organization Type:", error);
  }
};

const getAllBusinessIndustry = async () => {
  isLoading.value = true;
  try {
    const response = await businessIndustry.fetchBusinessIndustryList(page.value, paginate.value);
    allBusinessIndustry.value = response.data;
    businessIndustryData.value = response.data.data;
  } catch (error) {
    console.error("Failed to fetch organization Type:", error);
  } finally {
    isLoading.value = false;
  }
};

const businessIndustrySearch = async (input) => {
  if (input) {
    try {
      const response = await businessIndustry.searchBusinessIndustryList(input);
      allBusinessIndustry.value = response.data;
      businessIndustryData.value = response.data.data;
    } catch (error) {
      console.error("Failed to search organization Type:", error);
    }
  } else {
    getAllBusinessIndustry();
  }
};

const handlePagination = (pageNo) => {
  page.value = pageNo;
  getAllBusinessIndustry();
};

onMounted(() => {
  getAllBusinessIndustry();
});
</script>

<template>
  <MainLayout>
    <div class="flex justify-between mb-4">
      <input
        type="text"
        placeholder="Search Business Industry..."
        class="px-4 py-2 border rounded"
        @input="businessIndustrySearch($event?.target?.value)"
      />
      <router-link :to="{ name: 'business-industry-create' }">
        <button class="flex items-center px-4 py-2 bg-[#000180] text-white rounded hover:bg-indigo-600">
          <PlusOutlined class="mr-2" />
          New Business Industry
        </button>
      </router-link>
    </div>
    <h6 class="font-medium">Business Industry ({{ allBusinessIndustry?.total || 0 }})</h6>
    <table class="table border-collapse border border-slate-400 w-full bg-white my-4">
      <thead class="table-header">
        <tr>
          <th>Actions</th>
          <th class="text-left font-bold">SL.</th>
          <th class="text-center">Business Industry Name</th>
          <th class="text-center">Status</th>
        </tr>
      </thead>
      <tbody class="table-body">
        <tr v-if="isLoading">
          <td colspan="4" class="text-red-600">Loading . . .</td>
        </tr>
        <tr v-if="!isLoading && !businessIndustryData?.length">
          <td colspan="4" class="text-red-600">No Business Industry Found . . .</td>
        </tr>
        <tr
          v-for="(businessIndustry, index) in businessIndustryData"
          :key="index"
          class="hover:bg-gray-100 transition-colors duration-200"
        >
          <td class="text-center w-16">
            <button
              type="button"
              class="edit_btn"
              @click="$router.push({ name: 'business-industry-edit', params: { id: businessIndustry?.id } })"
            >
              <EditOutlined class="align-middle" />
            </button>
            <a-popconfirm
              title="Are you sure you want to delete?"
              @confirm="deleteBusinessIndustry(index)"
            >
              <button type="button" class="del_btn ml-2">
                <DeleteOutlined class="align-middle" />
              </button>
            </a-popconfirm>
          </td>
          <td class="font-bold">{{ allBusinessIndustry?.from + index }}</td>
          <td class="text-center">{{ businessIndustry.name || '-' }}</td>
          <td class="text-center">
            <button
              :class="[
                businessIndustry.status === 1 ? 'bg-green-500' : 
                businessIndustry.status === 0 ? 'bg-red-500' : 'bg-gray-500',
                'text-white font-bold py-1 px-3 rounded text-sm'
              ]"
            >
              {{ businessIndustry.status === 1 ? 'Active' : 
                 businessIndustry.status === 0 ? 'Inactive' : '-' }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <a-pagination
      v-model:current="page"
      v-model:page-size="paginate"
      :total="allBusinessIndustry?.total"
      :show-total="(total) => `Total ${total} business industry`"
      @change="handlePagination"
    />
  </MainLayout>
</template>
