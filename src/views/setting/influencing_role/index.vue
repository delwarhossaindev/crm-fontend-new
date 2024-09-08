<script setup>
import MainLayout from "@/components/MainLayout.vue";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons-vue";
import influencingRole from "@/stores/setting/influencing-role-api.js";
import { onMounted, ref } from "vue";

const isLoading = ref(false);
const influencingRoleData = ref([]);
const allInfluencingRole = ref({});
const page = ref(1);
const paginate = ref(10);

const deleteInfluencingRole = async (index) => {
  const influencingRoleId = influencingRoleData.value[index].id;
  try {
    await influencingRole.deleteInfluencingRole(influencingRoleId);
    influencingRoleData.value.splice(index, 1);
    allInfluencingRole.value.total -= 1;
  } catch (error) {
    console.error("Failed to delete organization Type:", error);
  }
};

const getAllInfluencingRole = async () => {
  isLoading.value = true;
  try {
    const response = await influencingRole.fetchInfluencingRoleList(page.value, paginate.value);
    allInfluencingRole.value = response.data;
    influencingRoleData.value = response.data.data;
  } catch (error) {
    console.error("Failed to fetch organization Type:", error);
  } finally {
    isLoading.value = false;
  }
};

const influencingRoleSearch = async (input) => {
  if (input) {
    try {
      const response = await influencingRole.searchInfluencingRoleList(input);
      allInfluencingRole.value = response.data;
      influencingRoleData.value = response.data.data;
    } catch (error) {
      console.error("Failed to search organization Type:", error);
    }
  } else {
    getAllInfluencingRole();
  }
};

const handlePagination = (pageNo) => {
  page.value = pageNo;
  getAllInfluencingRole();
};

onMounted(() => {
  getAllInfluencingRole();
});
</script>

<template>
  <MainLayout>
    <div class="flex justify-between mb-4">
      <input
        type="text"
        placeholder="Search Influencing Role..."
        class="px-4 py-2 border rounded"
        @input="influencingRoleSearch($event?.target?.value)"
      />
      <router-link :to="{ name: 'influencing-role-create' }">
        <button class="flex items-center px-4 py-2 bg-[#000180] text-white rounded hover:bg-indigo-600">
          <PlusOutlined class="mr-2" />
          New Influencing Role
        </button>
      </router-link>
    </div>
    <h6 class="font-medium">Influencing Role ({{ allInfluencingRole?.total || 0 }})</h6>
    <table class="table border-collapse border border-slate-400 w-full bg-white my-4">
      <thead class="table-header">
        <tr>
          <th>Actions</th>
          <th class="text-left font-bold">SL.</th>
          <th class="text-center">Influencing Role Name</th>
          <th class="text-center">Status</th>
        </tr>
      </thead>
      <tbody class="table-body">
        <tr v-if="isLoading">
          <td colspan="4" class="text-red-600">Loading . . .</td>
        </tr>
        <tr v-if="!isLoading && !influencingRoleData?.length">
          <td colspan="4" class="text-red-600">No Influencing Role Found . . .</td>
        </tr>
        <tr
          v-for="(influencingRole, index) in influencingRoleData"
          :key="index"
          class="hover:bg-gray-100 transition-colors duration-200"
        >
          <td class="text-center w-16">
            <button
              type="button"
              class="edit_btn"
              @click="$router.push({ name: 'influencing-role-edit', params: { id: influencingRole?.id } })"
            >
              <EditOutlined class="align-middle" />
            </button>
            <a-popconfirm
              title="Are you sure you want to delete?"
              @confirm="deleteInfluencingRole(index)"
            >
              <button type="button" class="del_btn ml-2">
                <DeleteOutlined class="align-middle" />
              </button>
            </a-popconfirm>
          </td>
          <td class="font-bold">{{ allInfluencingRole?.from + index }}</td>
          <td class="text-center">{{ influencingRole.name || '-' }}</td>
          <td class="text-center">
            <button
              :class="[
                influencingRole.status === 1 ? 'bg-green-500' : 
                influencingRole.status === 0 ? 'bg-red-500' : 'bg-gray-500',
                'text-white font-bold py-1 px-3 rounded text-sm'
              ]"
            >
              {{ influencingRole.status === 1 ? 'Active' : 
                 influencingRole.status === 0 ? 'Inactive' : '-' }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <a-pagination
      v-model:current="page"
      v-model:page-size="paginate"
      :total="allInfluencingRole?.total"
      :show-total="(total) => `Total ${total} influencing role`"
      @change="handlePagination"
    />
  </MainLayout>
</template>
