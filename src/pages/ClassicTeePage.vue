<template>
  <div class="page-wrapper">

    <div class="header">
      <div class="cart-button" :class="{'active-btn-cart': isActiveCart}" @click="activateCart">
        <span>{{ !cartCounter ? `My Cart` : `My Cart ( ${cartCounter} )` }}</span>
      </div>
      <div v-if="isActiveCart" class="cart-popup">
        <div v-for="item of cartItems">
          <div class="cart-item-row" :key="item.id">
            <div>
              <img class="cart-image-preview" :src="item.previewUrl" alt="image-preview">
            </div>
            <div class="cart-item-info">
              <div>{{ item.title }}</div>
              <div>{{ item.quantity }} x <span style="font-weight: bold">{{ item.price }}$</span></div>
              <div>Size: {{ item.size }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="product" class="content">
      <div class="image-preview">
        <img class="tee-preview" :src="product.imageURL" alt="tee-preview">
      </div>
      <div class="desc-options-control">
        <div class="title-item">{{ product.title }}</div>
        <div class="divider"></div>
        <div class="price">${{ Number(product.price).toFixed(2) }}</div>
        <div class="divider"></div>
        <div class="description" style="color: var(--font-color-second)">{{ product.description }}</div>
        <div class="size-title">
          <span style="color: var(--font-color-second); margin-top: 10px">SIZE</span>
          <span style="color: var(--star-color)">*</span>
          <span style="font-size: 20px; margin-left: 5px">{{ activeOption }}</span>
        </div>
        <div class="options-selectors">
          <div class="selector"
               :class="{'active-selector': opt.label===activeOption}"
               v-for="opt of product.sizeOptions"
               @click="setActiveOption(opt.label)"
          >
            <div :key="product.id" style="font-size: 12px; color: var(--border-light-gray)">{{ opt.label }}</div>
          </div>
        </div>
        <div class="add-cart-btn" @click="addToCart">ADD TO CART</div>
      </div>
    </div>
    <div v-else>Loading Product</div>
  </div>
</template>

<script setup lang="ts">

import {computed, onMounted, ref} from "vue"
import {useCartStore} from "../stores/cart"
import {ApiClient, IProduct} from "../apiClient/apiClient"

const apiClient = new ApiClient()
const cartStore = useCartStore()
const cartCounter = computed(() => {
  return cartStore.getTotalItemsCart
})
const cartItems = computed(() => {
  return cartStore.getMiniCart
})
const product = ref<IProduct>()
const activeOption = ref<string>()
const isActiveCart = ref<boolean>(false)

const activateCart = () => {
  isActiveCart.value = !isActiveCart.value
}
const setActiveOption = (options: string) => {
  if (activeOption.value !== options) {
    activeOption.value = options
    return
  }
  activeOption.value = ""
}

const addToCart = () => {
  if (!activeOption.value) {
    window.alert('select any size')
    return
  }
  if (product.value) {
    const itemToCart = {
      id: product.value?.id,
      price: product.value?.price,
      quantity: 1,
      previewUrl: product.value?.imageURL,
      size: activeOption.value,
      title: product.value?.title
    }
    cartStore.addItemToCart(itemToCart)
  }
}

//@ts-ignore
onMounted(async () => {
  product.value = await apiClient.getProduct()
})

</script>

<style scoped>
.page-wrapper {
  flex-direction: column;
}

.price {
  margin: -15px 0;
  font-weight: bold;
}

.header {
  margin-top: 20px;
  height: 40px;
  width: 100%;
  background: var(--header-background);
  display: flex;
  justify-content: flex-end;
}

.cart-button {
  display: flex;
  margin-right: 50px;
  align-items: center;
  height: 100%;
  padding: 0 5px;
  color: var(--font-color-second);
  cursor: pointer;
}

.tee-preview {
  max-width: 450px;
  min-width: 300px;
}

.content {
  margin: 50px 10vw 0 50px;
  display: flex;
  gap: 150px;
  overflow-x: scroll;

}

.desc-options-control {
  display: flex;
  gap: 20px;
  flex-direction: column;
  min-width: 300px;
}

.divider {
  border: 0.5px solid var(--border-light-gray);
}

.options-selectors {
  display: flex;
  justify-content: flex-start;
}

.selector {
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  border: 1px solid var(--border-light-gray);
  width: 30px;
  height: 30px;
}

.active-selector {
  border: 2px solid black;
}

.add-cart-btn {
  border: 2px solid black;
  padding: 10px;
  margin: 20px 0;
  width: 150px;
  text-align: center;
  cursor: pointer;
}

.add-cart-btn:hover {
  background: black;
  color: white;
  transition-duration: 0.2s;
}

.active-btn-cart {
  border: 1px solid var(--border-light-gray);
  background: white;
  border-bottom: white;
  color: black;
  z-index: 1;
}

.cart-popup {
  position: absolute;
  top: 60px;
  right: 50px;
  border: 1px solid var(--border-light-gray);
  width: 400px;
  height: 500px;
  background-color: white;
  overflow-y: scroll;
}

.cart-item-row {
  display: flex;
}

.cart-image-preview {
  width: 120px;
  margin: 20px;
}

.cart-item-info {
  color: black;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
  margin: 20px 0;
}

.title-item {
  font-size: 24px;
}

@media (max-width: 420px) {
  .content {
    margin: 50px 20px;
    display: flex;
    flex-direction: column;
    gap: 150px
  }

  .cart-popup {
    width: 300px;
  }
  .tee-preview{
    max-width: 370px;

  }
}
</style>