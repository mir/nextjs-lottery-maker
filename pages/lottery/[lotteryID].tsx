import { NextPage } from "next"
import router from "next/router"
import { useState } from "react"
import useLotteryIDs from "../../components/hooks/useLotterIDs"
import useLotteryState from "../../components/hooks/useLotteryState"
import useWallet from "../../components/hooks/useWallet"

const Lottery: NextPage = () => {  

    const { lotteryID } = router.query
    const lotteryIDs = useLotteryIDs();
    const {enterLotteryClicked, getPlayers } = useLotteryState();
    const {address} = useWallet();
    const [playerState, setPlayerState] = useState<string>("nobody");
    
    if(lotteryID && (typeof lotteryID === "string") 
        && lotteryIDs.includes(lotteryID)) {
            getPlayers(lotteryID).then((players) => {
                if (players.includes(address)) {
                    setPlayerState("player");
                }
            });
        }    

    if (lotteryID && (typeof lotteryID === "string") 
        && lotteryIDs.includes(lotteryID)) {
        return (      
            <div className="bg-pink-400 
                            w-120 h-60
                            rounded-full
                            mx-auto text-center
                            transition-all ease-in-out duration-100                
                            hover:scale-105                        
                            active:scale-100
                            pt-14">                
                <a 
                    className="text-8xl text-white"
                    onClick={(e) => {enterLotteryClicked(lotteryID)}}
                    href="#"
                    >
                        { playerState === "player" ? "Enter again!" : "Enter to win!"}</a>
            </div>
        )
    } else {
        return (
            <div className="bg-pink-400 
                            w-120 h-60
                            rounded-full
                            mx-auto text-center
                            transition-all ease-in-out duration-100                
                            hover:scale-105                        
                            active:scale-100
                            pt-14">
                <span className="text-8xl text-white">Searching for lottery...</span>
            </div>
        )
    }    
  }
  
  export default Lottery