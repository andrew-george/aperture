import Link from 'next/link'
import { BsCart, BsHeart } from 'react-icons/bs'
import { HiMenu } from 'react-icons/hi'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { openCartModal, openSideMenu } from '../../store/uiSlice'
import Logo from '../ui/Logo'
import NavLink from './NavLink'

function Header() {
	const { items } = useAppSelector(state => state.cart)
	const { cartIsShaking, heartIsShaking } = useAppSelector(state => state.ui)
	const likedItems = useAppSelector(state => state.liked.likedItems)

	const dispatch = useAppDispatch()

	return (
		<div className='flex justify-between items-center h-20 w-4/5 m-auto font-mono'>
			<div className='flex items-center space-x-2'>
				<HiMenu className='md:hidden cursor-pointer text-lg' onClick={() => dispatch(openSideMenu())} />
				<Logo />
			</div>

			{/* nav */}
			<div className='flex items-center justify-between space-x-4 md:space-x-20'>
				<div className='hidden md:block space-x-20 [&>*]:cursor-pointer'>
					<NavLink href='/browse'>Browse</NavLink>
					<NavLink href='/checkout'>Checkout</NavLink>
				</div>

				<Link href='/likes' className='cursor-pointer'>
					<div className='flex items-center text-lg'>
						<BsHeart className={heartIsShaking ? 'shake' : ''} />
						<span className='ml-2 text-base'>{likedItems.length}</span>
					</div>
				</Link>

				<div className='flex items-center text-lg cursor-pointer' onClick={() => dispatch(openCartModal())}>
					<BsCart className={cartIsShaking ? 'shake' : ''} />
					<span className='ml-2 text-base'>{items.length}</span>
				</div>
			</div>
		</div>
	)
}

export default Header
