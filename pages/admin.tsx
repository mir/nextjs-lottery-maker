import { useEthers } from "@usedapp/core"
import { NextPage } from "next"
import ConnectWallet from "../components/admin/ConnectWallet"
import CreateLottery from "../components/admin/CreateLottery"
import LotteryItems from "../components/admin/LotteryItems"
import styles from '../styles/Home.module.css'

const Admin: NextPage = () => {

    const { activateBrowserWallet, account } = useEthers();
    
    return (
      <div className={styles.container}>
        <div className="flex flex-col p-20 gap-10">
        {account ?
          <>
            <CreateLottery minFee={0.001}/>
            <LotteryItems />
          </>
          :
          <ConnectWallet/>
        }  
        </div>        
      </div>
    )
  }
  
  export default Admin