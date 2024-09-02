<template>
  <MainLayout>
    <div class="flex justify-between mb-4">
      <input type="text" placeholder="Search..." class="px-4 py-2 border rounded"
        @input="searchList($event?.target?.value)" />
      <router-link :to="{ name: 'supplier-add' }">
        <button class="bg-[#000180] px-5 py-3 text-white" type="button">
          <i class="bi bi-plus"></i> <span>New Supplier</span>
        </button>
      </router-link>
    </div>
    <h1 class="title">All Supplier ({{ allData?.total || 0 }})</h1>
    <table class="table text-sm border-collapse border border-slate-400 w-full bg-white my-4">
      <thead class="table-header">
        <tr>
          <th class="text-center">Actions</th>
          <th class="text-left">SL No</th>
          <th class="text-left">Name</th>
          <th class="text-left">Company Name</th>
          <th class="text-left">Address</th>
          <th class="text-left">Contact</th>
          <th class="text-right">Balance</th>
        </tr>
      </thead>

      <tbody class="table-body">
        <tr>
          <td colspan="7" v-if="isLoading">Loading . . .</td>
        </tr>
        <tr>
          <td v-if="!isLoading && !backupData?.total">No Data Found</td>
        </tr>
        <tr v-for="(item, index) in allData?.data" :key="index">
          <td class="text-center">
            <button @click="
              $router.push({
                name: 'supplier-edit',
                params: { id: item?.id },
              })
              " class="px-2 py-1 bg-[#000180] text-white rounded hover:bg-indigo-600 mr-2">
              <EditOutlined class="align-middle" />
            </button>
          </td>
          <td class="text-right">{{ index + 1 }}</td>
          <td>{{ item.first_name || "-" }}</td>
          <td>{{ item.company_name || "-" }}</td>
          <td>{{ item.address_1 || "-" }}</td>
          <td>{{ item.contact || "-" }}</td>
          <td class="text-right">
            <button
              type="button"
              class="outline-none w-full block text-right text-indigo-600 font-medium"
              @click="showBalance(item?.id)"
            >
              {{ item.balance ? Number(item.balance)?.toFixed(2) : "-" }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <a-pagination
      v-if="allData?.last_page > 1"
      v-model:current="page"
      v-model:page-size="limit"
      :total="allData?.total"
      :show-total="(total) => `Total ${total} items`"
      @change="handlePagination(page)"
    />
    <!-- Balance Modal -->
    <a-modal v-model:open="balanceModal" title="Supplier Pay">
      <form>
        <div class="mb-2">
          <label class="block">Balance</label>
          <input type="number" class="input-text" v-model="balance" readonly />
        </div>
        <div class="mb-2">
          <label class="block">Pay Amount</label>
          <input
            type="number"
            class="input-text"
            v-model="received_amount"
            @input="
              () => {
                if (received_amount < 0) received_amount = 0;
                else if (received_amount > balance) received_amount = balance;
              }
            "
          />
        </div>
      </form>
      <template #footer>
        <button
          type="button"
          class="cancel-btn mr-2"
          @click="balanceModal = false"
        >
          Cancel
        </button>
        <a-popconfirm title="Are you sure?" v-model:open="confirmModal">
          <button type="button" class="submit-btn">Received</button>
          <template #cancelButton>
            <button
              type="button"
              class="border px-2 bg-gray-600 text-white rounded-md"
              @click="confirmModal = false"
            >
              Cancel
            </button>
          </template>
          <template #okButton>
            <button
              type="button"
              class="border px-2 bg-indigo-600 text-white rounded-md"
              @click="updateBalance()"
            >
              Confirm
            </button>
          </template>
        </a-popconfirm>
      </template>
    </a-modal>
  </MainLayout>
</template>

<script setup>
import MainLayout from "@/components/MainLayout.vue";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons-vue";
import supplier from "@/stores/supplier_api.js";
import { onMounted, ref, watch } from "vue";
import { useDataStore } from "@/stores/data";
import { storeToRefs } from "pinia";

const dataStore = useDataStore();
const allData = ref();
const backupData = ref();
const isLoading = ref(false);
let page = ref(1);
const limit = ref(10);

const fetchData = async (page) => {
  isLoading.value = true;
  try {
    const response = await supplier.fetchSupplierList(page, "");
    isLoading.value = false;
    backupData.value = response.data;
    allData.value = backupData.value;
    console.log(allData.value);
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => fetchData(page.value, ""));

const handlePagination = (pageNo) => {
  page.value = pageNo;
  fetchData(page.value, "");
};

const searchList = async (query) => {
  if (!query) allData.value = backupData.value;
  const response = await supplier.fetchSupplierList("", query);
  allData.value = response.data;
};

// Balance Modal
import Cookies from "js-cookie";
import axios from "axios";
import { apiBase } from "@/config";
import { showNotification } from "@/utilities/notification";

const balanceModal = ref(false);
const confirmModal = ref(false);
const balance = ref(0);
const receivedID = ref();
const received_amount = ref(0);

const showBalance = async (id) => {
  const token = Cookies.get("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.get(`${apiBase}/suppliers/${id}`, config);
    if (response?.status == 200) {
      balance.value = response?.data?.balance
        ? Number(response?.data?.balance).toFixed(2)
        : 0;

      balanceModal.value = true;
      receivedID.value = id;
    }
  } catch (err) {
    balance.value = 0;
    balanceModal.value = false;
  }
};
const updateBalance = async () => {
  const data = {
    pay_amount: received_amount.value,
  };
  const token = Cookies.get("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.post(
      `${apiBase}/supplier-paid/${receivedID.value}`,
      data,
      config
    );
    if (response?.status == 201) {
      showNotification("success", response?.data?.message);
      balanceModal.value = false;
      confirmModal.value = false;
      received_amount.value = 0;
      fetchData(page.value, "");
    }
  } catch (err) {
    balanceModal.value = false;
    confirmModal.value = false;
    received_amount.value = 0;
  }
};
</script>
