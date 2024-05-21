<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
const store = useStore();

defineProps({
  product: Object,
  dCartButton: Boolean,
  DeleteCart: Function,
});
const CartData = computed(() => {
  return store.getters.getCartData;
});
const filterCart = (itemId) => {
  const data = CartData.value.filter((dt) => dt.id === itemId);
  return data.length !== 0 ? true : false;
};
const showFullDescription = ref(false);
const showButton = ref(false);

const truncatedDescription = (description) => {
  if (description.length > 41 && !showFullDescription.value) {
    return description.slice(0, 41) + "...";
  }
  return description;
};

const isDescriptionTruncated = (description) => {
  return description.length > 41 && !showFullDescription.value;
};

const toggleDescription = () => {
  showFullDescription.value = !showFullDescription.value;
};

const AddToCart = (productOneData) => {
  console.log(">>>add to cart", productOneData);
  store.commit("setCartData", productOneData);
  showButton.value = true;
};
</script>

<template>
  <div class="max-w-sm rounded overflow-hidden shadow-lg">
    <img :src="product.thumbnail" alt="Product Thumbnail" class="w-full h-52" />
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2">{{ product.title }}</div>
      <p class="text-gray-300 text-base" v-if="!showFullDescription">
        {{ truncatedDescription(product.description) }}
        <span v-if="isDescriptionTruncated(product.description)">
          <a href="#" @click.prevent="toggleDescription" class="text-blue-400"
            >View more</a
          >
        </span>
      </p>
      <!-- Display full description with "View less" link when expanded -->
      <p class="text-gray-300 text-base" v-else>
        {{ product.description }}
        <a href="#" @click.prevent="toggleDescription" class="text-blue-400"
          >View less</a
        >
      </p>
    </div>
    <div class="px-6 py-4">
      <span
        class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
        >{{ product.category }}</span
      >
      <span
        class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700"
        >{{ product.brand }}</span
      >
    </div>
    <div class="px-6 py-4">
      <span class="text-gray-400 text-base">Price: ${{ product.price }}</span>
      <span class="text-gray-400 text-base ml-4"
        >Discount: {{ product.discountPercentage }}%</span
      >
    </div>
    <div class="px-6 py-4">
      <span
        class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
        >Rating: {{ product.rating }}</span
      >
      <span
        class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700"
        >{{ product.stock }} in stock</span
      >
    </div>
    <!-- <div class="my-3 mx-3">
      <router-link :to="'/carddetails/' + product.id" class="text-blue-500"
        >View Details</router-link
      >
    </div> -->
    <div class="mt-3 flex px-6 py-4 items-center">
      <div class="md:w-1/2 w-full md:ml-3">
        <router-link :to="'/carddetails/' + product.id" class="text-blue-500"
          >View Details</router-link
        >
      </div>
      <button
        :class="[
          'w-full md:w-1/2 py-2',
          filterCart(product.id) ? 'bg-green-500' : 'bg-blue-500',
        ]"
        @click="!filterCart(product.id) ? AddToCart(product) : ''"
        v-if="dCartButton"
        :disabled="filterCart(product.id)"
      >
        {{ filterCart(product.id) ? "Added" : "Add to cart" }}
      </button>
      <button
        class="w-full bg-red-400 py-2"
        @click="DeleteCart(product?.id)"
        v-else="dCartButton"
      >
        Remove to cart
      </button>
    </div>
  </div>
</template>
