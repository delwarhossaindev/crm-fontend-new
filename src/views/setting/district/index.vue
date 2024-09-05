<script setup>
import MainLayout from "@/components/MainLayout.vue";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons-vue";
import district from "@/stores/setting/district_api.js";
import { onMounted, ref } from "vue";

const isLoading = ref(false);
const districtData = ref([]);
const allCountries = ref({});
const page = ref(1);
const paginate = ref(10);

const deleteDistrict = async (index) => {
  const districtId = districtData.value[index].id;
  try {
    await district.deleteDistrict(districtId);
    districtData.value.splice(index, 1);
    allCountries.value.total -= 1;
  } catch (error) {
    console.error("Failed to delete district:", error);
  }
};

const getAllDistrict = async () => {
  isLoading.value = true;
  try {
    const response = await district.fetchDistrictList(page.value, paginate.value);
    allCountries.value = response.data;
    districtData.value = response.data.data;
  } catch (error) {
    console.error("Failed to fetch district:", error);
  } finally {
    isLoading.value = false;
  }
};

const districtSearch = async (input) => {
  if (input) {
    try {
      const response = await district.searchDistrictList(input);
      allCountries.value = response.data;
      districtData.value = response.data.data;
    } catch (error) {
      console.error("Failed to search district:", error);
    }
  } else {
    getAllDistrict();
  }
};

const handlePagination = (pageNo) => {
  page.value = pageNo;
  getAllDistrict();
};

onMounted(() => {
  getAllDistrict();
});
</script>

<template>
  <MainLayout>
    <div class="flex justify-between mb-4">
      <input
        type="text"
        placeholder="Search District..."
        class="px-4 py-2 border rounded"
        @input="districtSearch($event?.target?.value)"
      />
      <router-link :to="{ name: 'district-create' }">
        <button class="flex items-center px-4 py-2 bg-[#000180] text-white rounded hover:bg-indigo-600">
          <PlusOutlined class="mr-2" />
          New District
        </button>
      </router-link>
    </div>
    <h6 class="font-medium">District ({{ allCountries?.total || 0 }})</h6>
    <table class="table border-collapse border border-slate-400 w-full bg-white my-4">
      <thead class="table-header">
        <tr>
          <th>Actions</th>
          <th class="text-left font-bold">SL.</th>
          <th class="text-center">District Name</th>
          <th class="text-center">Status</th>
        </tr>
      </thead>
      <tbody class="table-body">
        <tr v-if="isLoading">
          <td colspan="4" class="text-red-600">Loading . . .</td>
        </tr>
        <tr v-if="!isLoading && !districtData?.length">
          <td colspan="4" class="text-red-600">No District Found . . .</td>
        </tr>
        <tr
          v-for="(district, index) in districtData"
          :key="index"
          class="hover:bg-gray-100 transition-colors duration-200"
        >
          <td class="text-center w-16">
            <button
              type="button"
              class="edit_btn"
              @click="$router.push({ name: 'district-edit', params: { id: district?.id } })"
            >
              <EditOutlined class="align-middle" />
            </button>
            <a-popconfirm
              title="Are you sure you want to delete?"
              @confirm="deleteDistrict(index)"
            >
              <button type="button" class="del_btn ml-2">
                <DeleteOutlined class="align-middle" />
              </button>
            </a-popconfirm>
          </td>
          <td class="font-bold">{{ allCountries?.from + index }}</td>
          <td class="text-center">{{ district.name || '-' }}</td>
          <td class="text-center">
            <button
              :class="[
                district.status === 1 ? 'bg-green-500' : 
                district.status === 0 ? 'bg-red-500' : 'bg-gray-500',
                'text-white font-bold py-1 px-3 rounded text-sm'
              ]"
            >
              {{ district.status === 1 ? 'Active' : 
                 district.status === 0 ? 'Inactive' : '-' }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <a-pagination
      v-model:current="page"
      v-model:page-size="paginate"
      :total="allCountries?.total"
      :show-total="(total) => `Total ${total} district`"
      @change="handlePagination"
    />
  </MainLayout>
</template>
