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
const totalPrice = ref(0);
const instaData = computed(() => {
  return store.getters.getInsta;
});
const CartData = computed(() => {
  return store.getters.getCartData;
});
watchEffect(() => {
  const res = CartData.value.reduce((acc, curr) => acc + curr.price, 0);
  totalPrice.value = res;
});

const fetDataFromApi = async () => {
  const res = await axios.get("https://dummyjson.com/products");
  // console.log(res?.data?.products);
  store.commit("setUserData", res?.data);
};
const DeleteCartData = (items) => {
  const result = CartData.value.filter((dt) => dt.id !== items);
  // console.log(">>>>>cartDelete", result);
  store.commit("setCartDataArray", result);
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
  <hr class="mt-5 mb-5" />
  <h1 class="text-[60px] p-6">Cart List</h1>
  <div
    class="grid grid-cols-1 mt-5 md:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10 ml-10 mb-5"
  >
    <ProductCard
      v-for="products in CartData"
      :key="products.id"
      :product="products"
      :dCartButton="false"
      :DeleteCart="DeleteCartData"
    />
  </div>
  <hr class="mt-5 mb-5" />
  <h1 class="text-[60px] p-6">Cart Billing</h1>
  <div class="flex w-full justify-between" v-if="CartData.length !== 0">
    <div class="relative w-full overflow-x-auto">
      <table
        class="w-full md:w-3/4 text-sm text-left md:ml-6 ml-2 rtl:text-right text-gray-500 dark:text-gray-400"
      >
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-3 py-3 rounded-s-lg">Image</th>
            <th scope="col" class="px-3 py-3">Product name</th>
            <th scope="col" class="px-3 py-3">Brand</th>
            <th scope="col" class="px-3 py-3">Qty</th>
            <th scope="col" class="px-3 py-3 rounded-e-lg">Price</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="bg-white dark:bg-gray-800"
            v-for="itemData in CartData"
            :key="itemData.id"
          >
            <td class="px-3 py-4">
              <img
                :src="itemData.thumbnail"
                alt="Product Thumbnail"
                class="w-[200px] h-20 col-span-2"
              />
            </td>

            <td class="px-3 py-4">{{ itemData.title }}</td>
            <td class="px-3 py-4">Xyz Pro</td>

            <td class="px-3 py-4">1</td>
            <td class="px-3 py-4">${{ itemData.price }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr class="font-semibold text-gray-900 dark:text-white">
            <th scope="row" class="px-3 py-3 text-base"></th>
            <th scope="row" class="px-3 py-3 text-base"></th>
            <th scope="row" class="px-3 py-3 text-base">Total :-</th>

            <td class="px-3 py-3">{{ CartData.length }}</td>
            <td class="px-3 py-3">$ {{ totalPrice }}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>
