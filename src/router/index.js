import { createRouter, createWebHistory } from "vue-router";
import Cookies from "js-cookie";
import Login from "@/views/Login.vue";
import Dashboard from "@/views/dashboard/index.vue";

// Users
import Users from "@/views/users/index.vue";
import UserCreate from "@/views/users/user-create.vue";
import UserEdit from "@/views/users/user-edit.vue";
import Role from "@/views/users/role.vue";
import RoleCreate from "@/views/users/role-create.vue";
import RoleEdit from "@/views/users/role-edit.vue";
import Permissions from "@/views/users/Permissions.vue";
import Permissionsadd from "@/views/users/Permissionsadd.vue";
import Permissionsedit from "@/views/users/Permissionsedit.vue";
//End Users

import EmployeesList from "@/views/employees/List.vue";
import SupplierAdd from "@/views/supplier/Add.vue";
import SupplierEdit from "@/views/supplier/Edit.vue";


//Setting
import ItemList from "@/views/item/index.vue"
import ItemCreate from "@/views/item/create.vue";
import ItemEdit from "@/views/item/edit.vue";



const routes = [
  {
    path: "/",
    name: "login",
    component: Login,

  },
  {
    path: "/home",
    name: "home",
    component: Dashboard,
   // meta: { isPermission: 'dashboard' }
  },
   {
    path: "/item",
    name: "item",
    component: ItemList,
   // meta: { isPermission: 'suppliers' }
  },
  {
    path: "/item/create",
    name: "item-create",
    component: ItemCreate,
   

  },
  {
    path: "/item/edit/:id",
    name: "item-edit",
    component: ItemEdit,

  },

  {
    path: "/employee",
    name: "employee",
    component: EmployeesList,
   // meta: { isPermission: 'suppliers' }
  },
  {
    path: "/supplier/add",
    name: "supplier-add",
    component: SupplierAdd,
  //  meta: { isPermission: 'suppliers' }
  },
  {
    path: "/supplier/edit/:id",
    name: "supplier-edit",
    component: SupplierEdit,
   // meta: { isPermission: 'suppliers' }
  },
  // Users
  {
    path: "/users",
    name: "users",
    component: Users,
  //  meta: { isPermission: 'users' }

  },
  {
    path: "/user-create",
    name: "user-create",
    component: UserCreate,
   // meta: { isPermission: 'users' }

  },
  {
    path: "/users/:id",
    name: "user-edit",
    component: UserEdit,
  //  meta: { isPermission: 'users' }
  },
  {
    path: "/role",
    name: "role",
    component: Role,
   // meta: { isPermission: 'users' }
  },

  {
    path: "/role-create",
    name: "role-create",
    component: RoleCreate,
   // meta: { isPermission: 'users' }

  },
  {
    path: "/role/:id",
    name: "role-edit",
    component: RoleEdit,
   // meta: { isPermission: 'users' }

  },
  {
    path: "/permissions",
    name: "permissions",
    component: Permissions,
   // meta: { isPermission: 'users' }

  },
  {
    path: "/permissionsadd",
    name: "permissionsadd",
    component: Permissionsadd,
  //  meta: { isPermission: 'users' }

  },
  {
    path: "/permissions/:id",
    name: "permissionsedit",
    component: Permissionsedit,
   // meta: { isPermission: 'users' }

  },
 
  {
    path: "/:catchAll(.*)",
    redirect: "/",
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  const token = Cookies.get("token");
  if ((to.path === "/" || to.path === "/register") && !token) {
    next();
  } else if ((to.path === "/" || to.path === "/register") && token) {
    next("/home");
  } else if (token) {
    next();
  } else {
    next("/");
  }
});

export default router;
