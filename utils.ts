import axios from 'axios'
import { nanoid } from 'nanoid'
import { CartItemModel, ProductModel } from './models'

// helpers
export function getTitleFromSlug(slug: string) {
  return slug.split('-').join(' ')
}

export function calculateTotalPrice(items: CartItemModel[]) {
  const totalPrice = items.reduce((acc, curr) => {
    const totalOfCurr = curr.unitPrice * curr.quantity
    acc = acc + totalOfCurr
    return acc
  }, 0)
  return totalPrice
}

// Photos
const photosBaseUrl = 'https://aperture-97659-default-rtdb.firebaseio.com/photos.json'

export async function getPhotos() {
  const { data } = await axios(photosBaseUrl)
  return Object.values(data) as ProductModel[]
}

export async function postPhoto(product: ProductModel) {
  await axios.post(photosBaseUrl, { ...product, id: nanoid() })
}

async function getPhotoById(id: string) {
  const photos = await getPhotos()
  return photos.find(photo => photo.id === id)
}

export async function fetchSearchResults(searchTerm: string) {
  const photos = await getPhotos()
  return photos.filter(({ slug }) => getTitleFromSlug(slug).toLowerCase().includes(searchTerm))
}

export async function getUniqueTags() {
  const photos = await getPhotos()
  const allTags: string[] = []

  photos.forEach(photo => {
    photo.tags.forEach(tag => allTags.push(tag))
  })

  return Array.from(new Set(allTags))
}
