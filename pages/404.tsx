import Image from 'next/image'
import Button from '../Components/ui/Button'

function ErrorPage() {
	return (
		<div>
			<Image src='/assets/404bg.jpg' alt='bg' fill className='object-cover brightness-75' />
			<div className={` relative flex flex-col items-center justify-center w-full h-[80vh]`}>
				<h2 className='text-[8rem] font-bold'>404</h2>
				<p className='text-3xl font-sans'>Don&apos;t panic, watch your oxygen levels !</p>
				<div className='my-12 font-mono'>
					<Button size='md' link='/'>
						Back To Safety
					</Button>
				</div>
			</div>
		</div>
	)
}

export default ErrorPage
