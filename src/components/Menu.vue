<template>
  <div id="customSidebar" ref="customSidebar">
    <sidebar-menu
      :menu="menu"
      :collapsed="isCollapsed"
      width="210px"
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
    title: "Attendance",
    icon: "bi bi-calendar-check", // Represents attendance with a calendar and checkmark
    href: { name: "attendance" },
    isExpanded: false,
    class: "",
  },
  {
    title: "Order",
    icon: "bi bi-cart", // A shopping cart represents orders
    href: { name: "order" },
    isExpanded: false,
    class: "",
  },
  {
    title: "Prospect",
    icon: "bi bi-person-plus", // A person with a plus sign suggests potential customers or prospects
    isExpanded: false,
    class: "",
  },
  {
    title: "Quotation",
    icon: "bi bi-receipt", // A receipt represents quotes or financial documents
    href: { name: "quotation" },
    isExpanded: false,
    class: "",
  },
  {
    title: "Supplier",
    icon: "bi bi-truck", // A truck icon represents suppliers and logistics
    href: { name: "supplier" },
    isExpanded: false,
    class: "",
  },
  {
    title: "Lead",
    icon: "bi bi-lightbulb", // A lightbulb represents ideas or potential leads
    href: { name: "lead" },
    isExpanded: false,
    class: "",
  },
  // {
  //   title: "Followup",
  //   icon: "bi bi-arrow-repeat", // A repeating arrow indicates follow-up actions
  //   isExpanded: false,
  //   class: "",
  // },
  // {
  //   title: "SMS",
  //   icon: "bi bi-chat-dots", // A chat bubble represents SMS or communication
  //   isExpanded: false,
  //   class: "",
  // },
  {
    title: "Task",
    icon: "bi bi-list-check", // A checklist represents tasks or to-dos
    href: { name: "task" },
    isExpanded: false,
    class: "",
  },
  // {
  //   title: "Collection",
  //   icon: "bi bi-cash", // Cash icon represents payment collection
  //   isExpanded: false,
  //   class: "",
  // },
  {
    title: "User Management",
    icon: "bi bi-people", // People icon for user management (already correct)
    href: { name: "users" },
    isExpanded: false,
    permission: "users",
    class: "",
  },
  {
    title: "Setting",
    icon: "bi bi-sliders",
    isExpanded: false,
    class: "",
    child: [
      {
        title: "Items",
        href: { name: "item" },
        icon: "bi bi-box", // Represents a physical or virtual item
      },
      {
        title: "Country",
        href: { name: "country" },
        icon: "bi bi-flag", // Flag for representing countries
      },
      {
        title: "Zone",
        href: { name: "zone" },
        icon: "bi bi-geo", // Geo marker for zones or regions
      },
      {
        title: "Organization Type",
        href: { name: "organization-type" },
        icon: "bi bi-building", // Represents an organization or building
      },
      {
        title: "Business Industry",
        href: { name: "business-industry" },
        icon: "bi bi-briefcase", // Briefcase for business or industry
      },
      {
        title: "Designation",
        href: { name: "designation" },
        icon: "bi bi-person-badge", // Badge for a specific job title or role
      },
      {
        title: "Department",
        href: { name: "department" },
        icon: "bi bi-diagram-3", // Represents organizational structure or department
      },
      {
        title: "Profession",
        href: { name: "profession" },
        icon: "bi bi-person-workspace", // Workspace or job role symbol
      },
      {
        title: "Job Type",
        href: { name: "job-type" },
        icon: "bi bi-briefcase-fill", // Job symbol
      },
      {
        title: "Gender",
        href: { name: "gender" },
        icon: "bi bi-gender-ambiguous", // Gender-specific icon
      },
      {
        title: "Influencing Role",
        href: { name: "influencing-role" },
        icon: "bi bi-person-check", // Person in a role with influence or approval
      },
      {
        title: "Industry Type",
        href: { name: "industry-type" },
        icon: "bi bi-tools", // Industry-related tools icon
      },
      {
        title: "Division",
        href: { name: "division" },
        icon: "bi bi-grid", // Grid for administrative divisions
      },
      {
        title: "District",
        href: { name: "district" },
        icon: "bi bi-map", // Map icon for districts
      },
      {
        title: "Thana",
        href: { name: "thana" },
        icon: "bi bi-geo-alt", // Geo pin for local areas like Thana
      },
      {
        title: "Win Probabilities",
        href: { name: "win-probabilities" },
        icon: "bi bi-graph-up-arrow", // Graph for representing probabilities or chances
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
