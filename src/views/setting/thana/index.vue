<script setup>
import MainLayout from "@/components/MainLayout.vue";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons-vue";
import thana from "@/stores/setting/thana_api.js";
import { onMounted, ref } from "vue";

const isLoading = ref(false);
const thanaData = ref([]);
const allThana = ref({});
const page = ref(1);
const paginate = ref(10);

const deleteThana = async (index) => {
  const thanaId = thanaData.value[index].id;
  try {
    await thana.deleteThana(thanaId);
    thanaData.value.splice(index, 1);
    allThana.value.total -= 1;
  } catch (error) {
    console.error("Failed to delete thana:", error);
  }
};

const getAllThana = async () => {
  isLoading.value = true;
  try {
    const response = await thana.fetchThanaList(page.value, paginate.value);
    allThana.value = response.data;
    thanaData.value = response.data.data;
  } catch (error) {
    console.error("Failed to fetch thana:", error);
  } finally {
    isLoading.value = false;
  }
};

const thanaSearch = async (input) => {
  if (input) {
    try {
      const response = await thana.searchThanaList(input);
      allThana.value = response.data;
      thanaData.value = response.data.data;
    } catch (error) {
      console.error("Failed to search thana:", error);
    }
  } else {
    getAllThana();
  }
};

const handlePagination = (pageNo) => {
  page.value = pageNo;
  getAllThana();
};

onMounted(() => {
  getAllThana();
});
</script>

<template>
  <MainLayout>
    <div class="flex justify-between mb-4">
      <input
        type="text"
        placeholder="Search Thana..."
        class="px-4 py-2 border rounded"
        @input="thanaSearch($event?.target?.value)"
      />
      <router-link :to="{ name: 'thana-create' }">
        <button class="flex items-center px-4 py-2 bg-[#000180] text-white rounded hover:bg-indigo-600">
          <PlusOutlined class="mr-2" />
          New Thana
        </button>
      </router-link>
    </div>
    <h6 class="font-medium">Thana ({{ allThana?.total || 0 }})</h6>
    <table class="table border-collapse border border-slate-400 w-full bg-white my-4">
      <thead class="table-header">
        <tr>
          <th>Actions</th>
          <th class="text-left font-bold">SL.</th>
          <th class="text-center">Thana Name</th>
          <th class="text-center">Status</th>
        </tr>
      </thead>
      <tbody class="table-body">
        <tr v-if="isLoading">
          <td colspan="4" class="text-red-600">Loading . . .</td>
        </tr>
        <tr v-if="!isLoading && !thanaData?.length">
          <td colspan="4" class="text-red-600">No Thana Found . . .</td>
        </tr>
        <tr
          v-for="(thana, index) in thanaData"
          :key="index"
          class="hover:bg-gray-100 transition-colors duration-200"
        >
          <td class="text-center w-16">
            <button
              type="button"
              class="edit_btn"
              @click="$router.push({ name: 'thana-edit', params: { id: thana?.id } })"
            >
              <EditOutlined class="align-middle" />
            </button>
            <a-popconfirm
              title="Are you sure you want to delete?"
              @confirm="deleteThana(index)"
            >
              <button type="button" class="del_btn ml-2">
                <DeleteOutlined class="align-middle" />
              </button>
            </a-popconfirm>
          </td>
          <td class="font-bold">{{ allThana?.from + index }}</td>
          <td class="text-center">{{ thana.name || '-' }}</td>
          <td class="text-center">
            <button
              :class="[
                thana.status === 1 ? 'bg-green-500' : 
                thana.status === 0 ? 'bg-red-500' : 'bg-gray-500',
                'text-white font-bold py-1 px-3 rounded text-sm'
              ]"
            >
              {{ thana.status === 1 ? 'Active' : 
                 thana.status === 0 ? 'Inactive' : '-' }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <a-pagination
      v-model:current="page"
      v-model:page-size="paginate"
      :total="allThana?.total"
      :show-total="(total) => `Total ${total} thana`"
      @change="handlePagination"
    />
  </MainLayout>
</template>
