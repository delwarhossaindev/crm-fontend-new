<script setup>
import MainLayout from "@/components/MainLayout.vue";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons-vue";
import department from "@/stores/setting/department_api.js";
import { onMounted, ref } from "vue";

const isLoading = ref(false);
const departmentData = ref([]);
const allDepartment = ref({});
const page = ref(1);
const paginate = ref(10);

const deleteDepartment = async (index) => {
  const departmentId = departmentData.value[index].id;
  try {
    await department.deleteDepartment(departmentId);
    departmentData.value.splice(index, 1);
    allDepartment.value.total -= 1;
  } catch (error) {
    console.error("Failed to delete department:", error);
  }
};

const getAllDepartment = async () => {
  isLoading.value = true;
  try {
    const response = await department.fetchDepartmentList(page.value, paginate.value);
    allDepartment.value = response.data;
    departmentData.value = response.data.data;
  } catch (error) {
    console.error("Failed to fetch department:", error);
  } finally {
    isLoading.value = false;
  }
};

const departmentSearch = async (input) => {
  if (input) {
    try {
      const response = await department.searchDepartmentList(input);
      allDepartment.value = response.data;
      departmentData.value = response.data.data;
    } catch (error) {
      console.error("Failed to search department:", error);
    }
  } else {
    getAllDepartment();
  }
};

const handlePagination = (pageNo) => {
  page.value = pageNo;
  getAllDepartment();
};

onMounted(() => {
  getAllDepartment();
});
</script>

<template>
  <MainLayout>
    <div class="flex justify-between mb-4">
      <input
        type="text"
        placeholder="Search Department..."
        class="px-4 py-2 border rounded"
        @input="departmentSearch($event?.target?.value)"
      />
      <router-link :to="{ name: 'department-create' }">
        <button class="flex items-center px-4 py-2 bg-[#000180] text-white rounded hover:bg-indigo-600">
          <PlusOutlined class="mr-2" />
          New Department
        </button>
      </router-link>
    </div>
    <h6 class="font-medium">Department ({{ allDepartment?.total || 0 }})</h6>
    <table class="table border-collapse border border-slate-400 w-full bg-white my-4">
      <thead class="table-header">
        <tr>
          <th>Actions</th>
          <th class="text-left font-bold">SL.</th>
          <th class="text-center">Department Name</th>
          <th class="text-center">Status</th>
        </tr>
      </thead>
      <tbody class="table-body">
        <tr v-if="isLoading">
          <td colspan="4" class="text-red-600">Loading . . .</td>
        </tr>
        <tr v-if="!isLoading && !departmentData?.length">
          <td colspan="4" class="text-red-600">No Department Found . . .</td>
        </tr>
        <tr
          v-for="(department, index) in departmentData"
          :key="index"
          class="hover:bg-gray-100 transition-colors duration-200"
        >
          <td class="text-center w-16">
            <button
              type="button"
              class="edit_btn"
              @click="$router.push({ name: 'department-edit', params: { id: department?.id } })"
            >
              <EditOutlined class="align-middle" />
            </button>
            <a-popconfirm
              title="Are you sure you want to delete?"
              @confirm="deleteDepartment(index)"
            >
              <button type="button" class="del_btn ml-2">
                <DeleteOutlined class="align-middle" />
              </button>
            </a-popconfirm>
          </td>
          <td class="font-bold">{{ allDepartment?.from + index }}</td>
          <td class="text-center">{{ department.name || '-' }}</td>
          <td class="text-center">
            <button
              :class="[
                department.status === 1 ? 'bg-green-500' : 
                department.status === 0 ? 'bg-red-500' : 'bg-gray-500',
                'text-white font-bold py-1 px-3 rounded text-sm'
              ]"
            >
              {{ department.status === 1 ? 'Active' : 
                 department.status === 0 ? 'Inactive' : '-' }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <a-pagination
      v-model:current="page"
      v-model:page-size="paginate"
      :total="allDepartment?.total"
      :show-total="(total) => `Total ${total} department`"
      @change="handlePagination"
    />
  </MainLayout>
</template>
