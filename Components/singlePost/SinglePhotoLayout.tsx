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
		<div className='flex items-center w-full h-[80vh]'>
			<div className='relative h-4/5 w-full'>
				<Image src={product.img} alt={title} fill className='object-contain' priority />
			</div>

			<div className='flex flex-col justify-between py-0 px-20'>
				<div className='flex items-center justify-between'>
					<h1 className='text-4xl capitalize'>{title}</h1>
					<Like product={product} />
				</div>

				<h2 className='my-4 mx-0 text-3xl'>{price} $</h2>

				<Options type='size' optionsArr={PricesOptions} />

				<Options type='finish' optionsArr={FinishOptions} />

				<div className='my-4'>
					<Counter
						size='lg'
						count={counter}
						handleDecrement={() => dispatch(decrementCounter())}
						handleIncrement={() => dispatch(incrementCounter())}
					/>
				</div>

				<ActionButtons product={product} />

				<div className='mt-8'>
					<Tags tags={product.tags} />
				</div>
			</div>
		</div>
	)
}

export default SinglePhotoLayout
