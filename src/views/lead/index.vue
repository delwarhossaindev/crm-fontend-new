<script setup>
import MainLayout from "@/components/MainLayout.vue";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons-vue";
import lead from "@/stores/lead-api.js";
import { onMounted, ref } from "vue";

const isLoading = ref(false);
const leadData = ref([]);
const allLead = ref({});
const page = ref(1);
const paginate = ref(10);

const deleteLead = async (index) => {
  const leadId = leadData.value[index].id;
  try {
    await lead.deleteLead(leadId);
    leadData.value.splice(index, 1);
    allLead.value.total -= 1;
  } catch (error) {
    console.error("Failed to delete lead:", error);
  }
};

const getAllLead = async () => {
  isLoading.value = true;
  try {
    const response = await lead.fetchLeadList(page.value, paginate.value);
    allLead.value = response.data;
    leadData.value = response.data.data;
  } catch (error) {
    console.error("Failed to fetch lead:", error);
  } finally {
    isLoading.value = false;
  }
};

const leadSearch = async (input) => {
  if (input) {
    try {
      const response = await lead.searchLeadList(input);
      allLead.value = response.data;
      leadData.value = response.data.data;
    } catch (error) {
      console.error("Failed to search lead:", error);
    }
  } else {
    getAllLead();
  }
};

const handlePagination = (pageNo) => {
  page.value = pageNo;
  getAllLead();
};

onMounted(() => {
  getAllLead();
});
</script>

<template>
  <MainLayout>
    <div class="flex justify-between mb-4">
      <input
        type="text"
        placeholder="Search Lead..."
        class="px-4 py-2 border rounded"
        @input="leadSearch($event?.target?.value)"
      />
      <router-link :to="{ name: 'lead-create' }">
        <button class="flex items-center px-4 py-2 bg-[#000180] text-white rounded hover:bg-indigo-600">
          <PlusOutlined class="mr-2" />
          New Lead
        </button>
      </router-link>
    </div>
    <h6 class="font-medium">Lead ({{ allLead?.total || 0 }})</h6>
    <table class="table border-collapse border border-slate-400 w-full bg-white my-4">
      <thead class="table-header">
        <tr>
          <th>Actions</th>
          <th class="text-left font-bold">SL.</th>
          <th class="text-center">Lead ID</th>
          <th class="text-center">Lead Name Assigned To</th>
          <th class="text-center">Prospect &amp; Concern Person</th>
          <th class="text-center">Item</th>
          <th class="text-center">Amount &amp; Closing</th>
          <th class="text-center">Last Quote</th>
          <th class="text-center">Win (%) Probobility</th>
          <th class="text-center">Priority</th>
          <th class="text-center">State</th>
          <th class="text-center">Last Activity</th>
        </tr>
      </thead>
      <tbody class="table-body">
        <tr v-if="isLoading">
          <td colspan="4" class="text-red-600">Loading . . .</td>
        </tr>
        <tr v-if="!isLoading && !leadData?.length">
          <td colspan="4" class="text-red-600">No Lead Found . . .</td>
        </tr>
        <tr
          v-for="(lead, index) in leadData"
          :key="index"
          class="hover:bg-gray-100 transition-colors duration-200"
        >
          <td class="text-center w-16">
            <button
              type="button"
              class="edit_btn"
              @click="$router.push({ name: 'lead-edit', params: { id: lead?.id } })"
            >
              <EditOutlined class="align-middle" />
            </button>
            <a-popconfirm
              title="Are you sure you want to delete?"
              @confirm="deleteLead(index)"
            >
              <button type="button" class="del_btn ml-2">
                <DeleteOutlined class="align-middle" />
              </button>
            </a-popconfirm>
          </td>
          <td class="font-bold">{{ allLead?.from + index }}</td>
          <td class="text-center">{{ lead.date || '-' }}</td>
          <td class="text-center">{{ lead.lead_name || '-' }}</td>
          <td class="text-center">{{ lead.item_id || '-' }}</td>
          <td class="text-center">{{ lead.estimated_closing_amount || '-' }}</td>
          <td class="text-center"></td>
          <td class="text-center">{{ lead.win_probability_id || '-' }}</td>
          <td class="text-center">{{ lead.priority_id || '-' }}</td>
          <td class="text-center">{{ lead.lead_stage_id || '-' }}</td>
          <td class="text-center"></td>
          <td class="text-center"></td>
        </tr>
      </tbody>
    </table>
    <a-pagination
      v-model:current="page"
      v-model:page-size="paginate"
      :total="allLead?.total"
      :show-total="(total) => `Total ${total} lead`"
      @change="handlePagination"
    />
  </MainLayout>
</template>
