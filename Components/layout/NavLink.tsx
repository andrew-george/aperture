import Link from 'next/link'
import React from 'react'

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
	return (
		<Link href={href} className='text-base'>
			{children}
		</Link>
	)
}

export default NavLink
