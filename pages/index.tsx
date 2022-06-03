import type { NextPage } from 'next'
import CreateLottery from '../components/admin/CreateLottery'
import Header from '../components/Header'
import LotteryEntrance from '../components/LotteryEntrance'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Header/>
      <CreateLottery/>      
      <LotteryEntrance/>
    </div>
  )
}

export default Home
