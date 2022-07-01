<template>
  <main>
    <button class="cartBtn" @click="showModal">
      Cart <span>{{ cartItems.length }}</span>
    </button>
    <div class="cardsContainer">
      <product-card
        v-for="product in products"
        :key="product.productId"
        :product="product"
      />
    </div>
    <modal :isActive="true">
      <div class="modal-content">
        <h1>Modal Header</h1>
        <p>Modal content</p>
      </div>
    </modal>
  </main>
</template>

<script>
import Card from "./components/Card.vue";
import Modal from "./components/Modal.vue";
import { useStore } from "vuex";
import { computed, onMounted, ref } from "vue";

export default {
  setup() {
    const store = useStore();

    const cartItems = computed(function () {
      return { items: store.state.cart, length: store.state.cart.length };
    });

    const products = computed(function () {
      return store.state.products;
    });

    onMounted(() => {
      store.dispatch("getAllProducts");
    });

    const isShow = ref(false);

    function showModal() {
      isShow.value = true;
    }

    function closeModal() {
      isShow.value = false;
    }

    return { cartItems, products, isShow, showModal, closeModal };
  },

  components: { "product-card": Card, modal: Modal },
};
</script>

<style scoped>
main {
  padding: 20px;
}
.cardsContainer {
  display: grid;
  gap: 20px;
  margin-top: 20px;
}
.cartBtn {
  background-color: black;
  color: white;
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 40px;
  padding-right: 40px;
  text-transform: uppercase;
  cursor: pointer;
  max-width: 10%;
}
@media (min-width: 600px) {
  .cardsContainer {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 900px) {
  .cardsContainer {
    grid-template-columns: repeat(5, 1fr);
  }
}

.modal {
  width: 300px;
  padding: 30px;
  box-sizing: border-box;
  background-color: red;
  font-size: 20px;
  text-align: center;
}
</style>
