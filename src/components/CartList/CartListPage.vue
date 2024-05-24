<script setup>
import axios from "axios";
import { reactive, onMounted, computed, ref, watch, watchEffect } from "vue";
import { useStore } from "vuex";
import ProductCard from "../Products/ProductCard.vue";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import ImageCar from "../../../public/car4.jfif";
const store = useStore();

const totalPrice = ref(0);
const loadingPdf = ref(false);
const CartData = computed(() => {
  return store.getters.getCartData;
});

const downloadPdf = async () => {
  loadingPdf.value = true;
  const element = document.getElementById("pdf-content");
  const images = element.getElementsByTagName("img");

  const promises = [];
  for (let i = 0; i < images.length; i++) {
    const promise = new Promise((resolve, reject) => {
      if (images[i].complete) {
        // If the image is already loaded, resolve the promise immediately
        resolve();
      } else {
        images[i].onload = () => {
          console.log(`Image ${i} loaded`);
          resolve();
        };
        images[i].onerror = (error) => {
          console.error(`Error loading image ${i}:`, error);
          reject(error);
        };
      }
    });
    promises.push(promise);
  }

  try {
    await Promise.all(promises);
    console.log("All images loaded, generating PDF...");

    // Set the DPI (dots per inch) to a higher value (e.g., 300)
    const dpi = 300;
    const canvas = await html2canvas(element, { scale: dpi / 96 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("card_details.pdf");
    loadingPdf.value = false;
  } catch (error) {
    console.error("Error generating PDF:", error);
    loadingPdf.value = false;
  }
};

watchEffect(() => {
  const res = CartData.value.reduce((acc, curr) => acc + curr.price, 0);
  totalPrice.value = res;
});

const DeleteCartData = (items) => {
  const result = CartData.value.filter((dt) => dt.id !== items);
  // console.log(">>>>>cartDelete", result);
  store.commit("setCartDataArray", result);
};
</script>

<template>
  <div
    class="grid grid-cols-1 mt-5 md:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10 ml-10 mb-5"
    v-if="CartData.length !== 0"
  >
    <ProductCard
      v-for="products in CartData"
      :key="products.id"
      :product="products"
      :dCartButton="false"
      :DeleteCart="DeleteCartData"
    />
  </div>
  <div class="h-[94vh] flex items-center justify-center text-center" v-else>
    <h1 class="text-[25px]">Cart is empty...</h1>
  </div>
  <div v-if="CartData.length !== 0">
    <hr class="mt-5 mb-5" />
    <h1 class="text-[60px] p-6">Cart Billing</h1>
    <button @click="downloadPdf" class="bg-red-300 p-2 mx-5 mb-5">
      {{ loadingPdf.value ? "Waiting ..." : "Click to Pdf" }}
    </button>
  </div>
  <div
    class="flex w-full justify-between bg-white pt-10"
    v-if="CartData.length !== 0"
  >
    <div class="relative w-full overflow-x-auto">
      <table
        class="w-full md:w-3/4 text-sm text-left md:ml-6 ml-2 rtl:text-right text-gray-500 dark:text-gray-400"
        id="pdf-content"
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
            <td class="px-3 py-4">{{ itemData.brand }}</td>

            <td class="px-3 py-4">1</td>
            <td class="px-3 py-4">${{ itemData.price }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr class="font-semibold text-gray-900 dark:text-white">
            <th scope="row" class="px-3 py-3 text-base"></th>
            <th scope="row" class="px-3 py-3 text-base"></th>
            <th scope="row" class="px-3 py-3 text-base text-gray-900">
              Total :-
            </th>

            <td class="px-3 py-3 text-gray-900">{{ CartData.length }}</td>
            <td class="px-3 py-3 text-gray-900">$ {{ totalPrice }}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>
