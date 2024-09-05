<script setup>
import MainLayout from "@/components/MainLayout.vue";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons-vue";
import gender from "@/stores/setting/gender_api.js";
import { onMounted, ref } from "vue";

const isLoading = ref(false);
const genderData = ref([]);
const allGenders = ref({});
const page = ref(1);
const paginate = ref(10);

const deleteGender = async (index) => {
  const genderId = genderData.value[index].id;
  try {
    await gender.deleteGender(genderId);
    genderData.value.splice(index, 1);
    allGenders.value.total -= 1;
  } catch (error) {
    console.error("Failed to delete gender:", error);
  }
};

const getAllGender = async () => {
  isLoading.value = true;
  try {
    const response = await gender.fetchGenderList(page.value, paginate.value);
    allGenders.value = response.data;
    genderData.value = response.data.data;
  } catch (error) {
    console.error("Failed to fetch gender:", error);
  } finally {
    isLoading.value = false;
  }
};

const genderSearch = async (input) => {
  if (input) {
    try {
      const response = await gender.searchGenderList(input);
      allGenders.value = response.data;
      genderData.value = response.data.data;
    } catch (error) {
      console.error("Failed to search gender:", error);
    }
  } else {
    getAllGender();
  }
};

const handlePagination = (pageNo) => {
  page.value = pageNo;
  getAllGender();
};

onMounted(() => {
  getAllGender();
});
</script>

<template>
  <MainLayout>
    <div class="flex justify-between mb-4">
      <input
        type="text"
        placeholder="Search Gender..."
        class="px-4 py-2 border rounded"
        @input="genderSearch($event?.target?.value)"
      />
      <router-link :to="{ name: 'gender-create' }">
        <button class="flex items-center px-4 py-2 bg-[#000180] text-white rounded hover:bg-indigo-600">
          <PlusOutlined class="mr-2" />
          New Gender
        </button>
      </router-link>
    </div>
    <h6 class="font-medium">Gender ({{ allGenders?.total || 0 }})</h6>
    <table class="table border-collapse border border-slate-400 w-full bg-white my-4">
      <thead class="table-header">
        <tr>
          <th>Actions</th>
          <th class="text-left font-bold">SL.</th>
          <th class="text-center">Gender Name</th>
          <th class="text-center">Status</th>
        </tr>
      </thead>
      <tbody class="table-body">
        <tr v-if="isLoading">
          <td colspan="4" class="text-red-600">Loading . . .</td>
        </tr>
        <tr v-if="!isLoading && !genderData?.length">
          <td colspan="4" class="text-red-600">No Gender Found . . .</td>
        </tr>
        <tr
          v-for="(gender, index) in genderData"
          :key="index"
          class="hover:bg-gray-100 transition-colors duration-200"
        >
          <td class="text-center w-16">
            <button
              type="button"
              class="edit_btn"
              @click="$router.push({ name: 'gender-edit', params: { id: gender?.id } })"
            >
              <EditOutlined class="align-middle" />
            </button>
            <a-popconfirm
              title="Are you sure you want to delete?"
              @confirm="deleteGender(index)"
            >
              <button type="button" class="del_btn ml-2">
                <DeleteOutlined class="align-middle" />
              </button>
            </a-popconfirm>
          </td>
          <td class="font-bold">{{ allGenders?.from + index }}</td>
          <td class="text-center">{{ gender.name || '-' }}</td>
          <td class="text-center">
            <button
              :class="[
                gender.status === 1 ? 'bg-green-500' : 
                gender.status === 0 ? 'bg-red-500' : 'bg-gray-500',
                'text-white font-bold py-1 px-3 rounded text-sm'
              ]"
            >
              {{ gender.status === 1 ? 'Active' : 
                 gender.status === 0 ? 'Inactive' : '-' }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <a-pagination
      v-model:current="page"
      v-model:page-size="paginate"
      :total="allGenders?.total"
      :show-total="(total) => `Total ${total} gender`"
      @change="handlePagination"
    />
  </MainLayout>
</template>
