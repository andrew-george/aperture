import { useAppSelector } from '../../hooks/hooks'

function Option({ item, handler }: any) {
	const { selectedFinish, selectedSize } = useAppSelector(state => state.singlePage)

	return (
		<button
			className={`${
				selectedSize === item || selectedFinish === item ? 'bg-white text-black' : 'bg-white/10'
			} capitalize px-4 py-2 rounded cursor-pointer transition-all hover:translate-y-[2px]`}
			onClick={handler}>
			{item}
		</button>
	)
}

export default Option
