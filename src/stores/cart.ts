import {defineStore} from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => {
    return {
      cart: [] as ICartItem[]
    }
  },
  getters: {
    getMiniCart(state): ICartItem[] {
      return state.cart
    },
    getTotalItemsCart(state): number {
      return state.cart.reduce((acc,cur) => {
        return acc += cur.quantity
      } ,0)
    }
  },
  actions: {
    addItemToCart(itemToAdd: ICartItem) {
      const existedItem = this.cart.find(item => item.size === itemToAdd.size)
      if (!existedItem) {
        const newTee = {
          size: itemToAdd.size,
          price: itemToAdd.price,
          quantity: 1,
          id: itemToAdd.id,
          previewUrl: itemToAdd.previewUrl,
          title: itemToAdd.title
        }
        this.cart.push(newTee)
        return
      }
      existedItem.quantity += 1
    }
  },
  persist: true
})

export interface ICartItem {
  size: string
  price: number
  quantity: number
  id: number
  previewUrl: string,
  title: string
}
