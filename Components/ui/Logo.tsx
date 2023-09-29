import Image from 'next/image'
import Link from 'next/link'

function Logo() {
	return (
		<Link href='/'>
			<div className='relative h-5 w-24'>
				<Image src='/assets/aperture.svg' fill alt='logo' className='object-contain' />
			</div>
		</Link>
	)
}

export default Logo
