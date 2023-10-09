import Head from 'next/head'
import MainPageLayout from '../components/mainPage/MainPageLayout'

export default function Home() {
  return (
    <>
      <Head>
        <title>aperture.</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="assets/aperture-favicon.svg" />
      </Head>
      <MainPageLayout />
    </>
  )
}
