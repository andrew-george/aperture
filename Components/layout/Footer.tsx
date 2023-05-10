import { BsArrowUpCircleFill } from 'react-icons/bs'
import Logo from '../ui/Logo'

function Footer() {
	function scrollToTop() {
		window.scrollTo(0, 0)
	}

	return (
		<div className='h-[10vh] flex justify-between items-center'>
			<Logo />

			<p className='text-sm font-mono'>
				© Designed & Developed by <span className='font-semibold'>Andrew Berty</span>
			</p>

			<BsArrowUpCircleFill onClick={scrollToTop} className='text-2xl transition-all cursor-pointer hover:scale-110' />
		</div>
	)
}

export default Footer
