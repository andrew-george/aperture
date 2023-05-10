import { BsHeart, BsHeartFill } from 'react-icons/bs'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { ProductModel } from '../../models'
import { toggleLike } from '../../store/likedSlice'
import { setShakeHeart } from '../../store/uiSlice'

function Like({ product }: { product: ProductModel }) {
	const likedItems = useAppSelector(state => state.liked.likedItems)
	const dispatch = useAppDispatch()

	const isLiked = likedItems.find(item => item.id === product.id)

	function handleHeartShake() {
		dispatch(setShakeHeart(true))
		setTimeout(() => {
			dispatch(setShakeHeart(false))
		}, 500)
	}

	function handleAddToLikes() {
		dispatch(toggleLike(product))
		handleHeartShake()
	}

	return (
		<div onClick={handleAddToLikes}>
			{isLiked && <BsHeartFill className='text-2xl text-red-500 cursor-pointer' />}
			{!isLiked && <BsHeart className='text-2xl cursor-pointer' />}
		</div>
	)
}

export default Like
