import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { FinishOptions, PricesOptions } from '../PhotosData'
import { FinishesModel, SizesModel } from '../models'
import type { RootState } from './store'

interface SinglePage {
	price: number
	selectedSize: SizesModel
	selectedFinish: FinishesModel
	counter: number
}

const initialState: SinglePage = {
	price: PricesOptions[0].price,
	selectedSize: PricesOptions[0].size,
	selectedFinish: FinishOptions[0],
	counter: 1,
}

export const singlePageSlice = createSlice({
	name: 'singlePage',
	initialState,
	reducers: {
		setSelectedFinish: (state, action: PayloadAction<FinishesModel>) => {
			state.selectedFinish = action.payload
		},
		setSelectedSize: (state, action: PayloadAction<SizesModel>) => {
			state.selectedSize = action.payload
		},
		setPrice: (state, action: PayloadAction<SizesModel>) => {
			const found = PricesOptions.find(item => item.size === action.payload)
			if (found) {
				state.price = found.price
			}
		},
		incrementCounter: state => {
			state.counter++
		},
		decrementCounter: state => {
			if (state.counter === 1) return
			state.counter--
		},
		resetCounter: state => {
			state.counter = 1
		},
	},
})

export const singlePage = (state: RootState) => state.singlePage

export const { setSelectedFinish, setSelectedSize, setPrice, incrementCounter, decrementCounter, resetCounter } =
	singlePageSlice.actions

export default singlePageSlice.reducer
