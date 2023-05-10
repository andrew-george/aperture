import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai'

interface Props {
	size: 'sm' | 'lg'
	count: number
	handleIncrement: Function
	handleDecrement: Function
}

function Counter({ size, count, handleIncrement, handleDecrement }: Props) {
	const classes = `${
		size === 'lg' ? 'space-x-8 [&>*]:text-3xl' : 'flex items-center space-x-4 [&>*]:text-xl'
	} flex items-center `

	return (
		<div className={classes}>
			<AiOutlineMinusCircle className='cursor-pointer' onClick={() => handleDecrement()} />
			<span>{count}</span>
			<AiOutlinePlusCircle className='cursor-pointer' onClick={() => handleIncrement()} />
		</div>
	)
}

export default Counter
