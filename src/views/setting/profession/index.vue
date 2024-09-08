<script setup>
import MainLayout from "@/components/MainLayout.vue";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons-vue";
import professions from "@/stores/setting/profession-api.js";
import { onMounted, ref } from "vue";

const isLoading = ref(false);
const professionsData = ref([]);
const allProfessions = ref({});
const page = ref(1);
const paginate = ref(10);

const deleteProfession = async (index) => {
  const professionId = professionsData.value[index].id;
  try {
    await professions.deleteProfession(professionId);
    professionsData.value.splice(index, 1);
    allProfessions.value.total -= 1;
  } catch (error) {
    console.error("Failed to delete profession:", error);
  }
};

const getAllProfession = async () => {
  isLoading.value = true;
  try {
    const response = await professions.fetchProfessionList(page.value, paginate.value);
    allProfessions.value = response.data;
    professionsData.value = response.data.data;
  } catch (error) {
    console.error("Failed to fetch professions:", error);
  } finally {
    isLoading.value = false;
  }
};

const professionsSearch = async (input) => {
  if (input) {
    try {
      const response = await professions.searchProfessionList(input);
      allProfessions.value = response.data;
      professionsData.value = response.data.data;
    } catch (error) {
      console.error("Failed to search professions:", error);
    }
  } else {
    getAllProfession();
  }
};

const handlePagination = (pageNo) => {
  page.value = pageNo;
  getAllProfession();
};

onMounted(() => {
  getAllProfession();
});
</script>

<template>
  <MainLayout>
    <div class="flex justify-between mb-4">
      <input
        type="text"
        placeholder="Search Profession..."
        class="px-4 py-2 border rounded"
        @input="professionsSearch($event?.target?.value)"
      />
      <router-link :to="{ name: 'profession-create' }">
        <button class="flex items-center px-4 py-2 bg-[#000180] text-white rounded hover:bg-indigo-600">
          <PlusOutlined class="mr-2" />
          New Profession
        </button>
      </router-link>
    </div>
    <h6 class="font-medium">Profession ({{ allProfessions?.total || 0 }})</h6>
    <table class="table border-collapse border border-slate-400 w-full bg-white my-4">
      <thead class="table-header">
        <tr>
          <th>Actions</th>
          <th class="text-left font-bold">SL.</th>
          <th class="text-center">Profession Name</th>
          <th class="text-center">Status</th>
        </tr>
      </thead>
      <tbody class="table-body">
        <tr v-if="isLoading">
          <td colspan="4" class="text-red-600">Loading . . .</td>
        </tr>
        <tr v-if="!isLoading && !professionsData?.length">
          <td colspan="4" class="text-red-600">No Profession Found . . .</td>
        </tr>
        <tr
          v-for="(profession, index) in professionsData"
          :key="index"
          class="hover:bg-gray-100 transition-colors duration-200"
        >
          <td class="text-center w-16">
            <button
              type="button"
              class="edit_btn"
              @click="$router.push({ name: 'profession-edit', params: { id: profession?.id } })"
            >
              <EditOutlined class="align-middle" />
            </button>
            <a-popconfirm
              title="Are you sure you want to delete?"
              @confirm="deleteProfession(index)"
            >
              <button type="button" class="del_btn ml-2">
                <DeleteOutlined class="align-middle" />
              </button>
            </a-popconfirm>
          </td>
          <td class="font-bold">{{ allProfessions?.from + index }}</td>
          <td class="text-center">{{ profession.name || '-' }}</td>
          <td class="text-center">
            <button
              :class="[
                profession.status === 1 ? 'bg-green-500' : 
                profession.status === 0 ? 'bg-red-500' : 'bg-gray-500',
                'text-white font-bold py-1 px-3 rounded text-sm'
              ]"
            >
              {{ profession.status === 1 ? 'Active' : 
                 profession.status === 0 ? 'Inactive' : '-' }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <a-pagination
      v-model:current="page"
      v-model:page-size="paginate"
      :total="allProfessions?.total"
      :show-total="(total) => `Total ${total} professions`"
      @change="handlePagination"
    />
  </MainLayout>
</template>
