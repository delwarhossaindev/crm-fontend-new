<template>
  <MainLayout>
    <div class="flex justify-between mb-4">
      <input 
        type="text" 
        placeholder="Employee Search..." 
        class="px-4 py-2 border rounded w-1/3"
        v-model="searchQuery"
        @input="handleSearch" 
      />
     
    </div>
    <h1 class="title">All Employees ({{ allData?.total || 0 }})</h1>
    <table class="table text-sm border-collapse border border-slate-400 w-full bg-white my-4">
      <thead class="table-header">
        <tr>
          <th class="text-center">Actions</th>
          <th class="text-right">SL No</th>
          <th class="text-right">Staff ID</th>
          <th class="text-left">Name</th>
          <th class="text-left">Position</th>
          <th class="text-right">Mobile</th>
          <th class="text-left">Email</th>
        </tr>
      </thead>

      <tbody class="table-body">
        <tr v-if="isLoading">
          <td colspan="7">Loading . . .</td>
        </tr>
        <tr v-if="!isLoading && !allData?.data?.length">
          <td colspan="7">No Data Found</td>
        </tr>
        <tr v-for="(item, index) in allData?.data" :key="index">
          <td class="text-center">
            <button 
              @click="
                $router.push({
                  name: 'supplier-edit',
                  params: { id: item?.id },
                })
              " 
              class="px-2 py-1 bg-[#000180] text-white rounded hover:bg-indigo-600 mr-2"
            >
              <EditOutlined class="align-middle" />
            </button>
            <button 
              @click="
                $router.push({
                  name: 'supplier-edit',
                  params: { id: item?.id },
                })
              " 
              class="px-2 py-1 bg-[#000180] text-white rounded hover:bg-indigo-600 mr-2"
            >
              <EyeOutlined class="align-middle" />
            </button>
            
            
          </td>
          <td class="text-right">{{ index + 1 + (page - 1) * itemsPerPage }}</td>
          <td class="text-right">{{ item.staff_id || "-" }}</td>
          <td>{{ item.personal_info.full_name || "-" }}</td>
          <td>{{ item.position || "-" }}</td>
          <td class="text-right">{{ item.personal_info.contact_no_one || "-" }}</td>
          <td>{{ item.personal_info.email_id || "-" }}</td>
        </tr>
      </tbody>
    </table>
    <a-pagination
      v-if="allData?.total > itemsPerPage"
      :current="page"
      :page-size="itemsPerPage"
      :total="allData?.total"
      @change="handlePagination"
    />
  </MainLayout>
</template>

<script setup>
import MainLayout from "@/components/MainLayout.vue";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons-vue";

import employee from "@/stores/employee_api.js";
import { onMounted, ref, watch } from "vue";

const allData = ref({});
const isLoading = ref(false);
const page = ref(1);
const itemsPerPage = ref(1);
const searchQuery = ref('');

const fetchData = async () => {
  isLoading.value = true;
  try {
    const response = await employee.fetchEmployeeList(page.value, itemsPerPage.value, searchQuery.value);
    allData.value = response.data;
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};
const handlePagination = (pageNo) => {
  page.value = pageNo;
  fetchData();
};

const handleSearch = () => {
  page.value = 1;
  fetchData();
};
onMounted(() => fetchData());
watch([page, itemsPerPage, searchQuery], fetchData);
</script>
