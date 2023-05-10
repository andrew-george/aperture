import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { CartItemModel } from '../models'
import type { RootState } from './store'

interface CartState {
	items: CartItemModel[]
}

const initialState: CartState = {
	items: [],
}

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (state, action: PayloadAction<CartItemModel>) => {
			const { payload } = action
			const foundIndex = state.items.findIndex(
				item => item.slug === payload.slug && item.size === payload.size && item.finish === payload.finish
			)

			if (foundIndex >= 0) {
				state.items[foundIndex].quantity = state.items[foundIndex].quantity + payload.quantity
			} else {
				state.items.push(payload)
			}

			localStorage.setItem('cart', JSON.stringify(state))
		},

		removeFromCart: (state, action: PayloadAction<string>) => {
			state.items = state.items.filter(item => item.id !== action.payload)

			localStorage.setItem('cart', JSON.stringify(state))
		},

		incrementCartItem: (state, action: PayloadAction<string>) => {
			const foundIndex = state.items.findIndex(item => item.id === action.payload)
			state.items[foundIndex].quantity++
		},

		decrementCartItem: (state, action: PayloadAction<string>) => {
			const foundIndex = state.items.findIndex(item => item.id === action.payload)
			const foundQuantity = state.items[foundIndex].quantity
			if (foundQuantity === 1) return
			state.items[foundIndex].quantity--
		},

		setCartState: (state, action: PayloadAction<CartState>) => (state = action.payload),
	},
})

export const cart = (state: RootState) => state.cart

export const { addToCart, setCartState, removeFromCart, incrementCartItem, decrementCartItem } = cartSlice.actions

export default cartSlice.reducer
