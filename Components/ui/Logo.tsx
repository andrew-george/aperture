import { Playfair_Display } from 'next/font/google'

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['700'] })

function Logo() {
	return <span className={`${playfair.className} text-[1.5rem]`}>aperture.</span>
}

export default Logo
