<script setup>
import MainLayout from "@/components/MainLayout.vue";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons-vue";
import task from "@/stores/task-api.js";
import { onMounted, ref } from "vue";
import { imgBase } from "@/config";

const isLoading = ref(false);
const taskData = ref([]);
const allTask = ref({});
const page = ref(1);
const paginate = ref(10);

const deleteTask = async (index) => {
  const taskId = taskData.value[index].id;
  try {
    await task.deleteTask(taskId);
    taskData.value.splice(index, 1);
    allTask.value.total -= 1;
  } catch (error) {
    console.error("Failed to delete task:", error);
  }
};

const getAllTask = async () => {
  isLoading.value = true;
  try {
    const response = await task.fetchTaskList(page.value, paginate.value);
    allTask.value = response.data;
    taskData.value = response.data.data;
  } catch (error) {
    console.error("Failed to fetch task:", error);
  } finally {
    isLoading.value = false;
  }
};

const taskSearch = async (input) => {
  if (input) {
    try {
      const response = await task.searchTaskList(input);
      allTask.value = response.data;
      taskData.value = response.data.data;
    } catch (error) {
      console.error("Failed to search task:", error);
    }
  } else {
    getAllTask();
  }
};

const handlePagination = (pageNo) => {
  page.value = pageNo;
  getAllTask();
};

onMounted(() => {
  getAllTask();
});
</script>

<template>
  <MainLayout>
    <div class="flex justify-between mb-4">
      <input
        type="text"
        placeholder="Search Task..."
        class="px-4 py-2 border rounded"
        @input="taskSearch($event?.target?.value)"
      />
      <router-link :to="{ name: 'task-create' }">
        <button
          class="flex items-center px-4 py-2 bg-[#000180] text-white rounded hover:bg-indigo-600"
        >
          <PlusOutlined class="mr-2" />
          New Task
        </button>
      </router-link>
    </div>
    <h6 class="font-medium">Task ({{ allTask?.total || 0 }})</h6>
    <table
      class="table border-collapse border border-slate-400 w-full bg-white my-4"
    >
      <thead class="table-header">
        <tr>
          <th>Actions</th>
          <th class="text-left font-bold">SL.</th>
          <th class="text-center">Created By</th>
          <th class="text-center">Task Details</th>
          <th class="text-center">Attached</th>
          <th class="text-center">Prospect and Lead</th>
          <th class="text-center">Contact</th>
          <th class="text-center">Type</th>
          <th class="text-center">Assigned To</th>
          <th class="text-center">Priority</th>
          <th class="text-center">Status</th>
        </tr>
      </thead>
      <tbody class="table-body">
        <tr v-if="isLoading">
          <td colspan="4" class="text-red-600">Loading . . .</td>
        </tr>
        <tr v-if="!isLoading && !taskData?.length">
          <td colspan="4" class="text-red-600">No Task Found . . .</td>
        </tr>
        <tr
          v-for="(task, index) in taskData"
          :key="index"
          class="hover:bg-gray-100 transition-colors duration-200"
        >
          <td class="text-center w-16">
            <button
              type="button"
              class="edit_btn"
              @click="
                $router.push({ name: 'task-edit', params: { id: task?.id } })
              "
            >
              <EditOutlined class="align-middle" />
            </button>
            <a-popconfirm
              title="Are you sure you want to delete?"
              @confirm="deleteTask(index)"
            >
              <button type="button" class="del_btn ml-2">
                <DeleteOutlined class="align-middle" />
              </button>
            </a-popconfirm>
          </td>
          <td class="font-bold">{{ allTask?.from + index }}</td>
          <td class="text-center"></td>
          <td class="text-center">
            {{ task.title + "-" + task.description || "-" }}
          </td>
          <td class="text-center">
            <img
              v-if="task.attachment"
              :src="imgBase+task.attachment"
              alt="Attachment"
              class="w-16 h-16 object-cover"
            />
            <span v-else>-</span>
          </td>
          <td class="text-center">
            {{ task.prospect_id + "-" + task.prospect_id || "-" }}
          </td>
          <td class="text-center">{{ task.contact || "-" }}</td>
          <td class="text-center"></td>

          <td class="text-center">{{ task.assign_to || "-" }}</td>
          <td class="text-center">{{ task.priority || "-" }}</td>
          <td class="text-center">{{ task.status || "-" }}</td>
        </tr>
      </tbody>
    </table>
    <a-pagination
      v-model:current="page"
      v-model:page-size="paginate"
      :total="allTask?.total"
      :show-total="(total) => `Total ${total} task`"
      @change="handlePagination"
    />
  </MainLayout>
</template>
