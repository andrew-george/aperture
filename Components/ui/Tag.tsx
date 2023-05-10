function Tag({ tag, activeTags }: { tag: string; activeTags?: string[] }) {
	const isActive = activeTags?.includes(tag)

	if (activeTags) {
		return (
			<span
				className={`px-2 py-1 backdrop-blur-md rounded capitalize ${
					isActive ? 'text-black bg-white' : 'bg-white/5 text-gray-400'
				}`}>
				{tag}
			</span>
		)
	}

	return <span className='px-2 py-1 backdrop-blur-md rounded capitalize text-white border border-gray-900'>{tag}</span>
}

export default Tag
