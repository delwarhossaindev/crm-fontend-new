<script setup>
import MainLayout from "@/components/MainLayout.vue";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons-vue";
import supplier from "@/stores/supplier-api.js";
import { onMounted, ref } from "vue";

const isLoading = ref(false);
const supplierData = ref([]);
const allSupplier = ref({});
const page = ref(1);
const paginate = ref(10);

const deleteSupplier = async (index) => {
  const supplierId = supplierData.value[index].id;
  try {
    await supplier.deleteSupplier(supplierId);
    supplierData.value.splice(index, 1);
    allSupplier.value.total -= 1;
  } catch (error) {
    console.error("Failed to delete supplier:", error);
  }
};

const getAllSupplier = async () => {
  isLoading.value = true;
  try {
    const response = await supplier.fetchSupplierList(page.value, paginate.value);
    allSupplier.value = response.data;
    supplierData.value = response.data.data;
  } catch (error) {
    console.error("Failed to fetch supplier:", error);
  } finally {
    isLoading.value = false;
  }
};

const supplierSearch = async (input) => {
  if (input) {
    try {
      const response = await supplier.searchSupplierList(input);
      allSupplier.value = response.data;
      supplierData.value = response.data.data;
    } catch (error) {
      console.error("Failed to search supplier:", error);
    }
  } else {
    getAllSupplier();
  }
};

const handlePagination = (pageNo) => {
  page.value = pageNo;
  getAllSupplier();
};

onMounted(() => {
  getAllSupplier();
});
</script>

<template>
  <MainLayout>
    <div class="flex justify-between mb-4">
      <input
        type="text"
        placeholder="Search Supplier..."
        class="px-4 py-2 border rounded"
        @input="supplierSearch($event?.target?.value)"
      />
      <router-link :to="{ name: 'supplier-create' }">
        <button class="flex items-center px-4 py-2 bg-[#000180] text-white rounded hover:bg-indigo-600">
          <PlusOutlined class="mr-2" />
          New Supplier
        </button>
      </router-link>
    </div>
    <h6 class="font-medium">Supplier ({{ allSupplier?.total || 0 }})</h6>
    <table class="table border-collapse border border-slate-400 w-full bg-white my-4">
      <thead class="table-header">
        <tr>
          <th>Actions</th>
          <th class="text-left font-bold">SL.</th>
          <th class="text-center">Created On</th>
          <th class="text-center">Supplier Name, Zone &amp; Industry</th>
          <th class="text-center">Supplier Item</th>
          <th class="text-center">Primary Contact</th>
          <th class="text-center">Created By</th>
        </tr>
      </thead>
      <tbody class="table-body">
        <tr v-if="isLoading">
          <td colspan="4" class="text-red-600">Loading . . .</td>
        </tr>
        <tr v-if="!isLoading && !supplierData?.length">
          <td colspan="4" class="text-red-600">No Supplier Found . . .</td>
        </tr>
        <tr
          v-for="(supplier, index) in supplierData"
          :key="index"
          class="hover:bg-gray-100 transition-colors duration-200"
        >
          <td class="text-center w-16">
            <button
              type="button"
              class="edit_btn"
              @click="$router.push({ name: 'supplier-edit', params: { id: supplier?.id } })"
            >
              <EditOutlined class="align-middle" />
            </button>
            <a-popconfirm
              title="Are you sure you want to delete?"
              @confirm="deleteSupplier(index)"
            >
              <button type="button" class="del_btn ml-2">
                <DeleteOutlined class="align-middle" />
              </button>
            </a-popconfirm>
          </td>
          <td class="font-bold">{{ allSupplier?.from + index }}</td>
          <td class="text-center">{{ supplier.created_at || '-' }}</td>
          <td class="text-center">{{ supplier.supplier_name+'-'+supplier.zone+'-'+supplier.supplier_reputation_brand || '-' }}</td>
          <td class="text-center">{{ supplier.supplier_item || '-' }}</td>
          <td class="text-center"></td>
          <td class="text-center"></td>
        </tr>
      </tbody>
    </table>
    <a-pagination
      v-model:current="page"
      v-model:page-size="paginate"
      :total="allSupplier?.total"
      :show-total="(total) => `Total ${total} supplier`"
      @change="handlePagination"
    />
  </MainLayout>
</template>
