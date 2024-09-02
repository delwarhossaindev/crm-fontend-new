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

const usersList = ref(null);
const backupList = ref(null);

const userStore = useUserStore();

const { getUsers, deleteUser } = userStore;
const { isLoading } = storeToRefs(userStore);

onMounted(() => fetchUsers());

const fetchUsers = async () => {
  backupList.value = await getUsers();
  usersList.value = backupList.value;
};
const searchList = (query) => {
  if (!query) return (usersList.value = backupList.value);
  usersList.value = backupList.value.filter((user) =>
    user?.name?.toLowerCase().includes(query?.toLowerCase())
  );
};
</script>

<template>
  <MainLayout>
    <div class="flex justify-between mb-3">
      <input
        type="text"
        placeholder="Search User..."
        class="px-4 py-2 border rounded"
        @input="searchList($event.target.value)"
      />
      <div>
        <button
          @click="$router.push({ name: 'role' })"
          class="px-4 py-2 bg-[#000180] text-white rounded hover:bg-indigo-600 mr-2"
        >
          Role List
        </button>
        <button
          @click="$router.push({ name: 'permissions' })"
          class="px-4 py-2 bg-[#000180] text-white rounded hover:bg-indigo-600 mr-2"
        >
          Permissions List
        </button>
        <button
          @click="$router.push({ name: 'user-create' })"
          class="px-4 py-2 bg-[#000180] text-white rounded hover:bg-indigo-600"
        >
          <PlusOutlined class="mr-2 align-middle" /> Add New User
        </button>
      </div>
    </div>
    <div class="overflow-x-auto">
      <table class="purchase-table">
        <thead class="table-header">
          <tr>
            <th class="text-center">Actions</th>
            <th>User</th>
            <th>Email</th>
            <th>Role</th>
            <th>Permissions</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody class="table-body">
          <tr v-if="isLoading">
            <td colspan="6">Loading . . .</td>
          </tr>
          <tr v-if="!isLoading && !usersList?.length">
            <td colspan="6">No Data Found</td>
          </tr>
          <tr v-for="(item, index) in usersList" :key="index">
            <td class="text-center w-16">
              <button
                type="button"
                class="edit_btn"
                @click="
                  $router.push({
                    name: 'user-edit',
                    params: { id: item?.id },
                  })
                "
              >
                <EditOutlined class="align-middle" />
              </button>
              <a-popconfirm
                title="Are you sure delete?"
                @confirm="
                  async () => {
                    res = await deleteUser(item?.id);
                    res && fetchUsers();
                  }
                "
              >
                <button type="button" class="del_btn ml-2">
                  <DeleteOutlined class="align-middle" />
                </button>
              </a-popconfirm>
            </td>
            <td>
              {{ item?.name }}
            </td>
            <td>{{ item?.email }}</td>
            <td>
              <div v-if="!item?.roles?.length">-</div>
              <div v-else>
                <span v-for="(role, index) in item?.roles" :key="index">
                  {{ role?.name
                  }}<span class="mr-1" v-if="index + 1 != item?.roles?.length"
                    >,</span
                  >
                </span>
              </div>
            </td>
            <td>
              <div v-if="!item?.all_permissions?.length">-</div>
              <div v-else>
                <span
                  v-for="(permission, index) in item?.all_permissions"
                  :key="index"
                >
                  {{ permission?.name
                  }}<span
                    class="mr-1"
                    v-if="index + 1 != item?.all_permissions?.length"
                    >,</span
                  >
                </span>
              </div>
            </td>
            <td class="text-center">
              {{ item?.status == 1 ? "Active" : "Inactive" }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </MainLayout>
</template>
