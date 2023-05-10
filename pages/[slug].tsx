import Head from 'next/head'
import SinglePhotoLayout from '../Components/singlePost/SinglePhotoLayout'
import { ProductModel } from '../models'
import { getPhotos, getTitleFromSlug } from '../utils'

function SinglePhoto({ photo }: { photo: ProductModel }) {
	const title = getTitleFromSlug(photo.slug)

	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='assets/aperture-favicon.svg' />
			</Head>
			<SinglePhotoLayout product={photo} />
		</>
	)
}

export async function getServerSideProps({ params }: { params: { slug: string } }) {
	const data = await getPhotos()
	const photo = data.find(item => item.slug === params.slug)

	if (!photo) {
		return {
			notFound: true,
		}
	}

	return {
		props: { photo },
	}
}
export default SinglePhoto
