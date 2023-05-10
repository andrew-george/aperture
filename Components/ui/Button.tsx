import Link from 'next/link'
import { ReactNode } from 'react'

interface Props {
	size: 'sm' | 'md' | 'lg'
	onClick?: Function
	children: ReactNode
	link?: string
}

function Button({ size, onClick, children, link }: Props) {
	const padding = `${size === 'sm' ? 'px-2 py-1' : size === 'md' ? 'px-4 py-2' : 'px-8 py-4'}`

	const classes = `text-base w-fit border-none bg-white text-black cursor-pointer rounded ${padding}`

	const attributes = {
		className: classes,
		...(onClick && { onClick: () => onClick() }),
	}

	if (link) {
		return (
			<Link href={link}>
				<button {...attributes}>{children}</button>
			</Link>
		)
	}

	return <button {...attributes}>{children}</button>
}

export default Button
