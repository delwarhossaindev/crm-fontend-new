<script setup>
import MainLayout from "@/components/MainLayout.vue";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons-vue";
import { onMounted, ref } from "vue";
import { useUserStore } from "@/stores/users";
import { storeToRefs } from "pinia";

const backupList = ref(null);
const roleList = ref(null);

const userStore = useUserStore();
const { getRoles, deleteRole } = userStore;
const { isLoading } = storeToRefs(userStore);

onMounted(() => fetchData());

const fetchData = async () => {
  backupList.value = await getRoles();
  roleList.value = backupList.value;
};

const searchList = (query) => {
  if (!query) return (roleList.value = backupList.value);
  roleList.value = backupList.value.filter((role) =>
    role?.name?.toLowerCase().includes(query?.toLowerCase())
  );
};
</script>

<template>
  <MainLayout>
    <div class="flex justify-between mb-3">
      <input
        type="text"
        placeholder="Search Role..."
        class="px-4 py-2 border rounded"
        @input="searchList($event.target.value)"
      />
      <div>
        <button
          @click="$router.push({ name: 'role-create' })"
          class="px-4 py-2 bg-[#000180] text-white rounded hover:bg-indigo-600"
        >
          <PlusOutlined class="mr-2 align-middle" /> Add New Role
        </button>
      </div>
    </div>
    <div class="overflow-x-auto">
      <table class="purchase-table">
        <thead class="table-header">
          <tr>
            <th>Actions</th>
            <th>Role</th>
            <th>Permissions</th>
          </tr>
        </thead>
        <tbody class="table-body">
          <tr v-if="isLoading">
            <td colspan="3">Loading . . .</td>
          </tr>
          <tr v-if="!isLoading && !roleList?.length">
            <td colspan="3">No Data Found</td>
          </tr>
          <tr v-for="role in roleList" :key="role?.id">
            <td class="text-center w-16">
              <button
                type="button"
                class="edit_btn"
                @click="
                  $router.push({
                    name: 'role-edit',
                    params: { id: role?.id },
                  })
                "
              >
                <EditOutlined class="align-middle" />
              </button>
              <a-popconfirm
                title="Are you sure delete?"
                @confirm="
                  async () => {
                    res = await deleteRole(role?.id);
                    res && fetchData();
                  }
                "
              >
                <button type="button" class="del_btn ml-2">
                  <DeleteOutlined class="align-middle" />
                </button>
              </a-popconfirm>
            </td>
            <td>
              {{ role?.name }}
            </td>
            <td>
              <div v-if="!role?.permissions?.length">-</div>
              <div v-else>
                <span
                  v-for="(permission, index) in role?.permissions"
                  :key="index"
                >
                  {{ permission?.name
                  }}<span
                    class="mr-1"
                    v-if="index + 1 != role?.permissions?.length"
                    >,</span
                  >
                </span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </MainLayout>
</template>
