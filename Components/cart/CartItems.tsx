import Image from 'next/image'
import Link from 'next/link'
import { BiTrash } from 'react-icons/bi'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { decrementCartItem, incrementCartItem, removeFromCart } from '../../store/cartSlice'
import { closeCartModal } from '../../store/uiSlice'
import { getTitleFromSlug } from '../../utils'
import Counter from '../ui/Counter'

function CartItems() {
	const cartItems = useAppSelector(state => state.cart.items)
	const dispatch = useAppDispatch()

	return (
		<div className='w-full h-full overflow-y-auto mx-0 my-8'>
			{cartItems.map(({ id, img, slug, quantity, finish, size, unitPrice }) => {
				const title = getTitleFromSlug(slug)

				return (
					<div
						key={id}
						className='flex items-center justify-around mx-0 my-8 bg-gradient-to-r from-black/30 backdrop-blur-xl rounded-lg p-4'>
						<div className='relative w-24 aspect-square'>
							<Link href={`/${slug}`} onClick={() => dispatch(closeCartModal())}>
								<Image src={img} alt={title} fill className='rounded object-cover' />
							</Link>
						</div>
						<div className='capitalize'>
							<h3 className='text-xl'>{title}</h3>
							<p className='text-sm italic text-gray-400'>
								{finish} , {size}
							</p>
						</div>
						<div className='flex'>
							<Counter
								size='sm'
								count={quantity}
								handleDecrement={() => dispatch(decrementCartItem(id))}
								handleIncrement={() => dispatch(incrementCartItem(id))}
							/>
							<span className='ml-3 text-lg'>x {unitPrice} $</span>
						</div>
						<div className='text-lg'>{unitPrice * quantity} $</div>
						<BiTrash className='cursor-pointer text-2xl text-red-500' onClick={() => dispatch(removeFromCart(id))} />
					</div>
				)
			})}
		</div>
	)
}

export default CartItems
