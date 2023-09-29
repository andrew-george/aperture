import { AnimatePresence, motion } from 'framer-motion'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { Provider } from 'react-redux'
import Layout from '../Components/layout/Layout'
import { store } from '../store/store'
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
	const router = useRouter()

	return (
		<Provider store={store}>
			<Layout>
				<AnimatePresence mode='wait'>
					<motion.div
						key={router.route}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.25 }}>
						<Component {...pageProps} />
					</motion.div>
				</AnimatePresence>
			</Layout>
		</Provider>
	)
}
