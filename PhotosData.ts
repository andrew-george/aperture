import { FinishesModel, SizesModel } from './models'

export const PricesOptions: { size: SizesModel; price: number }[] = [
	{ size: '21x30cm', price: 25 },
	{ size: '30x42cm', price: 50 },
	{ size: '42x60cm', price: 75 },
	{ size: '60x84cm', price: 100 },
]

export const FinishOptions: FinishesModel[] = ['glossy', 'matte']
