import Head from 'next/head'
import { useState } from 'react'
import { BsFilterRight } from 'react-icons/bs'
import ProductCard from '../Components/ui/ProductCard'
import Tag from '../Components/ui/Tag'
import { ProductModel } from '../models'
import { getPhotos, getUniqueTags } from '../utils'

function Browse({ photos, uniqueTags }: { photos: ProductModel[]; uniqueTags: string[] }) {
	const [activeTags, setActiveTags] = useState<string[]>([])

	function handleTogglingTags({ target: { innerHTML: clickedTag } }: any, tag: string) {
		activeTags.includes(clickedTag)
			? setActiveTags(prevTags => prevTags.filter(tag => tag !== clickedTag))
			: setActiveTags(prevTags => [...prevTags, clickedTag])
	}

	const filteredPhotos: ProductModel[] =
		activeTags.length >= 1
			? photos.filter(photo => activeTags.every(activeTag => photo.tags.includes(activeTag)))
			: photos

	return (
		<>
			<Head>
				<title>Browse</title>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='assets/aperture-favicon.svg' />
			</Head>

			<div className='min-h-[80vh]'>
				<div className='md:flex items-start mb-4'>
					<div className='flex whitespace-nowrap items-center mr-5 mb-4'>
						<BsFilterRight className='mr-4' /> Filter By Tag
					</div>
					<div className='flex flex-wrap'>
						{uniqueTags.map((tag, i) => (
							<div className='m-1 cursor-pointer' key={i} onClick={e => handleTogglingTags(e, tag)}>
								<Tag tag={tag} activeTags={activeTags} />
							</div>
						))}
					</div>
				</div>

				<div className='flex flex-wrap justify-evenly'>
					{filteredPhotos.map(photo => (
						<ProductCard key={photo.id} product={photo} />
					))}
				</div>

				{filteredPhotos.length === 0 && (
					<div className='flex justify-center items-center text-xl w-full h-[70vh]'>No Photos with these tags !</div>
				)}
			</div>
		</>
	)
}

export async function getServerSideProps({ params }: { params: { slug: string } }) {
	const photos = await getPhotos()
	const uniqueTags = await getUniqueTags()

	return {
		props: { photos, uniqueTags },
	}
}

export default Browse
