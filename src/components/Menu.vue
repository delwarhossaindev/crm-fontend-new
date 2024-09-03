<template>
  <div id="customSidebar" ref="customSidebar">
    <sidebar-menu
      :menu="menu"
      :collapsed="isCollapsed"
      width="200px"
      @update:collapsed="onToggleCollapse"
    />
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
    title: "Employees",
    icon: "bi bi-download",
    href: { name: "employee" },
    isExpanded: false,
    permission: "suppliers",
    class: "",
  },
  {
    title: "Setting",
    icon: "bi bi-download",
    isExpanded: false,
    class: "",
    child: [
      {
        title: "Items",
        href: { name: "item" },
        icon: "bi bi-list",
      },
      {
        title: "Country",
        icon: "bi bi-list",
      },
      {
        title: "Zone",
        icon: "bi bi-list",
      },
      {
        title: "Organization Type",
        icon: "bi bi-list",
      },
      {
        title: "Business Industry",
        icon: "bi bi-list",
      },
      {
        title: "Designation",
        icon: "bi bi-list",
      },
      {
        title: "Departments",
        icon: "bi bi-list",
      },
      {
        title: "Professions",
        icon: "bi bi-list",
      },
      {
        title: "Job Types",
        icon: "bi bi-list",
      },
      {
        title: "Genders",
        icon: "bi bi-list",
      },
      {
        title: "Influencing Roles",
        icon: "bi bi-list",
      },
      {
        title: "Industry Types",
        icon: "bi bi-list",
      },
      {
        title: "Divisions",
        icon: "bi bi-list",
      },
      {
        title: "Districts",
        icon: "bi bi-list",
      },
      {
        title: "Thana",
        icon: "bi bi-list",
      },
      {
        title: "Win Probabilities",
        icon: "bi bi-list",
      },
    ],
  },
  {
    title: "User",
    icon: "bi bi-people",
    href: { name: "users" },
    isExpanded: false,
    permission: "users",
    class: "",
  },
  {
    title: "Setting",
    icon: "bi bi-download",
    isExpanded: false,
    class: "",
    child: [
      {
        title: "Items",
        href: { name: "item" },
        icon: "bi bi-list",
      },
      {
        title: "Country",
        icon: "bi bi-list",
      },
      {
        title: "Zone",
        icon: "bi bi-list",
      },
      {
        title: "Organization Type",
        icon: "bi bi-list",
      },
      {
        title: "Business Industry",
        icon: "bi bi-list",
      },
      {
        title: "Designation",
        icon: "bi bi-list",
      },
      {
        title: "Departments",
        icon: "bi bi-list",
      },
      {
        title: "Professions",
        icon: "bi bi-list",
      },
      {
        title: "Job Types",
        icon: "bi bi-list",
      },
      {
        title: "Genders",
        icon: "bi bi-list",
      },
      {
        title: "Influencing Roles",
        icon: "bi bi-list",
      },
      {
        title: "Industry Types",
        icon: "bi bi-list",
      },
      {
        title: "Divisions",
        icon: "bi bi-list",
      },
      {
        title: "Districts",
        icon: "bi bi-list",
      },
      {
        title: "Thana",
        icon: "bi bi-list",
      },
      {
        title: "Win Probabilities",
        icon: "bi bi-list",
      },
    ],
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
