<template>
  <transition name="modal-animation">
    <div v-show="isActive" class="'modal'">
      <transition name="modal-inner-animation">
        <div v-show="isActive" class="inner-modal">
          <p>X</p>
          <slot />
          <button>close</button>
        </div>
      </transition>
    </div>
  </transition>
</template>
<script>
export default {
  props: ["isActive"],
};
</script>
<style></style>
