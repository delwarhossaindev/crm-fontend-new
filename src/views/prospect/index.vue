<script setup>
import MainLayout from "@/components/MainLayout.vue";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons-vue";
import quotation from "@/stores/quotation-api.js";
import { onMounted, ref } from "vue";

const isLoading = ref(false);
const quotationData = ref([]);
const allQuotation = ref({});
const page = ref(1);
const paginate = ref(10);

const deleteQuotation = async (index) => {
  const quotationId = quotationData.value[index].id;
  try {
    await quotation.deleteQuotation(quotationId);
    quotationData.value.splice(index, 1);
    allQuotation.value.total -= 1;
  } catch (error) {
    console.error("Failed to delete quotation:", error);
  }
};

const getAllQuotation = async () => {
  isLoading.value = true;
  try {
    const response = await quotation.fetchQuotationList(
      page.value,
      paginate.value
    );
    allQuotation.value = response.data;
    quotationData.value = response.data.data;
  } catch (error) {
    console.error("Failed to fetch quotation:", error);
  } finally {
    isLoading.value = false;
  }
};

const quotationSearch = async (input) => {
  if (input) {
    try {
      const response = await quotation.searchQuotationList(input);
      allQuotation.value = response.data;
      quotationData.value = response.data.data;
    } catch (error) {
      console.error("Failed to search quotation:", error);
    }
  } else {
    getAllQuotation();
  }
};

const handlePagination = (pageNo) => {
  page.value = pageNo;
  getAllQuotation();
};

onMounted(() => {
  getAllQuotation();
});
</script>

<template>
  <MainLayout>
    <div class="flex justify-between mb-4">
      <!-- Left: Search input -->
      <input
        type="text"
        placeholder="Search Quotation..."
        class="px-4 py-2 border rounded"
        @input="quotationSearch($event?.target?.value)"
      />

      <!-- Right: Buttons aligned together -->
      <div class="flex space-x-2">
        <router-link :to="{ name: 'prospect-create' }">
          <button
            class="flex items-center px-4 py-2 bg-[#000180] text-white rounded hover:bg-indigo-600"
          >
            <PlusOutlined class="mr-2" />
            Add Individual
          </button>
        </router-link>

        <router-link :to="{ name: 'prospect-organization-create' }">
          <button
            class="flex items-center px-4 py-2 bg-[#000180] text-white rounded hover:bg-indigo-600"
          >
            <PlusOutlined class="mr-2" />
            Add Organization
          </button>
        </router-link>
      </div>
    </div>
    <h6 class="font-medium">Quotation ({{ allQuotation?.total || 0 }})</h6>
    <table
      class="table border-collapse border border-slate-400 w-full bg-white my-4"
    >
      <thead class="table-header">
        <tr>
          <th>Actions</th>
          <th class="text-left font-bold">SL.</th>
          <th class="text-center">Quotation ID</th>
          <th class="text-center">Quotation Sub. &amp; Person</th>
          <th class="text-center">Lead Name</th>
          <th class="text-center">Prospect Name</th>
          <th class="text-center">Quoted Amount</th>
          <th class="text-center">Attachments</th>
        </tr>
      </thead>
      <tbody class="table-body">
        <tr v-if="isLoading">
          <td colspan="4" class="text-red-600">Loading . . .</td>
        </tr>
        <tr v-if="!isLoading && !quotationData?.length">
          <td colspan="4" class="text-red-600">No Quotation Found . . .</td>
        </tr>
        <tr
          v-for="(quotation, index) in quotationData"
          :key="index"
          class="hover:bg-gray-100 transition-colors duration-200"
        >
          <td class="text-center w-16">
            <button
              type="button"
              class="edit_btn"
              @click="
                $router.push({
                  name: 'quotation-edit',
                  params: { id: quotation?.id },
                })
              "
            >
              <EditOutlined class="align-middle" />
            </button>
            <a-popconfirm
              title="Are you sure you want to delete?"
              @confirm="deleteQuotation(index)"
            >
              <button type="button" class="del_btn ml-2">
                <DeleteOutlined class="align-middle" />
              </button>
            </a-popconfirm>
          </td>
          <td class="font-bold">{{ allQuotation?.from + index }}</td>
          <td class="text-center">{{ quotation.quotation_number || "-" }}</td>
          <td class="text-center">{{ quotation.quotation_subject || "-" }}</td>
          <td class="text-center">{{ quotation.lead_id || "-" }}</td>
          <td class="text-center">{{ quotation.prospect_id || "-" }}</td>
          <td class="text-center">{{ quotation.quoted_amount || "-" }}</td>
          <td class="text-center"></td>
        </tr>
      </tbody>
    </table>
    <a-pagination
      v-model:current="page"
      v-model:page-size="paginate"
      :total="allQuotation?.total"
      :show-total="(total) => `Total ${total} quotation`"
      @change="handlePagination"
    />
  </MainLayout>
</template>
