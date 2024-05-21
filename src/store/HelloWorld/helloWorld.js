export default {
  state: {
    instaData: [],
    addedCartList: [],
  },
  mutations: {
    setUserData: (state, action) => {
      state.instaData = action?.products;
    },
    setCartData: (state, action) => {
      state.addedCartList.push(action);
    },
    setCartDataArray: (state, action) => {
      state.addedCartList = action;
    },
  },
  actions: {
    // Your actions here
  },
  modules: {
    // Your modules here
  },
  getters: {
    getInsta(state) {
      return state.instaData;
    },
    getCartData(state) {
      return state.addedCartList;
    },
  },
};
