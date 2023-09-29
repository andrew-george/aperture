import { useEffect, useState } from 'react'

export const useDebounce = (value: string, time: number) => {
	const [debouncedValue, setDebouncedValue] = useState(value)

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedValue(value)
		}, time)

		return () => {
			clearTimeout(timer)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value])

	return debouncedValue
}
