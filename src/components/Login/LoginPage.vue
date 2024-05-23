<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const router = useRouter();
const store = useStore();

const inputValue = reactive({
  email: "",
  password: "",
});

const handleSubmit = () => {
  console.log("submit<<<<", inputValue);

  if (inputValue.email !== "" && inputValue.password !== "") {
    if (
      inputValue.email === "Admin@gmail.com" &&
      inputValue.password === "12345"
    ) {
      localStorage.setItem("LoginStatus", true);
      store.commit("setLoginStatus", true);
      alert("Login Successfully");
      router.go(-1);
      inputValue.email = "";
      inputValue.password = "";
    } else {
      localStorage.setItem("LoginStatus", false);

      alert("Invalid Credentials");
    }
  } else {
    alert("Plz Fill your email and password fields");
  }
};
</script>

<template>
  <div
    class="h-[94vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <form class="mt-8" @submit.prevent="handleSubmit">
        <div class="rounded-md shadow-sm p-10 mt-10">
          <div>
            <!-- <img class="mx-auto h-12 w-auto" src="/logo.svg" alt="Logo" /> -->
            <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Log in to your account
            </h2>
          </div>
          <div class="mt-10">
            <label
              for="email-address "
              class="text-[#000000] text-[16px] font-semibold mt-5"
              >Email address</label
            >
            <input
              id="email-address"
              name="email"
              type="email"
              v-model="inputValue.email"
              autocomplete="email"
              required
              class="appearance-none mt-2 rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 bg-white text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
            />
          </div>
          <div class="mt-5">
            <label
              for="password"
              class="text-[#000000] text-[16px] font-semibold"
              >Password</label
            >
            <input
              id="password"
              name="password"
              type="password"
              v-model="inputValue.password"
              autocomplete="current-password"
              required
              class="appearance-none mt-2 rounded-none relative block w-full px-3 py-2 border bg-white border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
            />
          </div>
          <div class="mt-10">
            <button
              type="submit"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
