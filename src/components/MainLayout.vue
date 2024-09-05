<template>
  <Menu />
  <section class="w-full box-border overflow-x-hidden main-content">
    <!-- header -->
    <header class="mb-4 ml-20 mr-3">
      <div class="flex justify-between">
        <div></div>
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
                        @click="handleLogout"
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
import { onMounted, ref, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";

const dataStore = useDataStore();
const { userInfo } = storeToRefs(dataStore);
const router = useRouter();

const time = ref();
const date = ref();

const timeOptions = {
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
};

const dateOptions = {
  month: "2-digit",
  day: "2-digit",
  year: "numeric",
};

const updateDateTime = () => {
  const now = new Date();
  time.value = now.toLocaleString("en-US", timeOptions);
  date.value = now.toLocaleString("en-US", dateOptions);
};

onMounted(() => {
  updateDateTime();
  const intervalId = setInterval(updateDateTime, 60000);

  const handleKeydown = (event) => {
    if (event?.key === "F3") {
      event.preventDefault();
      router.push({ name: "sales-create" });
    }
  };
  
  window.addEventListener("keydown", handleKeydown);

  // Clean up event listener and interval on unmount
  onBeforeUnmount(() => {
    clearInterval(intervalId);
    window.removeEventListener("keydown", handleKeydown);
  });
});

const handleLogout = () => {
  Cookies.set("token", "");
  localStorage.clear();
  dataStore.$reset();
  router.push({ name: "login" });
};
</script>
