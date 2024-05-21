<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const store = useStore();
const route = useRoute();
const router = useRouter();
const id = ref(route.params.id);

let carImage = ref(false);

let carListData = reactive(false);
const instaData = computed(() => {
  return store.getters.getInsta;
});
const CartData = computed(() => {
  return store.getters.getCartData;
});
const filterCart = (itemId) => {
  const data = CartData.value.filter((dt) => dt.id === itemId);
  return data.length !== 0 ? true : false;
};

const FilterById = async () => {
  // const res = await axios.get("https://dummyjson.com/products");
  const result = instaData.value.filter(
    (dt) => dt.id == Number(route.params.id)
  );
  carListData = result;
  // store.commit("setUserData", res?.data);
};
FilterById();

const changeImage = (path) => {
  carImage.value = path;
  setTimeout(() => {
    carImage.value = false;
  }, 8000);
};
const goBack = () => {
  router.go(-1); // Go back one step in history
};
const AddToCart = (productOneData) => {
  console.log(">>>add to cart", productOneData);
  store.commit("setCartData", productOneData);
  router.go(-1);
};
</script>
<template>
  <h1 class="mt-20">Card Details ${{ id }}</h1>
  <div v-for="product in carListData">
    <h1>{{ product }}</h1>
    <div class="max-w-3xl mx-auto">
      <!-- Product Header -->
      <div class="bg-gray-400 rounded-t-lg p-6 mb-6">
        <h1 class="text-3xl font-bold mb-2">{{ product.title }}</h1>
        <p class="text-gray-700 text-lg">${{ product.price }}</p>
      </div>

      <!-- Product Content -->
      <div class="flex flex-col md:flex-row">
        <!-- Product Image -->
        <div class="w-full md:w-1/2">
          <img
            :src="carImage || product.thumbnail"
            alt="Product Thumbnail"
            class="rounded-lg shadow-lg mb-6 w-full h-52"
          />
          <div class="flex justify-center space-x-2">
            <img
              v-for="(image, index) in product.images"
              :key="index"
              :src="image"
              alt="Product Image"
              class="w-16 h-16 object-cover rounded-lg shadow-md cursor-pointer"
              @click="changeImage(image)"
            />
          </div>
        </div>

        <!-- Product Details -->
        <div class="w-full md:w-1/2 md:pl-6">
          <div class="flex justify-between items-center mb-4">
            <div class="flex items-center space-x-2">
              <span class="text-gray-300">Rating:</span>
              <span class="text-gray-500 font-semibold">{{
                product.rating
              }}</span>
            </div>
            <div class="flex items-center space-x-2">
              <span class="text-gray-400">Stock:</span>
              <span class="text-gray-100 font-semibold">{{
                product.stock
              }}</span>
            </div>
          </div>
          <p class="text-gray-500 mb-6">{{ product.description }}</p>
          <div class="flex justify-between">
            <button
              :class="[
                'w-full md:w-1/2 py-2',
                filterCart(product.id) ? 'bg-green-500' : 'bg-blue-500',
              ]"
              @click="!filterCart(product.id) ? AddToCart(product) : ''"
              :disabled="filterCart(product.id)"
            >
              {{ filterCart(product.id) ? "Added" : " Add to Cart" }}
            </button>
            <button
              class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
              @click="goBack"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
