import { NextPage } from "next"
import CreateLottery from "../components/admin/CreateLottery"
import LotteryItem from "../components/admin/LotteryItem"
import styles from '../styles/Home.module.css'

const Admin: NextPage = () => {
    return (
      <div className={styles.container}>
          <div className="flex flex-col p-20 gap-10">
            <CreateLottery minFee={0.001}/>
            <LotteryItem/>
          </div>                
      </div>
    )
  }
  
  export default Admin