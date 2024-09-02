<template>
  <Menu />
  <section class="w-full box-border overflow-x-hidden main-content">
    <!-- header -->
    <header class="mb-4 ml-20 mr-3">
      <div class="flex justify-between">
        <div>
          <!-- <img src="@/assets/images/logo.png" alt="logo" class="w-full" /> -->
        </div>
        <div>
          <ul class="flex items-center space-x-3 list-none p-0 profile-menu">
            <li>
              <span class="font-bold">{{ time }}</span>
            </li>
            <li>
              <span class="font-bold">{{ date }}</span>
            </li>

            <li>
              <a-dropdown :trigger="['click']">
                <a class="ant-dropdown-link cursor-pointer" @click.prevent>
                  <i
                    class="bi bi-person-circle text-lg mr-2 text-indigo-500"
                  ></i>
                  <span>{{ userInfo?.name }} ({{ userInfo?.staff_id }})</span>
                </a>
                <template #overlay>
                  <a-menu>
                    <a-menu-item>
                      <button
                        type="button"
                        class="w-full text-left"
                        @click="handleLogout($router)"
                      >
                        Logout
                      </button>
                    </a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
            </li>
          </ul>
        </div>
      </div>
    </header>
    <!-- content -->
    <div
      class="border-double border-4 border-slate-300 p-3 ml-20 mr-3 overflow-x-hidden"
    >
      <slot></slot>
    </div>
  </section>
</template>

<script setup>
import Menu from "./Menu.vue";
import { useDataStore } from "@/stores/data";
import Cookies from "js-cookie";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const dataStore = useDataStore();
const { userInfo } = storeToRefs(dataStore);

console.log(userInfo);
const router = useRouter();

let timeOptions = {
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
};

let dateOptions = {
  month: "2-digit",
  day: "2-digit",
  year: "numeric",
};

let time = ref();
let date = ref();

function updateDateTime() {
  let now = new Date();
  time.value = now.toLocaleString("en-US", timeOptions);
  date.value = now.toLocaleString("en-US", dateOptions);
}
onMounted(() => {
  updateDateTime();
  setInterval(updateDateTime, 60000);
});

window.addEventListener("keydown", (event) => {
  if (event?.key === "F3") {
    event.preventDefault();
    router.push({ name: "sales-create" });
  }
});
const handleLogout = (router) => {
  Cookies.set("token", "");
  localStorage.clear();
  dataStore.$reset();
  router.push({ name: "login" });
};
</script>
