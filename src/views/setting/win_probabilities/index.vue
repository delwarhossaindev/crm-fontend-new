<script setup>
import MainLayout from "@/components/MainLayout.vue";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons-vue";
import winProbabilities from "@/stores/setting/win-probabilities-api.js";
import { onMounted, ref } from "vue";

const isLoading = ref(false);
const winProbabilitiesData = ref([]);
const allWinProbabilities = ref({});
const page = ref(1);
const paginate = ref(10);

const deleteWinProbabilities = async (index) => {
  const winProbabilitiesId = winProbabilitiesData.value[index].id;
  try {
    await winProbabilities.deleteWinProbabilities(winProbabilitiesId);
    winProbabilitiesData.value.splice(index, 1);
    allWinProbabilities.value.total -= 1;
  } catch (error) {
    console.error("Failed to delete organization Type:", error);
  }
};

const getAllWinProbabilities = async () => {
  isLoading.value = true;
  try {
    const response = await winProbabilities.fetchWinProbabilitiesList(page.value, paginate.value);
    allWinProbabilities.value = response.data;
    winProbabilitiesData.value = response.data.data;
  } catch (error) {
    console.error("Failed to fetch organization Type:", error);
  } finally {
    isLoading.value = false;
  }
};

const winProbabilitiesSearch = async (input) => {
  if (input) {
    try {
      const response = await winProbabilities.searchWinProbabilitiesList(input);
      allWinProbabilities.value = response.data;
      winProbabilitiesData.value = response.data.data;
    } catch (error) {
      console.error("Failed to search organization Type:", error);
    }
  } else {
    getAllWinProbabilities();
  }
};

const handlePagination = (pageNo) => {
  page.value = pageNo;
  getAllWinProbabilities();
};

onMounted(() => {
  getAllWinProbabilities();
});
</script>

<template>
  <MainLayout>
    <div class="flex justify-between mb-4">
      <input
        type="text"
        placeholder="Search Win Probabilities..."
        class="px-4 py-2 border rounded"
        @input="winProbabilitiesSearch($event?.target?.value)"
      />
      <router-link :to="{ name: 'win-probabilities-create' }">
        <button class="flex items-center px-4 py-2 bg-[#000180] text-white rounded hover:bg-indigo-600">
          <PlusOutlined class="mr-2" />
          New Win Probabilities
        </button>
      </router-link>
    </div>
    <h6 class="font-medium">Win Probabilities ({{ allWinProbabilities?.total || 0 }})</h6>
    <table class="table border-collapse border border-slate-400 w-full bg-white my-4">
      <thead class="table-header">
        <tr>
          <th>Actions</th>
          <th class="text-left font-bold">SL.</th>
          <th class="text-center">Win Probabilities Name</th>
          <th class="text-center">Status</th>
        </tr>
      </thead>
      <tbody class="table-body">
        <tr v-if="isLoading">
          <td colspan="4" class="text-red-600">Loading . . .</td>
        </tr>
        <tr v-if="!isLoading && !winProbabilitiesData?.length">
          <td colspan="4" class="text-red-600">No Win Probabilities Found . . .</td>
        </tr>
        <tr
          v-for="(winProbabilities, index) in winProbabilitiesData"
          :key="index"
          class="hover:bg-gray-100 transition-colors duration-200"
        >
          <td class="text-center w-16">
            <button
              type="button"
              class="edit_btn"
              @click="$router.push({ name: 'win-probabilities-edit', params: { id: winProbabilities?.id } })"
            >
              <EditOutlined class="align-middle" />
            </button>
            <a-popconfirm
              title="Are you sure you want to delete?"
              @confirm="deleteWinProbabilities(index)"
            >
              <button type="button" class="del_btn ml-2">
                <DeleteOutlined class="align-middle" />
              </button>
            </a-popconfirm>
          </td>
          <td class="font-bold">{{ allWinProbabilities?.from + index }}</td>
          <td class="text-center">{{ winProbabilities.name || '-' }}</td>
          <td class="text-center">
            <button
              :class="[
                winProbabilities.status === 1 ? 'bg-green-500' : 
                winProbabilities.status === 0 ? 'bg-red-500' : 'bg-gray-500',
                'text-white font-bold py-1 px-3 rounded text-sm'
              ]"
            >
              {{ winProbabilities.status === 1 ? 'Active' : 
                 winProbabilities.status === 0 ? 'Inactive' : '-' }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <a-pagination
      v-model:current="page"
      v-model:page-size="paginate"
      :total="allWinProbabilities?.total"
      :show-total="(total) => `Total ${total} win probabilities`"
      @change="handlePagination"
    />
  </MainLayout>
</template>
