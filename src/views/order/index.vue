<script setup>
import MainLayout from "@/components/MainLayout.vue";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons-vue";
import order from "@/stores/order-api.js";
import { onMounted, ref } from "vue";

const isLoading = ref(false);
const orderData = ref([]);
const allOrder = ref({});
const page = ref(1);
const paginate = ref(10);

const deleteOrder = async (index) => {
  const orderId = orderData.value[index].id;
  try {
    await order.deleteOrder(orderId);
    orderData.value.splice(index, 1);
    allOrder.value.total -= 1;
  } catch (error) {
    console.error("Failed to delete order:", error);
  }
};

const getAllOrder = async () => {
  isLoading.value = true;
  try {
    const response = await order.fetchOrderList(page.value, paginate.value);
    allOrder.value = response.data;
    orderData.value = response.data.data;
  } catch (error) {
    console.error("Failed to fetch order:", error);
  } finally {
    isLoading.value = false;
  }
};

const orderSearch = async (input) => {
  if (input) {
    try {
      const response = await order.searchOrderList(input);
      allOrder.value = response.data;
      orderData.value = response.data.data;
    } catch (error) {
      console.error("Failed to search order:", error);
    }
  } else {
    getAllOrder();
  }
};

const handlePagination = (pageNo) => {
  page.value = pageNo;
  getAllOrder();
};

onMounted(() => {
  getAllOrder();
});
</script>

<template>
  <MainLayout>
    <div class="flex justify-between mb-4">
      <input
        type="text"
        placeholder="Search Order..."
        class="px-4 py-2 border rounded"
        @input="orderSearch($event?.target?.value)"
      />
      <router-link :to="{ name: 'order-create' }">
        <button class="flex items-center px-4 py-2 bg-[#000180] text-white rounded hover:bg-indigo-600">
          <PlusOutlined class="mr-2" />
          New Order
        </button>
      </router-link>
    </div>
    <h6 class="font-medium">Order ({{ allOrder?.total || 0 }})</h6>
    <table class="table border-collapse border border-slate-400 w-full bg-white my-4">
      <thead class="table-header">
        <tr>
          <th>Actions</th>
          <th class="text-left font-bold">SL.</th>
          <th class="text-center">Order ID</th>
          <th class="text-center">Order Sub. &amp; Person</th>
          <th class="text-center">Lead Name</th>
          <th class="text-center">Prospect Name</th>
          <th class="text-center">PO Amount</th>
          <th class="text-center">Client Order No</th>
          <th class="text-center">KAM Name</th>
        </tr>
      </thead>
      <tbody class="table-body">
        <tr v-if="isLoading">
          <td colspan="4" class="text-red-600">Loading . . .</td>
        </tr>
        <tr v-if="!isLoading && !orderData?.length">
          <td colspan="4" class="text-red-600">No Order Found . . .</td>
        </tr>
        <tr
          v-for="(order, index) in orderData"
          :key="index"
          class="hover:bg-gray-100 transition-colors duration-200"
        >
          <td class="text-center w-16">
            <button
              type="button"
              class="edit_btn"
              @click="$router.push({ name: 'order-edit', params: { id: order?.id } })"
            >
              <EditOutlined class="align-middle" />
            </button>
            <a-popconfirm
              title="Are you sure you want to delete?"
              @confirm="deleteOrder(index)"
            >
              <button type="button" class="del_btn ml-2">
                <DeleteOutlined class="align-middle" />
              </button>
            </a-popconfirm>
          </td>
          <td class="font-bold">{{ allOrder?.from + index }}</td>
          <td class="text-center">{{ order.sale_order_no || '-' }}</td>
          <td class="text-center">{{ order.sale_order_subject || '-' }}</td>
          <td class="text-center">{{ order.lead_name || '-' }}</td>
          <td class="text-center">{{ order.prospect_id || '-' }}</td>
          <td class="text-center">{{ order.ordered_amount || '-' }}</td>
          <td class="text-center">{{ order.client_order_no || '-' }}</td>
          <td class="text-center">{{ order.key_account_person_id || '-' }}</td>
         
        </tr>
      </tbody>
    </table>
    <a-pagination
      v-model:current="page"
      v-model:page-size="paginate"
      :total="allOrder?.total"
      :show-total="(total) => `Total ${total} order`"
      @change="handlePagination"
    />
  </MainLayout>
</template>
