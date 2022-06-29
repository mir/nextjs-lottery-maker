import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import LotteryEntrance from '../components/LotteryEntrance'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {

  const router = useRouter();
  router.push("admin");

  return (
    <></>
  )
}

export default Home
