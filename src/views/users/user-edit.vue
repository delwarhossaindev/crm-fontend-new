<script setup>
import { ref, onMounted } from "vue";
import MainLayout from "@/components/MainLayout.vue";
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores/users";
import { storeToRefs } from "pinia";

const route = useRoute();
const { id } = route?.params;

const userStore = useUserStore();
const { getUserDetail, getRoles, getPermission, userUpdate, assignPermission } =
  userStore;
const { isLoading } = storeToRefs(userStore);

const userData = ref();
const roleList = ref();
const permissionList = ref();

const formData = ref({
  name: null,
  email: null,
  roles: [],
  status: 1,
});
const permissions = ref([]);

onMounted(async () => {
  userData.value = await getUserDetail(id);
  roleList.value = await getRoles();
  permissionList.value = await getPermission();

  const roles = userData.value?.roles?.map((item) => item?.name);
  const allPermissions = userData.value?.permissions?.map((item) => item?.name);
  formData.value = {
    name: userData.value?.name,
    email: userData.value?.email,
    roles: roles,
    status: userData.value?.status,
  };
  permissions.value = allPermissions;
});
const userEdit = async (router) => {
  const res = await userUpdate(id, formData.value);
  console.log(res);
  res && router.go(-1);
};
const updatePermission = async (router) => {
  const res = await assignPermission(id, permissions.value);
  console.log(res);
  res && router.go(-1);
};

// const form = reactive({
//   name: "",
//   email: "",
//   roles: [],
//   status: "",
// });

// const roleList = ref([]);
// const permissionList = ref([]);
// const permissions = ref([]);

// const statusList = ref([
//   { title: "Active", value: 1 },
//   { title: "Inactive", value: 0 },
// ]);

// const message = ref("");
// const isSnackbarTopStartVisible = ref(false);

// const getUserByID = async () => {
//   isLoading.value = true;
//   try {
//     const token = Cookies.get("token");
//     const config = { headers: { Authorization: `Bearer ${token}` } };
//     const res = await axios.get(
//       `${apiBase}/user_edit/${route.params.id}`,
//       config
//     );
//     if (res.data?.status === "success") {
//       userData.value = res.data?.user_info;
//       form.name = userData.value.name;
//       form.email = userData.value.email;
//       form.status = userData.value.status;
//       form.roles = userData.value?.roles?.map((role) => role.name) || [];
//       permissions.value =
//         userData.value?.permissions?.map((permission) => permission.name) || [];
//     }
//   } catch (error) {
//     console.error(error);
//   } finally {
//     isLoading.value = false;
//   }
// };

// const getRoleList = async () => {
//   try {
//     const token = Cookies.get("token");
//     const config = { headers: { Authorization: `Bearer ${token}` } };
//     const res = await axios.get(`${apiBase}/roles/`, config);
//     if (res.data?.status === "Success") {
//       roleList.value = res.data?.role.map((role) => role.name);
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };

// const getPermissionList = async () => {
//   try {
//     const token = Cookies.get("token");
//     const config = { headers: { Authorization: `Bearer ${token}` } };
//     const res = await axios.get(`${apiBase}/permissions/`, config);
//     if (res.data?.status === "Success") {
//       permissionList.value = res.data?.permissions.map(
//         (permission) => permission.name
//       );
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };

// onMounted(async () => {
//   await getUserByID();
//   await getRoleList();
//   await getPermissionList();
// });

// const editUser = async () => {
//   isLoading.value = true;
//   try {
//     const token = Cookies.get("token");
//     const config = { headers: { Authorization: `Bearer ${token}` } };
//     const payload = {
//       name: form.name,
//       email: form.email,
//       roles: form.roles,
//       status: form.status,
//     };
//     const res = await axios.put(
//       `${apiBase}/user_update/${route.params.id}`,
//       payload,
//       config
//     );
//     if (res.data?.status === "success") {
//       message.value = res.data.message;
//       isSnackbarTopStartVisible.value = true;
//       await getUserByID();
//     }
//   } catch (error) {
//     console.error(error);
//   } finally {
//     isLoading.value = false;
//   }
// };

// const updatePermission = async () => {
//   isLoading.value = true;
//   try {
//     const token = Cookies.get("token");
//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     };

//     const payload = {
//       permissions: permissions.value, // Send the array of selected permissions
//     };

//     const res = await axios.put(
//       `${apiBase}/assign_permission/${route.params.id}`,
//       payload,
//       config
//     );

//     if (res.data?.status === "success") {
//       message.value = res.data.message;
//       isSnackbarTopStartVisible.value = true;
//       await getUserByID(); // Refresh user data
//     } else {
//       message.value = "Failed to update permissions.";
//       isSnackbarTopStartVisible.value = true;
//     }
//   } catch (error) {
//     console.error("Error updating permissions:", error);
//     message.value = "An error occurred while updating permissions.";
//     isSnackbarTopStartVisible.value = true;
//   } finally {
//     isLoading.value = false;
//   }
// };
</script>

<template>
  <MainLayout>
    <a-skeleton active v-if="isLoading" />
    <div class="grid grid-cols-3 gap-3" v-else>
      <div class="bg-white text-center mb-3 py-3 px-5 rounded-md mb-3">
        <h2 class="text-xl font-semibold mt-4">{{ userData?.name }}</h2>
        <div class="flex flex-wrap justify-center mt-2">
          <span
            v-for="(role, index) in userData?.roles"
            :key="index"
            class="bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm font-medium"
            >{{ role?.name }}
          </span>
        </div>
        <hr class="my-3" />
        <div class="text-left">
          <h3 class="text-lg font-semibold">Details</h3>
          <p><strong class="mr-1">Name:</strong> {{ userData?.name }}</p>
          <p><strong class="mr-1">Email:</strong> {{ userData?.email }}</p>
          <p class="capitalize">
            <strong class="mr-1">Roles:</strong>
            <span v-for="(role, index) in userData?.roles" :key="index"
              >{{ role.name }}(
              <span
                class="text-blue-500"
                v-for="(permission, pIndex) in role?.permissions"
                :key="permission?.id"
                >{{ permission?.name }}
                <span v-if="pIndex < role?.permissions?.length - 1">, </span>
              </span>
              )
              <span class="mr-1" v-if="index < userData?.roles?.length - 1"
                >,
              </span>
            </span>
          </p>
          <p>
            <strong class="mr-1">Permissions:</strong>
            <span
              class="capitalize text-blue-500"
              v-for="(permission, index) in userData?.permissions"
              :key="index"
              >{{ permission?.name
              }}<span
                class="mr-1"
                v-if="index < userData?.permissions?.length - 1"
                >,
              </span></span
            >
          </p>
        </div>
      </div>
      <div class="col-span-2">
        <div class="mb-3 bg-white py-3 px-5 rounded-md">
          <h2 class="text-xl font-semibold mb-3">Update User</h2>
          <form @submit.prevent="userEdit($router)">
            <div class="mb-3">
              <label class="block">Name</label>
              <input
                type="text"
                class="input-text"
                v-model="formData.name"
                required
              />
            </div>
            <div class="mb-3">
              <label class="block mb-1">Email</label>
              <input
                type="email"
                class="input-text"
                v-model="formData.email"
                required
              />
            </div>
            <div class="mb-3">
              <label class="block mb-1">Status</label>
              <select class="input-text" v-model="formData.status">
                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </select>
            </div>
            <div class="mb-3">
              <label class="block mb-1">Roles</label>
              <p class="mb-1" v-for="item in roleList" :key="item?.id">
                <label
                  ><input
                    type="checkbox"
                    :value="item?.name"
                    v-model="formData.roles"
                  />
                  <span class="align-baseline ml-2 capitalize">{{
                    item?.name
                  }}</span></label
                >
              </p>
            </div>
            <div>
              <button
                type="submit"
                class="px-4 py-2 min-w-32 inline-block bg-[#000180] text-white rounded-lg mt-3"
              >
                Submit
              </button>
              <button
                type="button"
                class="px-4 py-2 min-w-32 inline-block bg-gray-600 text-white rounded-lg mt-3 ml-2"
                @click="$router.go(-1)"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
        <div class="mb-3 bg-white py-3 px-5 rounded-md">
          <h2 class="text-xl font-semibold mb-3">Update Permissions</h2>
          <form @submit.prevent="updatePermission($router)">
            <div class="mb-3">
              <label class="block mb-1">Select Permissions</label>
              <p class="mb-1" v-for="item in permissionList" :key="item?.id">
                <label
                  ><input
                    type="checkbox"
                    :value="item?.name"
                    v-model="permissions"
                  />
                  <span class="align-baseline ml-2 capitalize">{{
                    item?.name
                  }}</span></label
                >
              </p>
            </div>

            <div>
              <button
                type="submit"
                class="px-4 py-2 min-w-32 inline-block bg-[#000180] text-white rounded-lg mt-3"
              >
                Submit
              </button>
              <button
                type="button"
                class="px-4 py-2 min-w-32 inline-block bg-gray-600 text-white rounded-lg mt-3 ml-2"
                @click="$router.go(-1)"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </MainLayout>
</template>
