import { Variants, motion } from 'framer-motion'
import Head from 'next/head'
import ProductCard from '../components/ui/ProductCard'
import { useAppSelector } from '../hooks/hooks'

function likes() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const likedItems = useAppSelector(state => state.liked.likedItems)

  const cardsContainerVariant: Variants = {
    hidden: {},
    visible: { transition: { when: 'beforeChildren', staggerChildren: 0.2 } }
  }

  return (
    <>
      <Head>
        <title>Likes</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="assets/aperture-favicon.svg" />
      </Head>

      <motion.div
        variants={cardsContainerVariant}
        initial="hidden"
        animate="visible"
        className="flex min-h-[80vh] w-4/5 m-auto flex-wrap justify-evenly"
      >
        {likedItems.map(photo => (
          <ProductCard key={photo.id} product={photo} />
        ))}
        {likedItems.length === 0 && (
          <div className="flex justify-center items-center text-xl w-full h-[80vh]">No liked photos yet !</div>
        )}
      </motion.div>
    </>
  )
}

export default likes
