<script setup>
import ListOfRows from "./ListOfRows.vue";
// import { ref, computed } from "vue";
// import { useStore } from "vuex";
// const store = useStore();
// defineProps({
//   msg: String,
// });
// const count = computed(() => {
//   return store.getters.counterData;
// });
// const itemsData = computed(() => {
//   return store.getters.getItems;
// });
// const instaData = computed(() => {
//   return store.getters.getInsta;
// });
// const Increment = () => {
//   console.log("enter in incremnt");
//   store.commit("increment");
// };
// const Decrement = () => {
//   console.log("enter in Decremnt");
//   store.commit("decrement");
// };
// let addMessage = ref("");

// const AddElement = () => {
//   // console.log("enter in Decremnt");
//   if (addMessage.value !== "") {
//     store.commit("addItems", addMessage.value);
//     addMessage.value = "";
//   } else {
//   }
// };
</script>

<template>
  <!-- <h1>{{ count }}</h1>
  <h3>{{ nameWith }}</h3> -->
  <div class="card">
    <!-- <button type="button" @click="Increment">Increment</button>
    <button class="ml-5" type="button" @click="Decrement">Decrement</button>
    <input type="text" v-model="addMessage" />
    <button class="mt-5" @click="AddElement">Add</button> -->
    <ListOfRows />
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
