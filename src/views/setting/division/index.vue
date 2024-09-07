<script setup>
import MainLayout from "@/components/MainLayout.vue";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons-vue";
import division from "@/stores/setting/division_api.js";
import { onMounted, ref } from "vue";

const isLoading = ref(false);
const divisionData = ref([]);
const allDivision = ref({});
const page = ref(1);
const paginate = ref(10);

const deleteDivision = async (index) => {
  const divisionId = divisionData.value[index].id;
  try {
    await division.deleteDivision(divisionId);
    divisionData.value.splice(index, 1);
    allDivision.value.total -= 1;
  } catch (error) {
    console.error("Failed to delete division:", error);
  }
};

const getAllDivision = async () => {
  isLoading.value = true;
  try {
    const response = await division.fetchDivisionList(page.value, paginate.value);
    allDivision.value = response.data;
    divisionData.value = response.data.data;
  } catch (error) {
    console.error("Failed to fetch division:", error);
  } finally {
    isLoading.value = false;
  }
};

const divisionSearch = async (input) => {
  if (input) {
    try {
      const response = await division.searchDivisionList(input);
      allDivision.value = response.data;
      divisionData.value = response.data.data;
    } catch (error) {
      console.error("Failed to search division:", error);
    }
  } else {
    getAllDivision();
  }
};

const handlePagination = (pageNo) => {
  page.value = pageNo;
  getAllDivision();
};

onMounted(() => {
  getAllDivision();
});
</script>

<template>
  <MainLayout>
    <div class="flex justify-between mb-4">
      <input
        type="text"
        placeholder="Search Division..."
        class="px-4 py-2 border rounded"
        @input="divisionSearch($event?.target?.value)"
      />
      <router-link :to="{ name: 'division-create' }">
        <button class="flex items-center px-4 py-2 bg-[#000180] text-white rounded hover:bg-indigo-600">
          <PlusOutlined class="mr-2" />
          New Division
        </button>
      </router-link>
    </div>
    <h6 class="font-medium">Division ({{ allDivision?.total || 0 }})</h6>
    <table class="table border-collapse border border-slate-400 w-full bg-white my-4">
      <thead class="table-header">
        <tr>
          <th>Actions</th>
          <th class="text-left font-bold">SL.</th>
          <th class="text-center">Division Name</th>
          <th class="text-center">Status</th>
        </tr>
      </thead>
      <tbody class="table-body">
        <tr v-if="isLoading">
          <td colspan="4" class="text-red-600">Loading . . .</td>
        </tr>
        <tr v-if="!isLoading && !divisionData?.length">
          <td colspan="4" class="text-red-600">No Division Found . . .</td>
        </tr>
        <tr
          v-for="(division, index) in divisionData"
          :key="index"
          class="hover:bg-gray-100 transition-colors duration-200"
        >
          <td class="text-center w-16">
            <button
              type="button"
              class="edit_btn"
              @click="$router.push({ name: 'division-edit', params: { id: division?.id } })"
            >
              <EditOutlined class="align-middle" />
            </button>
            <a-popconfirm
              title="Are you sure you want to delete?"
              @confirm="deleteDivision(index)"
            >
              <button type="button" class="del_btn ml-2">
                <DeleteOutlined class="align-middle" />
              </button>
            </a-popconfirm>
          </td>
          <td class="font-bold">{{ allDivision?.from + index }}</td>
          <td class="text-center">{{ division.name || '-' }}</td>
          <td class="text-center">
            <button
              :class="[
                division.status === 1 ? 'bg-green-500' : 
                division.status === 0 ? 'bg-red-500' : 'bg-gray-500',
                'text-white font-bold py-1 px-3 rounded text-sm'
              ]"
            >
              {{ division.status === 1 ? 'Active' : 
                 division.status === 0 ? 'Inactive' : '-' }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <a-pagination
      v-model:current="page"
      v-model:page-size="paginate"
      :total="allDivision?.total"
      :show-total="(total) => `Total ${total} division`"
      @change="handlePagination"
    />
  </MainLayout>
</template>
