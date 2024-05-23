<script setup>
import { useStore } from "vuex";
import BarChart from "../Charts/BarChart.vue";
import { computed, ref, watchEffect } from "vue";

const store = useStore();
const userStatus = computed(() => {
  return store.getters.getLoginRole;
});
let userCheck = ref("user");

watchEffect(() => {
  userCheck.value =
    userStatus.value || localStorage.getItem("UserRole") || "user";
  console.log("user role dashboard>>>>", userCheck.value);
});
</script>

<template>
  <template v-if="userCheck == 'admin'">
    <BarChart />
  </template>
  <template v-else>
    <div class="flex flex-col justify-center items-center w-full h-[93vh]">
      <h1 class="text-[25px] font-light">
        Welcome Bro. You are a User. 😅 Come back as an Admin.
      </h1>
      <h1 class="text-[25px] font-light">
        This page is only accessible by Admins. 😊
      </h1>
    </div>
  </template>
</template>
