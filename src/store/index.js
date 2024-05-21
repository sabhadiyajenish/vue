// src/store/index.js
import { createStore } from "vuex";
import HelloWorld from "./HelloWorld/helloWorld";
import ListOfView from "./ListOfRows/listofRows";

const store = createStore({
  modules: {
    ListOfView,
    HelloWorld,
  },
});

export default store;
