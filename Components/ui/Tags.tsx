import Tag from './Tag'

function Tags({ tags }: { tags: string[] }) {
	return (
		<div className='flex space-x-4'>
			{tags.map(tag => (
				<Tag key={tag} tag={tag} />
			))}
		</div>
	)
}

export default Tags
