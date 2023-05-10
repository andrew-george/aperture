import { useAppDispatch } from '../../hooks/hooks'
import { FinishesModel, SizesModel } from '../../models'
import { setPrice, setSelectedFinish, setSelectedSize } from '../../store/singlePageSlice'
import Option from '../ui/Option'

function Options({ type, optionsArr }: { type: 'size' | 'finish'; optionsArr: any[] }) {
	const dispatch = useAppDispatch()

	function handleSizeSelection(size: SizesModel) {
		dispatch(setSelectedSize(size))
		dispatch(setPrice(size))
	}

	function handleFinishSelection(finish: FinishesModel) {
		dispatch(setSelectedFinish(finish))
	}

	return (
		<div className='mx-0 my-4'>
			<p className='text-xl mx-0 my-4 capitalize'>{type}</p>
			<div className='flex space-x-4'>
				{type === 'size' &&
					optionsArr.map(item => (
						<Option key={item.size} item={item.size} type={type} handler={() => handleSizeSelection(item.size)} />
					))}
				{type === 'finish' &&
					optionsArr.map(item => (
						<Option key={item} item={item} type={type} handler={() => handleFinishSelection(item)} />
					))}
			</div>
		</div>
	)
}

export default Options
