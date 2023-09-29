import { useRouter } from 'next/router'
import { useState } from 'react'
import { ProductModel } from '../models'

function useAccessibleResultsMenu(list: ProductModel[], inputRef: any) {
	const [activeResultIndex, setActiveResultIndex] = useState(-1)

	const router = useRouter()

	function handleKeyDown(event: any) {
		const { key } = event

		if (key === 'ArrowUp') {
			if (activeResultIndex === 0) {
				setActiveResultIndex(list.length - 1)
			} else {
				setActiveResultIndex(prevIndex => prevIndex - 1)
			}
		}

		if (key === 'ArrowDown') {
			if (activeResultIndex === list.length - 1) {
				setActiveResultIndex(0)
			} else {
				setActiveResultIndex(prevIndex => prevIndex + 1)
			}
		}

		if (key === 'Enter') {
			if (activeResultIndex === -1) return
			if (activeResultIndex >= 0) {
				event.preventDefault()
				const target = `/${list[activeResultIndex].slug}`
				router.push(target)
			}
		}
		if (key === 'Escape') {
			inputRef.current?.blur()
		}
	}

	return { activeResultIndex, setActiveResultIndex, handleKeyDown }
}

export default useAccessibleResultsMenu
