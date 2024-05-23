export default {
  state: {
    instaData: [],
    addedCartList: [],
    loginStatus: false,
    loginType: "",
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
    setLoginStatus: (state, action) => {
      state.loginStatus = action;
    },
    setLoginRoles: (state, action) => {
      state.loginType = action;
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
    getLoginStatus(state) {
      return state.loginStatus;
    },
    getLoginRole(state) {
      return state.loginType;
    },
  },
};
