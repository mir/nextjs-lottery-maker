import Link from "next/link";
import useLotteryItems from "../hooks/useLotteryItems";
import useLotteryState from "../hooks/useLotteryState";

export default function LotteryItems() {    

    const lotteries = useLotteryItems();
    const {nextStateClicked} = useLotteryState();

    return (        
        <div className="space-y-5">
            {lotteries.map((lottery) => 
                <div key={lottery.lotteryID}>
                <div className="space-x-5 mb-3">                    
                    <a className="text-2xl">Lottery {lottery.lotteryID}</a>                                                            
                    {lottery.state === "Calculating" ?
                        (<span className="text-xl text-slate-400">
                            {lottery.next_state}
                        </span>):
                        (<>
                            {lottery.state === "Opened" ?
                            (<Link href={`/lottery/${lottery.lotteryID}`}>
                                <a className="pl-5 text-xl text-pink-400 hover:text-pink-500 underline">Enter page</a>                    
                            </Link>):
                            (<span className="text-xl text-slate-400">
                            {lottery.state}
                            </span>)}                            
                            <a className="underline text-xl text-pink-400
                            hover:text-pink-500"
                            href="#"                                                
                            onClick={(e) => {nextStateClicked(lottery.lotteryID,lottery.state)}}>
                            {lottery.next_state}
                            </a>
                        </>)    
                    }
                </div>                                
                <div className="flex-col pl-10">                    
                    {lottery.players.map((address, index) => 
                        <div key={address + ":" + index + ":" + "lotteryID"}>                            
                            {address}
                        </div>
                    )}                    
                    <div className={` ${lottery.winner ? "text-pink-400" : "hidden"}`}>
                        {lottery.winner} WINNER!
                    </div>
                    <div className="text-2xl text-pink-400">
                        {lottery.bank} eth                        
                    </div>
                                    
                </div>
                </div>
            )}                        
        </div>
    )
}