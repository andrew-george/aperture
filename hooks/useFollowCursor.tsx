import { useEffect, useRef } from 'react'

export default function useFollowCursor() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function updateCursorPosition(e: any) {
      if (!ref.current) return

      const { layerX, layerY } = e

      ref.current.style.setProperty('--x', `${layerX}px`)
      ref.current.style.setProperty('--y', `${layerY}px`)
    }

    window.addEventListener('mousemove', updateCursorPosition)

    return () => {
      window.removeEventListener('mousemove', updateCursorPosition)
    }
  }, [])

  return ref
}
