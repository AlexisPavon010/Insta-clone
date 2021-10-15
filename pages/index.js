import Head from 'next/head'
import Image from 'next/image'
import Feed from '../components/Feed'
import Header from '../components/Header'
import Modal from '../components/Modal'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className='border-gray-50 bg-gray-50 h-screen overflow-y-scroll scrollbar-hide'>
      <Head>
        <title>Instagram Clone</title>
        <meta name="description" content="Instagram clone whit AlexisPavon010" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <Header />
    <Feed />
      <Modal />
    </div>
  )
}
