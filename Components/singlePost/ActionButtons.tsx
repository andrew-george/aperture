import { nanoid } from 'nanoid'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { CartItemModel, ProductModel } from '../../models'
import { addToCart } from '../../store/cartSlice'
import { resetCounter } from '../../store/singlePageSlice'
import { setShakeCart } from '../../store/uiSlice'
import Button from '../ui/Button'

function ActionButtons({ product }: { product: ProductModel }) {
	const { price, selectedSize, selectedFinish, counter } = useAppSelector(state => state.singlePage)
	const { id, img, slug } = product

	const dispatch = useAppDispatch()

	function handleCartShake() {
		dispatch(setShakeCart(true))
		setTimeout(() => {
			dispatch(setShakeCart(false))
		}, 500)
	}

	function handleAddToCart() {
		const cartItem: CartItemModel = {
			id: nanoid(),
			img,
			slug,
			quantity: counter,
			finish: selectedFinish,
			size: selectedSize,
			unitPrice: price,
		}

		dispatch(addToCart(cartItem))
		dispatch(resetCounter())
		handleCartShake()
	}

	return (
		<div className='flex space-x-8 my-4'>
			<Button size='lg' onClick={handleAddToCart}>
				Add To Cart
			</Button>
			<Button size='lg' onClick={handleAddToCart} link='/checkout'>
				Buy Now
			</Button>
		</div>
	)
}

export default ActionButtons
