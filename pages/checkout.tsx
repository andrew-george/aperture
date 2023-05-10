import Head from 'next/head'
import CartItems from '../Components/cart/CartItems'
import Button from '../Components/ui/Button'
import { useAppSelector } from '../hooks/hooks'

function Checkout() {
	const cartItems = useAppSelector(state => state.cart.items)

	const cartIsEmpty = cartItems.length === 0

	const totalPrice = cartItems.reduce((acc, curr) => {
		const totalOfCurr = curr.unitPrice * curr.quantity
		acc = acc + totalOfCurr
		return acc
	}, 0)

	return (
		<>
			<Head>
				<title>Checkout</title>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='assets/aperture-favicon.svg' />
			</Head>

			<div className='flex h-[80vh] space-x-8'>
				{/* cart */}
				{cartIsEmpty ? (
					<div className='h-full w-full flex flex-col justify-center items-center space-y-8'>
						<p className='text-2xl font-medium'>Cart is Empty</p>
						<Button size='md' link='/browse'>
							Go Shopping
						</Button>
					</div>
				) : (
					<div className='w-2/3'>
						<h2 className='flex justify-center text-2xl'>Your Order</h2>
						<div className='h-3/4 overflow-auto'>
							<CartItems />
						</div>
						<div className='h-[1px] bg-gradient-to-r from-white/80 from-80% to-transparent my-8'></div>
						<div className='flex justify-between w-3/4 m-auto text-xl'>
							<h2>Total Price</h2>
							<p> {totalPrice} $</p>
						</div>
					</div>
				)}

				{/* payment form  */}
				{!cartIsEmpty && (
					<div className='w-1/3'>
						<h2 className='flex justify-center text-2xl'>Payment</h2>
					</div>
				)}
			</div>
		</>
	)
}

export default Checkout
