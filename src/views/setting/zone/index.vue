<script setup>
import MainLayout from "@/components/MainLayout.vue";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons-vue";
import zone from "@/stores/setting/zone-api.js";
import { onMounted, ref } from "vue";

// State
const isLoading = ref(false);
const zoneData = ref([]);
const allZone = ref({});
const page = ref(1);
const paginate = ref(10);

// Fetch zones
const getAllZone = async () => {
  isLoading.value = true;
  try {
    const response = await zone.fetchZoneList(page.value, paginate.value);
    allZone.value = response.data;
    zoneData.value = response.data.data;
  } catch (error) {
    console.error("Failed to fetch zone:", error);
  } finally {
    isLoading.value = false;
  }
};

// Delete zone
const deleteZone = async (index) => {
  const zoneId = zoneData.value[index].id;
  try {
    await zone.deleteZone(zoneId);
    zoneData.value.splice(index, 1);
    allZone.value.total -= 1;
  } catch (error) {
    console.error("Failed to delete zone:", error);
  }
};

// Search zones
const zoneSearch = async (input) => {
  if (input) {
    try {
      const response = await zone.searchZoneList(input);
      allZone.value = response.data;
      zoneData.value = response.data.data;
    } catch (error) {
      console.error("Failed to search zone:", error);
    }
  } else {
    getAllZone();
  }
};

// Handle pagination
const handlePagination = (pageNo) => {
  page.value = pageNo;
  getAllZone();
};

// Fetch initial zone data
onMounted(getAllZone);
</script>

<template>
  <MainLayout>
    <div class="flex justify-between mb-4">
      <input
        type="text"
        placeholder="Search Zone..."
        class="px-4 py-2 border rounded"
        @input="zoneSearch($event.target.value)"
      />
      <router-link :to="{ name: 'zone-create' }">
        <button class="flex items-center px-4 py-2 bg-[#000180] text-white rounded hover:bg-indigo-600">
          <PlusOutlined class="mr-2" />
          New Zone
        </button>
      </router-link>
    </div>

    <h6 class="font-medium">Zone ({{ allZone?.total || 0 }})</h6>
    
    <table class="table border-collapse border border-slate-400 w-full bg-white my-4">
      <thead class="table-header">
        <tr>
          <th>Actions</th>
          <th class="text-left font-bold">SL.</th>
          <th class="text-center">Zone Name</th>
          <th class="text-center">Status</th>
        </tr>
      </thead>

      <tbody class="table-body">
        <tr v-if="isLoading">
          <td colspan="4" class="text-red-600">Loading . . .</td>
        </tr>

        <tr v-if="!isLoading && !zoneData?.length">
          <td colspan="4" class="text-red-600">No Zone Found . . .</td>
        </tr>

        <tr
          v-for="(zone, index) in zoneData"
          :key="index"
          class="hover:bg-gray-100 transition-colors duration-200"
        >
          <td class="text-center w-16">
            <button
              type="button"
              class="edit_btn"
              @click="$router.push({ name: 'zone-edit', params: { id: zone.id } })"
            >
              <EditOutlined class="align-middle" />
            </button>
            <a-popconfirm
              title="Are you sure you want to delete?"
              @confirm="deleteZone(index)"
            >
              <button type="button" class="del_btn ml-2">
                <DeleteOutlined class="align-middle" />
              </button>
            </a-popconfirm>
          </td>
          <td class="font-bold">{{ allZone?.from + index }}</td>
          <td class="text-center">{{ zone.name || '-' }}</td>
          <td class="text-center">
            <button
              :class="[
                zone.status === 1 ? 'bg-green-500' : 'bg-red-500',
                'text-white font-bold py-1 px-3 rounded text-sm'
              ]"
            >
              {{ zone.status === 1 ? 'Active' : 'Inactive' }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <a-pagination
      v-model:current="page"
      v-model:page-size="paginate"
      :total="allZone?.total"
      :show-total="(total) => `Total ${total} zones`"
      @change="handlePagination"
    />
  </MainLayout>
</template>
