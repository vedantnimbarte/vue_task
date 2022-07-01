import { createStore } from "vuex";
import productsList from "../products.json";

export default createStore({
  state: {
    products: [],
    cart: [],
  },

  mutations: {
    saveProducts(state, data) {
      state.products = data;
    },
    addCartItem(state, item) {
      item.quantity = 1;
      state.cart.push(item);
    },
    removeCartItem(state, item) {
      state.cart = state.cart.filter((cartItem) => {
        return cartItem.id != item.id;
      });
    },
    incrementItemQuantity(state, item) {
      if (item.quantity > 0) {
        state.cart.find(
          (el) =>
            el.productId === item.productId &&
            el.quantity < item.stock &&
            el.quantity++
        );
      }
    },
    decrementItemQuantity(state, item) {
      if (item.quantity > 0) {
        state.cart.find(
          (el) =>
            el.productId === item.productId && el.quantity > 0 && el.quantity--
        );
      } else {
        const index = state.cart
          .map(function (x) {
            return x.productId;
          })
          .indexOf(item.productId);
        const cartState = state.cart;
        state.cart.splice(index, 1);
      }
    },
  },
  actions: {
    getAllProducts({ commit }) {
      const products = [...productsList];

      commit("saveProducts", products);
    },
  },
});
