export default {
  state: {
    counter: 0,
    items: [{ message: "jenish" }],
  },
  mutations: {
    increment: (state) => {
      state.counter++;
    },
    decrement: (state) => {
      state.counter--;
    },
    addItems: (state, action) => {
      state.items.push({ message: action });
    },
  },
  actions: {
    // Your actions here
  },
  getters: {
    counterData(state) {
      return state.counter;
    },
    getItems(state) {
      return state.items;
    },
  },
};
