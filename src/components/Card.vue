<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  setup(props) {
    const store = useStore();

    function addItemToCart() {
      store.commit("addCartItem", props.product);
    }

    const cartItems = computed(function () {
      return store.state.cart;
    });

    const isItemExists = computed(function () {
      const isExist = store.state.cart.find(
        (el) => el.productId === props.product.productId
      );
      return isExist;
    });

    function incrementQuantity() {
      store.commit("incrementItemQuantity", props.product);
    }

    function decrementQuantity() {
      store.commit("decrementItemQuantity", props.product);
    }

    return {
      addItemToCart,
      cartItems,
      isItemExists,
      incrementQuantity,
      decrementQuantity,
    };
  },

  props: ["product"],
};
</script>
<template>
  <div class="card">
    <div class="imageContainer">
      <img class="productImg" :src="product.img" :alt="product.productName" />
    </div>
    <div class="infoContainer">
      <h3>{{ product.productName }}</h3>
      <p v-if="product.discountPrice" class="discountPrice">
        {{ product.discountPrice }} <span>{{ product.price }}</span>
      </p>
      <p v-else class="price">{{ product.price }}</p>
      <p>Available in stock: {{ product.stock }}</p>
      <div>
        <button
          v-if="!isItemExists"
          v-on:click="addItemToCart()"
          class="addToCartBtn"
        >
          Add to cart
        </button>
        <div v-else class="quantityContainer">
          <Button class="decrementBtn" v-on:click="decrementQuantity">-</Button
          ><span class="itemQuantityContainer">{{ isItemExists.quantity }}</span
          ><button class="incrementBtn" v-on:click="incrementQuantity">
            +
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  border-radius: 5px;
}
.imageContainer {
  background-color: lightgrey;
}
.imageContainer > img {
  height: 300px;
  width: 100%;
}
.price {
  color: gray;
  font-size: 17px;
}
.addToCartBtn {
  background-color: black;
  color: white;
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 40px;
  padding-right: 40px;
  text-transform: uppercase;
}
.discountPrice {
  color: red;
  font-size: 17px;
  margin-right: 10px;
}
.infoContainer {
  padding: 10px;
}
.discountPrice > span {
  text-decoration: line-through;
  color: gray;
  font-size: 17px;
}
.decrementBtn,
.incrementBtn {
  background-color: black;
  color: white;
  padding: 15px;
  text-transform: uppercase;
}
.itemQuantityContainer {
  background-color: beige;
  font-size: 20px;
  padding: 15px 60px;
}
.quantityContainer {
  display: "flex";
  align-items: center;
  justify-content: center;
}
</style>
