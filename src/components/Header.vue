<script setup>
import { computed, onMounted, ref, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
const store = useStore();

const router = useRouter();

const route = useRoute();
const status = ref(false);

const LoginCheck = computed(() => {
  return store.getters.getLoginStatus;
});
watchEffect(() => {
  const storedStatus = localStorage.getItem("LoginStatus");
  console.log("routes user<<<", storedStatus);
  if (LoginCheck.value !== true) {
    status.value = Boolean(storedStatus === "true");
  } else {
    status.value = LoginCheck.value;
  }
});

console.log("getvstatus form store", LoginCheck.value);
const isActive = (path) => {
  // Check if the current route path matches the given path
  return route.path === path;
};
const handleLogout = () => {
  localStorage.setItem("LoginStatus", false);
  const storedStatus = localStorage.getItem("LoginStatus");
  status.value = Boolean(storedStatus === "true");
  store.commit("setLoginStatus", false);

  router.push("/login");
};
</script>

<template>
  <header class="w-full">
    <nav class="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
      <div
        class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl"
      >
        <a href="https://flowbite.com" class="flex items-center">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            class="mr-3 h-6 sm:h-9"
            alt="Flowbite Logo"
          />
          <span
            class="self-center text-xl font-semibold whitespace-nowrap dark:text-white"
            >Vue js</span
          >
        </a>
        <div class="flex items-center lg:order-2">
          <router-link
            v-if="!status"
            to="/login"
            class="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
            >Log in</router-link
          >
          <a
            v-else
            @click="handleLogout"
            class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
            >Logout</a
          >
          <button
            data-collapse-toggle="mobile-menu-2"
            type="button"
            class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="mobile-menu-2"
            aria-expanded="false"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <svg
              class="hidden w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div
          class="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
          id="mobile-menu-2"
        >
          <ul
            class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0"
          >
            <li>
              <router-link
                to="/"
                :class="
                  ('block py-2 pr-4 pl-3 text-white rounded font-light lg:p-0 dark:text-white',
                  { active: isActive('/') })
                "
                >Home</router-link
              >
            </li>
            <li>
              <router-link
                to="/company"
                :class="{ active: isActive('/company') }"
                >Company</router-link
              >
            </li>
            <li>
              <router-link
                to="/contact"
                :class="
                  ('block py-2 pr-4 pl-3 text-white rounded font-light lg:p-0 dark:text-white',
                  { active: isActive('/contact') })
                "
                >Contact</router-link
              >
            </li>

            <li>
              <router-link
                to="/about"
                :class="
                  ('block py-2 pr-4 pl-3 text-white rounded  lg:p-0 dark:text-white',
                  { active: isActive('/about') })
                "
                >About</router-link
              >
            </li>
            <li>
              <router-link
                to="/service"
                :class="
                  ('block py-2 pr-4 pl-3 text-white rounded  lg:p-0 dark:text-white',
                  { active: isActive('/service') })
                "
                >Service</router-link
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<style>
/* Style for active link */
.active {
  font-weight: bolder;
  /* color: blue; */
}
</style>
