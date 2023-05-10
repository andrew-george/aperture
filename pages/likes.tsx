import Head from 'next/head'
import ProductCard from '../Components/ui/ProductCard'
import { useAppSelector } from '../hooks/hooks'

function likes() {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const likedItems = useAppSelector(state => state.liked.likedItems)

	return (
		<>
			<Head>
				<title>Likes</title>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='assets/aperture-favicon.svg' />
			</Head>

			<div className='flex min-h-[80vh] w-full flex-wrap justify-evenly'>
				{likedItems.map(photo => (
					<ProductCard key={photo.id} product={photo} />
				))}
				{likedItems.length === 0 && (
					<div className='flex justify-center items-center text-xl w-full h-[80vh]'>No liked photos yet !</div>
				)}
			</div>
		</>
	)
}

export default likes
