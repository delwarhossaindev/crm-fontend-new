<template>
  <div id="customSidebar" ref="customSidebar">
    <sidebar-menu :menu="menu" :collapsed="isCollapsed" width="200px"
      @update:collapsed="onToggleCollapse" />
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import { useRoute } from "vue-router";
const isCollapsed = ref(false);

const menu = ref([
  {
    header: "CRM",
    hiddenOnCollapse: true,
    permission: "dashboard",
  },
  {
    title: "Dashboard",
    icon: "bi bi-speedometer2",
    href: { name: "home" },
    permission: "dashboard",
    class: "",
  },
  {
    title: "Item",
    icon: "bi bi-download",
    href: { name: "item" },
    isExpanded: false,
    permission: "",
    class: "",
  },
  {
    title: "Employees",
    icon: "bi bi-download",
    href: { name: "employee" },
    isExpanded: false,
    permission: "suppliers",
    class: "",
  },
  {
    title: "User",
    icon: "bi bi-people",
    href: { name: "users" },
    isExpanded: false,
    permission: "users",
    class: "",
  },
]);

const userPermissions = ref(JSON.parse(localStorage.getItem("permissions")));

const filteredMenuItems = computed(() => {
  return menu.value.filter((item) => {
    if (item.permission && userPermissions.value?.includes(item.permission)) {
      if (item.child) {
        item.child = item.child.filter((child) =>
          userPermissions.value.includes(child.permission || "")
        );
      }
      return true;
    }
    return false;
  });
});

// Route
const route = useRoute();
const customSidebar = ref();

watch(customSidebar, () => {
  const paths = route?.path?.split("/")?.at(1);
  const nestedPath = paths?.split("-")?.at(0);
  const index = menu.value.findIndex((item) => item?.href?.name == nestedPath);

  index > 0 && (menu.value[index].class = "active");
});

const onToggleCollapse = (toggle) => {
  const sidebar = document.querySelector(".main-content");

  if (toggle) {
    sidebar.style.padding = "16px";
  } else {
    sidebar.style.padding = "16px 16px 16px 140px";
  }
};
</script>

<style>
.v-sidebar-menu .vsm--link_hover,
.v-sidebar-menu .vsm--link_active,
.active {
  background: #000180 !important;
}

.vsm--menu a {
  font-size: 14px !important;
}

.main-content {
  padding: 16px 16px 16px 140px;
}

.vsm--link_level-2 {
  padding-left: 30px !important;
}
</style>
