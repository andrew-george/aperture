import { useEffect, useRef } from 'react'

export default function useFollowCursor() {
	const ref = useRef<HTMLDivElement>(null)

	useEffect(() => {
		function updateCursorPosition(e: MouseEvent) {
			if (!ref.current) return

			const { x, y } = e

			ref.current.style.setProperty('--x', `${x}px`)
			ref.current.style.setProperty('--y', `${y}px`)
		}

		window.addEventListener('mousemove', updateCursorPosition)

		return () => {
			window.removeEventListener('mousemove', updateCursorPosition)
		}
	}, [])

	return ref
}
