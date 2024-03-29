import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import useFollowCursor from '../../hooks/useFollowCursor'
import { ProductModel } from '../../models'
import { getTitleFromSlug } from '../../utils'
import Like from './Like'
import Tags from './Tags'

function ProductCard({ product }: { product: ProductModel }) {
  const ref = useFollowCursor()

  const { img, slug, tags } = product

  const title = getTitleFromSlug(slug)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      ref={ref}
      className="flex flex-col m-4 items-center w-96 h-80 bg-gray-500/5 border border-gray-900 rounded-md overflow-clip backdrop-blur-sm hover:hover-gradient">
      <div className="relative w-full h-2/3">
        <Link href={`/${slug}`}>
          <Image src={img} alt={title} fill className="object-cover" />
        </Link>
      </div>

      <div className="flex flex-col h-1/3 justify-center w-3/4">
        <div className="flex items-center justify-between w-full">
          <h2 className="text-xl capitalize my-3">{title}</h2>
          <Like product={product} />
        </div>
        <Tags tags={tags} />
      </div>
    </motion.div>
  )
}

export default ProductCard
