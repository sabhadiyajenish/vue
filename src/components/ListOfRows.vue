<script setup>
import axios from "axios";
import { reactive, onMounted, computed, ref, watch, watchEffect } from "vue";
import { useStore } from "vuex";
import ProductCard from "./Products/ProductCard.vue";
const store = useStore();

defineProps({
  item: Array,
  data1: Array,
});

onMounted(() => {
  fetDataFromApi();
});
const instaData = computed(() => {
  return store.getters.getInsta;
});

const fetDataFromApi = async () => {
  const res = await axios.get("https://dummyjson.com/products");
  // console.log(res?.data?.products);
  store.commit("setUserData", res?.data);
};
</script>

<template>
  <div
    class="grid grid-cols-1 mt-5 md:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10 ml-10"
  >
    <ProductCard
      v-for="products in instaData"
      :key="products.id"
      :product="products"
      :dCartButton="true"
    />
  </div>
</template>
