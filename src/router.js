// router.js
import { createRouter, createWebHistory } from "vue-router";
import ListOfRows from "./components/ListOfRows.vue";
import Company from "./components/Company/Company.vue";
import Service from "./components/Service/Service.vue";
import Contact from "./components/Contact/Contact.vue";
import AboutPage from "./components/About/AboutPage.vue";
import CardDetails from "./components/CardDetails/CardDetails.vue";
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

export default router;
