import { MdClose } from 'react-icons/md'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { closeCartModal } from '../../store/uiSlice'
import Button from '../ui/Button'
import CartItems from './CartItems'

function CartModal() {
	const { items } = useAppSelector(state => state.cart)
	const dispatch = useAppDispatch()

	function closeModal() {
		dispatch(closeCartModal())
	}

	const cartIsEmpty = items.length === 0

	return (
		<>
			<div className='fixed flex items-center justify-center z-10 h-screen w-screen bg-black/70' onClick={closeModal}>
				<div
					className='flex h-4/5 w-[clamp(70%,700px,90%)] z-20 backdrop-blur-3xl bg-gray-600/5 text-white p-10 rounded-2xl'
					onClick={e => e.stopPropagation()}>
					<div className='flex flex-col items-center w-full'>
						<h2 className='text-xl'>Cart</h2>
						<MdClose className='cursor-pointer text-xl absolute top-[6%] right-[3%]' onClick={closeModal} />
						{cartIsEmpty ? (
							<>
								<div className='h-full flex justify-center items-center text-xl font-medium'>Cart is Empty</div>
								<Button size='md' link='/browse' onClick={closeModal}>
									Go Shopping
								</Button>
							</>
						) : (
							<>
								<CartItems />
								<Button size='md' link='/checkout' onClick={closeModal}>
									Checkout
								</Button>
							</>
						)}
					</div>
				</div>
			</div>
		</>
	)
}

export default CartModal
