import { NextPage } from "next"
import CreateLottery from "../components/admin/CreateLottery"
import LotteryItems from "../components/admin/LotteryItems"

const Admin: NextPage = () => {  
    return (      
        <div className="flex flex-col p-20 gap-10">                  
            <CreateLottery minFee={0.001}/>
            <LotteryItems />           
        </div>              
    )
  }
  
  export default Admin