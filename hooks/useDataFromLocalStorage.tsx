import { useEffect } from 'react'
import { setCartState } from '../store/cartSlice'
import { setLikedItemsState } from '../store/likedSlice'
import { useAppDispatch } from './hooks'

export default function useDataFromLocalStorage() {
	const dispatch = useAppDispatch()

	function getFromLS(key: string, handler: Function) {
		const jsonData = localStorage.getItem(key)
		if (jsonData) dispatch(handler(JSON.parse(jsonData)))
	}

	useEffect(() => {
		getFromLS('cart', setCartState)
		getFromLS('liked', setLikedItemsState)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
}
