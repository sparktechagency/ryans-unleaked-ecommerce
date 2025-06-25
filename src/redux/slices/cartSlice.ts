// redux/slices/cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { toast } from "sonner"

export type TCartProduct = {
  _id: string
  title: string
  price: number
  image?: string
}

export type TCartItem = {
  author: {
    _id: string
    name: string
  }
  items: TCartProduct[]
}

interface CartState {
  items: TCartItem[]
}

const initialState: CartState = {
  items: [],
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<TCartItem>) {
      const { author, items: newItems } = action.payload
      const existingCart = state.items.find(item => item.author._id === author._id)

      if (existingCart) {
        const hasDuplicate = newItems.some(newProduct =>
          existingCart.items.some(existingProduct => existingProduct._id === newProduct._id)
        )

        if (hasDuplicate) {
          toast.warning("Item already exists in cart.")
          return
        }

        existingCart.items.push(...newItems)
        toast.success("Item added to existing group in cart.")
      } else {
        state.items.push(action.payload)
        toast.success("Item added to cart.")
      }
    },

    removeFromCart(
      state,
      action: PayloadAction<{ productId: string; authorId: string }>
    ) {
      const { productId, authorId } = action.payload

      state.items = state.items
        .map(group =>
          group.author._id === authorId
            ? {
              ...group,
              items: group.items.filter(item => item._id !== productId),
            }
            : group
        )
        .filter(group => group.items.length > 0)
    },

    clearAuthorCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter(item => item.author._id !== action.payload)
    },

    clearCart(state) {
      state.items = []
    },
  },
})

export const { addToCart, removeFromCart, clearAuthorCart, clearCart } = cartSlice.actions
export default cartSlice.reducer
