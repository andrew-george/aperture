import { Roboto, Roboto_Mono } from 'next/font/google'
import { ReactNode } from 'react'
import { useAppSelector } from '../../hooks/hooks'
import useDataFromLocalStorage from '../../hooks/useDataFromLocalStorage'
import CartModal from '../cart/CartModal'
import Footer from './Footer'
import Header from './Header'

const roboto = Roboto({ subsets: ['latin'], weight: ['100', '400', '700'], variable: '--roboto' })
const robotoMono = Roboto_Mono({ subsets: ['latin'], weight: ['100', '400', '700'], variable: '--roboto-mono' })

function Layout({ children }: { children: ReactNode }) {
	const { isCartModalOpen } = useAppSelector(state => state.ui)

	useDataFromLocalStorage()

	return (
		<div
			className={`${robotoMono.variable} ${roboto.variable} bg-[url(/assets/bg-mesh-dark.svg)] font-sans min-h-screen transition-all duration-500 text-white bg-cover select-none`}>
			{/* className={`${firaCode.variable} ${firaSans.variable} bg-[url(/assets/bg-mesh-dark.svg)] font-sans min-h-screen transition-all duration-500 text-white bg-cover select-none`}> */}
			{isCartModalOpen && <CartModal />}
			<div className='w-4/5 m-auto'>
				<Header />
				<div className='min-h-[80vh]'>{children}</div>
				<Footer />
			</div>
		</div>
	)
}

export default Layout
