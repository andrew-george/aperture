import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { ProductModel } from '../models'
import type { RootState } from './store'

interface LikedState {
	likedItems: ProductModel[]
}

const initialState: LikedState = {
	likedItems: [],
}

export const likedSlice = createSlice({
	name: 'liked',
	initialState,
	reducers: {
		toggleLike: (state, action: PayloadAction<ProductModel>) => {
			const found = state.likedItems.find(item => item.id === action.payload.id)

			if (found) {
				const filtered = state.likedItems.filter(item => item.id !== action.payload.id)
				state.likedItems = filtered
			} else {
				state.likedItems.push(action.payload)
			}

			localStorage.setItem('liked', JSON.stringify(state))
		},
		setLikedItemsState: (state, action: PayloadAction<LikedState>) => (state = action.payload),
	},
})

export const cart = (state: RootState) => state.cart

export const { toggleLike, setLikedItemsState } = likedSlice.actions

export default likedSlice.reducer
