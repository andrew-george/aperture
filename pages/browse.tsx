import Head from 'next/head'
import { useEffect, useState } from 'react'
import { BsFilterRight } from 'react-icons/bs'
import PuffLoader from 'react-spinners/PuffLoader'
import SearchBar from '../Components/browse/SearchBar'
import ProductCard from '../Components/ui/ProductCard'
import Tag from '../Components/ui/Tag'
import { ProductModel } from '../models'
import { getPhotos, getUniqueTags } from '../utils'

function Browse({ photos, uniqueTags }: { photos: ProductModel[]; uniqueTags: string[] }) {
	const [activeTags, setActiveTags] = useState<string[]>([])
	const [filteredPhotos, setFilteredPhotos] = useState<ProductModel[]>([])
	const [isFiltering, setIsFiltering] = useState(false)

	function handleTogglingTags({ target: { innerHTML: clickedTag } }: any, tag: string) {
		activeTags.includes(clickedTag)
			? setActiveTags(prevTags => prevTags.filter(tag => tag !== clickedTag))
			: setActiveTags(prevTags => [...prevTags, clickedTag])
	}

	useEffect(() => {
		if (activeTags.length > 0) {
			setIsFiltering(true)
			setFilteredPhotos([])
			setTimeout(() => {
				setFilteredPhotos(photos.filter(photo => activeTags.every(activeTag => photo.tags.includes(activeTag))))
				setIsFiltering(false)
			}, 1)
		} else {
			setFilteredPhotos(photos)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeTags])

	return (
		<>
			<Head>
				<title>Browse</title>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='assets/aperture-favicon.svg' />
			</Head>

			<div className='w-4/5 m-auto relative'>
				<div className='flex justify-between items-start'>
					<div className='md:flex items-center w-3/4 h-full md:space-x-8 space-y-2 md:space-y-0'>
						<div className='flex whitespace-nowrap items-center space-x-2'>
							<BsFilterRight />
							<p>Filter By Tag</p>
						</div>
						<div className='flex flex-wrap'>
							{uniqueTags.map((tag, i) => (
								<div className='m-1 cursor-pointer' key={i} onClick={e => handleTogglingTags(e, tag)}>
									<Tag tag={tag} activeTags={activeTags} />
								</div>
							))}
						</div>
					</div>

					<SearchBar />
				</div>

				<div className='flex flex-wrap justify-evenly'>
					{filteredPhotos.map(photo => (
						<ProductCard key={photo.id} product={photo} />
					))}
				</div>

				{filteredPhotos.length === 0 && isFiltering && (
					<div className='flex justify-center items-center'>
						<PuffLoader color='#555' />
					</div>
				)}

				{/* //bug=> this text is not centered vertically, parent can't have certain width */}
				{filteredPhotos.length === 0 && !isFiltering && <div className='text-xl'>No Photos with these tags !</div>}
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
