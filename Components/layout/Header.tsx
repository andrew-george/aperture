import Link from 'next/link'
import { BsCart, BsHeart } from 'react-icons/bs'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { openCartModal } from '../../store/uiSlice'
import Logo from '../ui/Logo'

function Header() {
	const { items } = useAppSelector(state => state.cart)
	const { cartIsShaking, heartIsShaking } = useAppSelector(state => state.ui)
	const likedItems = useAppSelector(state => state.liked.likedItems)

	const dispatch = useAppDispatch()

	return (
		<div className='flex justify-between items-center h-[10vh] font-mono'>
			<Link href='/'>
				<Logo />
			</Link>

			{/* nav */}
			<div className='flex items-center justify-between space-x-20 [&>*]:cursor-pointer'>
				<Link href='/browse' className='text-base'>
					Browse
				</Link>

				<Link href='/checkout' className='text-base'>
					Checkout
				</Link>

				<Link href='/likes'>
					<div className='flex items-center text-lg'>
						<BsHeart className={heartIsShaking ? 'shake' : ''} />
						<span className='ml-2 text-base'>{likedItems.length}</span>
					</div>
				</Link>

				<div className='flex items-center text-lg' onClick={() => dispatch(openCartModal())}>
					<BsCart className={cartIsShaking ? 'shake' : ''} />
					<span className='ml-2 text-base'>{items.length}</span>
				</div>
			</div>
		</div>
	)
}

export default Header
