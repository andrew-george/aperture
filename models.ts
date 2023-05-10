export interface ProductModel {
	id: string
	slug: string
	img: string
	quantity: number
	orientation: string
	tags: string[]
}

export interface CartItemModel {
	id: string
	img: string
	slug: string
	size: SizesModel
	finish: FinishesModel
	quantity: number
	unitPrice: number
}

export type SizesModel = '21x30cm' | '30x42cm' | '42x60cm' | '60x84cm'
export type FinishesModel = 'matte' | 'glossy'
