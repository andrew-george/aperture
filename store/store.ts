import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartSlice'
import likedReducer from './likedSlice'
import singlePageReducer from './singlePageSlice'
import uiReducer from './uiSlice'

export const store = configureStore({
	reducer: {
		cart: cartReducer,
		ui: uiReducer,
		singlePage: singlePageReducer,
		liked: likedReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
