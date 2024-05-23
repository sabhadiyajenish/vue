// router.js
import { createRouter, createWebHistory } from "vue-router";
import ListOfRows from "./components/ListOfRows.vue";
import Company from "./components/Company/Company.vue";
import Service from "./components/Service/Service.vue";
import Contact from "./components/Contact/Contact.vue";
import AboutPage from "./components/About/AboutPage.vue";
import CardDetails from "./components/CardDetails/CardDetails.vue";
import LoginPage from "./components/Login/LoginPage.vue";
import DashboardPage from "./components/Dashboard/DashboardPage.vue";
import CartListPage from "./components/CartList/CartListPage.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: ListOfRows,
  },
  {
    path: "/company",
    name: "Company",
    component: Company,
    meta: { requiresAuth: true },
  },
  {
    path: "/contact",
    name: "Contact",
    component: Contact,
  },
  {
    path: "/about",
    name: "About",
    component: AboutPage,
  },
  {
    path: "/service",
    name: "Service",
    component: Service,
  },
  {
    path: "/charts",
    name: "charts",
    meta: { requiresAuth: true },
    component: DashboardPage,
  },
  {
    path: "/login",
    name: "Login",
    component: LoginPage,
  },
  {
    path: "/cartlist",
    name: "Cartlist",
    component: CartListPage,
  },
  {
    path: "/carddetails/:id",
    name: "carddetails",
    component: CardDetails,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("LoginStatus") === "true";

  // console.log(isAuthenticated);

  // If accessing the login route and already authenticated, redirect to homepage
  if (to.name === "Login" && isAuthenticated) {
    next("/");
  } else if (to.matched.some((record) => record.meta.requiresAuth)) {
    // Check if user is authenticated for other routes that require authentication
    if (isAuthenticated) {
      next();
    } else {
      // If not authenticated, redirect to login page
      next("/login");
    }
  } else {
    // Allow navigation for routes that don't require authentication
    next();
  }
});

export default router;
