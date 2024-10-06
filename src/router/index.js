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


//Setting

//Item
import ItemList from "@/views/setting/item/index.vue";
import ItemCreate from "@/views/setting/item/create.vue";
import ItemEdit from "@/views/setting/item/edit.vue";

//Country
import CountryList from "@/views/setting/country/index.vue";
import CountryCreate from "@/views/setting/country/create.vue";
import CountryEdit from "@/views/setting/country/edit.vue";


//Zone
import ZoneList from "@/views/setting/zone/index.vue";
import ZoneCreate from "@/views/setting/zone/create.vue";
import ZoneEdit from "@/views/setting/zone/edit.vue";

//Win Probabilities
import WinProbabilitiesList from "@/views/setting/win_probabilities/index.vue";
import WinProbabilitiesCreate from "@/views/setting/win_probabilities/create.vue";
import WinProbabilitiesEdit from "@/views/setting/win_probabilities/edit.vue";

//Thana
import ThanaList from "@/views/setting/thana/index.vue";
import ThanaCreate from "@/views/setting/thana/create.vue";
import ThanaEdit from "@/views/setting/thana/edit.vue";

//Profession
import ProfessionList from "@/views/setting/profession/index.vue";
import ProfessionCreate from "@/views/setting/profession/create.vue";
import ProfessionEdit from "@/views/setting/profession/edit.vue";

//Organization Type
import OrganizationTypeList from "@/views/setting/organization_type/index.vue";
import OrganizationTypeCreate from "@/views/setting/organization_type/create.vue";
import OrganizationTypeEdit from "@/views/setting/organization_type/edit.vue";

//Job Type
import JobTypeList from "@/views/setting/job_type/index.vue";
import JobTypeCreate from "@/views/setting/job_type/create.vue";
import JobTypeEdit from "@/views/setting/job_type/edit.vue";

//Influencing Role
import InfluencingRoleList from "@/views/setting/influencing_role/index.vue";
import InfluencingRoleCreate from "@/views/setting/influencing_role/create.vue";
import InfluencingRoleEdit from "@/views/setting/influencing_role/edit.vue";

//Industry Type
import IndustryTypeList from "@/views/setting/industry_type/index.vue";
import IndustryTypeCreate from "@/views/setting/industry_type/create.vue";
import IndustryTypeEdit from "@/views/setting/industry_type/edit.vue";

//Gender
import GenderList from "@/views/setting/gender/index.vue";
import GenderCreate from "@/views/setting/gender/create.vue";
import GenderEdit from "@/views/setting/gender/edit.vue";

//District
import DistrictList from "@/views/setting/district/index.vue";
import DistrictCreate from "@/views/setting/district/create.vue";
import DistrictEdit from "@/views/setting/district/edit.vue";

//Division
import DivisionList from "@/views/setting/division/index.vue";
import DivisionCreate from "@/views/setting/division/create.vue";
import DivisionEdit from "@/views/setting/division/edit.vue";

//Designation
import DesignationList from "@/views/setting/designation/index.vue";
import DesignationCreate from "@/views/setting/designation/create.vue";
import DesignationEdit from "@/views/setting/designation/edit.vue";

//Department
import DepartmentList from "@/views/setting/department/index.vue";
import DepartmentCreate from "@/views/setting/department/create.vue";
import DepartmentEdit from "@/views/setting/department/edit.vue";

//Business Industry
import BusinessIndustryList from "@/views/setting/business_industry/index.vue"
import BusinessIndustryCreate from "@/views/setting/business_industry/create.vue";
import BusinessIndustryEdit from "@/views/setting/business_industry/edit.vue";

//System Module

//Attendance
import AttendanceList from "@/views/attendance/index.vue";
import AttendanceCreate from "@/views/attendance/create.vue";
import AttendanceEdit from "@/views/attendance/edit.vue";

//Order
import OrderList from "@/views/order/index.vue";
import OrderCreate from "@/views/order/create.vue";
import OrderEdit from "@/views/order/edit.vue";

//Lead
import LeadList from "@/views/lead/index.vue";
import LeadCreate from "@/views/lead/create.vue";
import LeadEdit from "@/views/lead/edit.vue";

//Task
import TaskList from "@/views/task/index.vue";
import TaskCreate from "@/views/task/create.vue";
import TaskEdit from "@/views/task/edit.vue";

//Quotation
import QuotationList from "@/views/quotation/index.vue";
import QuotationCreate from "@/views/quotation/create.vue";
import QuotationItemCreate from "@/views/quotation/item-wise-create.vue";
import QuotationEdit from "@/views/quotation/edit.vue";

//Prospect
import ProspectList from "@/views/prospect/index.vue";
import ProspectCreate from "@/views/prospect/create.vue";
import ProspectOrganizationCreate from "@/views/prospect/organization-wise-create.vue";
import ProspectEdit from "@/views/prospect/edit.vue";

//Supplier
import SupplierList from "@/views/supplier/index.vue";
import SupplierCreate from "@/views/supplier/create.vue";
import SupplierEdit from "@/views/supplier/edit.vue";

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


  // Setting
  {
    path: "/item",
    name: "item",
    component: ItemList,
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
    path: "/country",
    name: "country",
    component: CountryList,
  },
  {
    path: "/country/create",
    name: "country-create",
    component: CountryCreate,

  },
  {
    path: "/country/edit/:id",
    name: "country-edit",
    component: CountryEdit,
  },

  // Zone
  {
    path: "/zone",
    name: "zone",
    component: ZoneList,
  },
  {
    path: "/zone/create",
    name: "zone-create",
    component: ZoneCreate,
  },
  {
    path: "/zone/edit/:id",
    name: "zone-edit",
    component: ZoneEdit,
  },

  // Win Probabilities
  {
    path: "/win-probabilities",
    name: "win-probabilities",
    component: WinProbabilitiesList,
  },
  {
    path: "/win-probabilities/create",
    name: "win-probabilities-create",
    component: WinProbabilitiesCreate,
  },
  {
    path: "/win-probabilities/edit/:id",
    name: "win-probabilities-edit",
    component: WinProbabilitiesEdit,
  },

  // Thana
  {
    path: "/thana",
    name: "thana",
    component: ThanaList,
  },
  {
    path: "/thana/create",
    name: "thana-create",
    component: ThanaCreate,
  },
  {
    path: "/thana/edit/:id",
    name: "thana-edit",
    component: ThanaEdit,
  },

  // Profession
  {
    path: "/profession",
    name: "profession",
    component: ProfessionList,
  },
  {
    path: "/profession/create",
    name: "profession-create",
    component: ProfessionCreate,
  },
  {
    path: "/profession/edit/:id",
    name: "profession-edit",
    component: ProfessionEdit,
  },

  // Organization Type
  {
    path: "/organization-type",
    name: "organization-type",
    component: OrganizationTypeList,
  },
  {
    path: "/organization-type/create",
    name: "organization-type-create",
    component: OrganizationTypeCreate,
  },
  {
    path: "/organization-type/edit/:id",
    name: "organization-type-edit",
    component: OrganizationTypeEdit,
  },

  // Job Type
  {
    path: "/job-type",
    name: "job-type",
    component: JobTypeList,
  },
  {
    path: "/job-type/create",
    name: "job-type-create",
    component: JobTypeCreate,
  },
  {
    path: "/job-type/edit/:id",
    name: "job-type-edit",
    component: JobTypeEdit,
  },

  // Influencing Role
  {
    path: "/influencing-role",
    name: "influencing-role",
    component: InfluencingRoleList,
  },
  {
    path: "/influencing-role/create",
    name: "influencing-role-create",
    component: InfluencingRoleCreate,
  },
  {
    path: "/influencing-role/edit/:id",
    name: "influencing-role-edit",
    component: InfluencingRoleEdit,
  },

  // Industry Type
  {
    path: "/industry-type",
    name: "industry-type",
    component: IndustryTypeList,
  },
  {
    path: "/industry-type/create",
    name: "industry-type-create",
    component: IndustryTypeCreate,
  },
  {
    path: "/industry-type/edit/:id",
    name: "industry-type-edit",
    component: IndustryTypeEdit,
  },

  // Gender
  {
    path: "/gender",
    name: "gender",
    component: GenderList,
  },
  {
    path: "/gender/create",
    name: "gender-create",
    component: GenderCreate,
  },
  {
    path: "/gender/edit/:id",
    name: "gender-edit",
    component: GenderEdit,
  },

  // District
  {
    path: "/district",
    name: "district",
    component: DistrictList,
  },
  {
    path: "/district/create",
    name: "district-create",
    component: DistrictCreate,
  },
  {
    path: "/district/edit/:id",
    name: "district-edit",
    component: DistrictEdit,
  },

  // Division
  {
    path: "/division",
    name: "division",
    component: DivisionList,
  },
  {
    path: "/division/create",
    name: "division-create",
    component: DivisionCreate,
  },
  {
    path: "/division/edit/:id",
    name: "division-edit",
    component: DivisionEdit,
  },

  // Designation
  {
    path: "/designation",
    name: "designation",
    component: DesignationList,
  },
  {
    path: "/designation/create",
    name: "designation-create",
    component: DesignationCreate,
  },
  {
    path: "/designation/edit/:id",
    name: "designation-edit",
    component: DesignationEdit,
  },

  // Department
  {
    path: "/department",
    name: "department",
    component: DepartmentList,
  },
  {
    path: "/department/create",
    name: "department-create",
    component: DepartmentCreate,
  },
  {
    path: "/department/edit/:id",
    name: "department-edit",
    component: DepartmentEdit,
  },

  // Business Industry
  {
    path: "/business-industry",
    name: "business-industry",
    component: BusinessIndustryList,
  },
  {
    path: "/business-industry/create",
    name: "business-industry-create",
    component: BusinessIndustryCreate,
  },
  {
    path: "/business-industry/edit/:id",
    name: "business-industry-edit",
    component: BusinessIndustryEdit,
  },

  // System Module
  {
    path: "/attendance",
    name: "attendance",
    component: AttendanceList,
  },
  {
    path: "/attendance/create",
    name: "attendance-create",
    component: AttendanceCreate,
  },
  {
    path: "/attendance/edit/:id",
    name: "attendance-edit",
    component: AttendanceEdit,
  },

  {
    path: "/lead",
    name: "lead",
    component: LeadList,
  },
  {
    path: "/lead/create",
    name: "lead-create",
    component: LeadCreate,
  },
  {
    path: "/lead/edit/:id",
    name: "lead-edit",
    component: LeadEdit,
  },

  {
    path: "/task",
    name: "task",
    component: TaskList,
  },
  {
    path: "/task/create",
    name: "task-create",
    component: TaskCreate,
  },
  {
    path: "/task/edit/:id",
    name: "task-edit",
    component: TaskEdit,
  },

  {
    path: "/quotation",
    name: "quotation",
    component: QuotationList,
  },
  {
    path: "/quotation/create",
    name: "quotation-create",
    component: QuotationCreate,
  },
  {
    path: "/quotation/item/create",
    name: "quotation-item-create",
    component: QuotationItemCreate,
  },
  {
    path: "/quotation/edit/:id",
    name: "quotation-edit",
    component: QuotationEdit,
  },

  {
    path: "/prospect",
    name: "prospect",
    component: ProspectList,
  },
  {
    path: "/prospect/create",
    name: "prospect-create",
    component: ProspectCreate,
  },
  {
    path: "/prospect/organization/create",
    name: "prospect-organization-create",
    component: ProspectOrganizationCreate,
  },
  {
    path: "/prospect/edit/:id",
    name: "prospect-edit",
    component: ProspectEdit,
  },

  {
    path: "/supplier",
    name: "supplier",
    component: SupplierList,
  },
  {
    path: "/supplier/create",
    name: "supplier-create",
    component: SupplierCreate,
  },
  {
    path: "/supplier/edit/:id",
    name: "supplier-edit",
    component: SupplierEdit,
  },

  {
    path: "/order",
    name: "order",
    component: OrderList,
  },
  {
    path: "/order/create",
    name: "order-create",
    component: OrderCreate,
  },
  {
    path: "/order/edit/:id",
    name: "order-edit",
    component: OrderEdit,
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
