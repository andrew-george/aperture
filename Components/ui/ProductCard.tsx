import Image from 'next/image'
import Link from 'next/link'
import useFollowCursor from '../../hooks/useFollowCursor'
import { ProductModel } from '../../models'
import { getTitleFromSlug } from '../../utils'
import Like from '../ui/Like'
import Tags from '../ui/Tags'

function ProductCard({ product }: { product: ProductModel }) {
	const ref = useFollowCursor()

	const { img, slug, tags } = product

	const title = getTitleFromSlug(slug)

	return (
		<div
			ref={ref}
			className='flex flex-col m-4 items-center w-96 h-80 bg-gray-500/5 border border-gray-900 rounded-md overflow-clip backdrop-blur-sm duration-200 hover:-translate-y-1 hover:hover-gradient'>
			<div className='relative w-full h-2/3'>
				<Link href={`/${slug}`}>
					<Image src={img} alt={title} fill className='object-cover' />
				</Link>
			</div>

			<div className='flex flex-col h-1/3 justify-center w-3/4'>
				<div className='flex items-center justify-between w-full'>
					<h2 className='text-xl capitalize my-3'>{title}</h2>
					<Like product={product} />
				</div>
				<Tags tags={tags} />
			</div>
		</div>
	)
}

export default ProductCard
