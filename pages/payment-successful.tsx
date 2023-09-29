import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAppDispatch } from '../hooks/hooks'
import { clearCart } from '../store/cartSlice'

function PaymentSuccessful() {
	const [count, setCount] = useState(3)
	const router = useRouter()
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(clearCart())
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		if (count === 0) {
			router.replace('/')
		} else {
			const timer = setTimeout(() => {
				setCount(prevCount => prevCount - 1)
			}, 1000)

			return () => clearTimeout(timer)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [count])

	return (
		<div className='h-[80vh] w-4/5 m-auto flex flex-col justify-center items-center space-y-8'>
			<h2 className='text-5xl'>Payment Completed</h2>
			<p className='text-xl font-mono'>Redirecting to Home Page in {count} ...</p>
		</div>
	)
}

export default PaymentSuccessful
