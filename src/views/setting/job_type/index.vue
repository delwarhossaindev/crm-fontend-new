<script setup>
import MainLayout from "@/components/MainLayout.vue";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons-vue";
import item from "@/stores/setting/item-api.js";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const isLoading = ref(false);
const itemData = ref([]);
const allItems = ref([]);
const page = ref(1);
const paginate = ref(10);

const router = useRouter();

const getAllItem = async () => {
  isLoading.value = true;
  try {
    const response = await item.fetchItemList(page.value, paginate.value);
    allItems.value = response.data;
    itemData.value = response.data.data;
  } catch (error) {
    console.error("Failed to fetch items:", error);
  } finally {
    isLoading.value = false;
  }
};

const deleteItem = async (id) => {
  try {
    await item.deleteItem(id);
    itemData.value = itemData.value.filter(item => item.id !== id);
    allItems.value = itemData.value;
  } catch (error) {
    console.error("Failed to delete item:", error);
  }
};

const itemSearch = async (input) => {
  if (input) {
    try {
      const response = await item.searchItemList(input);
      allItems.value = response.data;
      itemData.value = response.data.data;
    } catch (error) {
      console.error("Failed to search items:", error);
    }
  } else {
    getAllItem();
  }
};

const handlePagination = (pageNo) => {
  page.value = pageNo;
  getAllItem();
};

onMounted(() => getAllItem());
</script>

<template>
  <MainLayout>
    <div class="flex justify-between mb-4">
      <input
        type="text"
        placeholder="Search Item..."
        class="px-4 py-2 border rounded"
        @input="itemSearch($event?.target?.value)"
      />
      <router-link :to="{ name: 'item-create' }">
        <button class="flex items-center px-4 py-2 bg-[#000180] text-white rounded hover:bg-indigo-600">
          <PlusOutlined class="mr-2" />
          New Item
        </button>
      </router-link>
    </div>
    <h6 class="font-medium">Item ({{ allItems?.total || 0 }})</h6>
    <table class="table border-collapse border border-slate-400 w-full bg-white my-4">
      <thead class="table-header">
        <tr>
          <th>Actions</th>
          <th class="text-left font-bold">SL.</th>
          <th class="text-center">Item Name</th>
          <th class="text-center">Model</th>
          <th class="text-center">Qty</th>
          <th class="text-center">Unit Price</th>
        </tr>
      </thead>
      <tbody class="table-body">
        <tr v-if="isLoading">
          <td colspan="6" class="text-red-600">Loading . . .</td>
        </tr>
        <tr v-if="!isLoading && !itemData?.length">
          <td colspan="6" class="text-red-600">No Item Found . . .</td>
        </tr>
        <tr v-for="(item, index) in itemData" :key="item.id" class="hover:bg-gray-100 transition-colors duration-200">
          <td class="text-center w-16">
            <button
              type="button"
              class="edit_btn"
              @click="router.push({ name: 'item-edit', params: { id: item.id } })"
            >
              <EditOutlined class="align-middle" />
            </button>
            <a-popconfirm
              title="Are you sure you want to delete this item?"
              @confirm="() => deleteItem(item.id)"
            >
              <button type="button" class="del_btn ml-2">
                <DeleteOutlined class="align-middle" />
              </button>
            </a-popconfirm>
          </td>
          <td class="font-bold">{{ (page.value - 1) * paginate.value + index + 1 }}</td>
          <td class="text-center">{{ item.item_name || "-" }}</td>
          <td class="text-center">{{ item.model || "-" }}</td>
          <td class="text-center">{{ item.qty || "-" }}</td>
          <td class="text-center">{{ item.unit_price || "-" }}</td>
        </tr>
      </tbody>
    </table>
    <a-pagination
      v-model:current="page"
      v-model:page-size="paginate"
      :total="allItems?.total"
      :show-total="total => `Total ${total} items`"
      @change="handlePagination"
    />
  </MainLayout>
</template>
