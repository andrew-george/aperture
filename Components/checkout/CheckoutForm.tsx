import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { CartItemModel } from '../../models'
import { calculateTotalPrice } from '../../utils'
import Button from '../ui/Button'

function CheckoutForm({ cartItems }: { cartItems: CartItemModel[] }) {
	const stripe = useStripe()
	const elements = useElements()
	const router = useRouter()

	const [amount, setAmount] = useState(0)

	const [email, setEmail] = useState('')
	const [message, setMessage] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	// useEffect(() => {
	// 	if (!stripe) return

	// 	const clientSecret = new URLSearchParams(window.location.search).get('payment_intent_client_secret')

	// 	if (!clientSecret) return

	// 	stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
	// 		switch (paymentIntent?.status) {
	// 			case 'succeeded':
	// 				setMessage('Payment succeeded!')
	// 				break
	// 			case 'processing':
	// 				setMessage('Your payment is processing.')
	// 				break
	// 			case 'requires_payment_method':
	// 				setMessage('Your payment was not successful, please try again.')
	// 				break
	// 			default:
	// 				setMessage('Something went wrong.')
	// 				break
	// 		}
	// 	})
	// }, [stripe])

	async function handleSubmit(e: any) {
		e.preventDefault()

		if (!stripe || !elements) return

		setIsLoading(true)

		const { error } = await stripe.confirmPayment({
			elements,
			redirect: 'if_required',
		})

		if (error?.type === 'card_error' || error?.type === 'validation_error') {
			setMessage(error?.message as string)
		} else {
			setMessage('An unexpected error occurred.')
		}

		setIsLoading(false)
		router.push('/payment-successful')
	}

	const totalPrice = calculateTotalPrice(cartItems)

	return (
		<div className='lg:w-1/3 lg:flex lg:flex-col lg:items-center lg:justify-center lg:space-y-14'>
			<div className='flex items-center space-x-2'>
				<div className='text-5xl font-medium'>{totalPrice}</div>
				<div className='text-2xl font-medium'>USD</div>
			</div>
			<form onSubmit={handleSubmit} className='flex flex-col justify-center items-center space-y-10'>
				<PaymentElement id='payment-element' />
				<Button size='md' className='font-medium' type='submit'>
					Pay Now
				</Button>
			</form>
		</div>
	)
}

export default CheckoutForm
