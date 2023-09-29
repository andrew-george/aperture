import Image from 'next/image'
import { FinishOptions, PricesOptions } from '../../PhotosData'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { ProductModel } from '../../models'
import { decrementCounter, incrementCounter } from '../../store/singlePageSlice'
import { getTitleFromSlug } from '../../utils'
import Counter from '../ui/Counter'
import Like from '../ui/Like'
import Tags from '../ui/Tags'
import ActionButtons from './ActionButtons'
import Options from './Options'

function SinglePhotoLayout({ product }: { product: ProductModel }) {
	const { price, counter } = useAppSelector(state => state.singlePage)
	const dispatch = useAppDispatch()

	const title = getTitleFromSlug(product.slug)

	return (
		<div className='flex flex-col lg:flex-row justify-center items-center w-4/5 m-auto border'>
			<div className='relative w-full aspect-square'>
				<Image src={product.img} alt={title} fill className='object-contain' priority />
			</div>

			<div className='flex flex-col justify-between lg:py-0 lg:px-20 md:w-1/2'>
				<div className='flex items-center justify-between'>
					<h1 className='text-4xl capitalize'>{title}</h1>
					<Like product={product} />
				</div>

				<h2 className='my-4 mx-0 text-3xl'>{price} USD</h2>

				<Options type='size' optionsArr={PricesOptions} />

				<Options type='finish' optionsArr={FinishOptions} />

				<div className='flex md:justify-normal justify-center my-20 lg:my-4'>
					<Counter
						size='lg'
						count={counter}
						handleDecrement={() => dispatch(decrementCounter())}
						handleIncrement={() => dispatch(incrementCounter())}
					/>
				</div>

				<ActionButtons product={product} />

				<div className='flex justify-center md:justify-normal  mt-8'>
					<Tags tags={product.tags} />
				</div>
			</div>
		</div>
	)
}

export default SinglePhotoLayout
