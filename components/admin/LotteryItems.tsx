export interface LotteryItem {
    lotteryID: number,
    state: string,
    next_state: string,
    players: Array<string>,
    winner: string | undefined,
    bank: number
}

export default function LotteryItems() {    

    const lotteries: Array<LotteryItem> = [{
        lotteryID: 1,
        state: "opened",
        next_state: "stop",
        players: ["0x1B75f6c15E34eEfE458FD713fD016C6d515436AA","0x1B75f6c15E34eEfE458FD713fD016C6d515436AB"],
        winner: "",
        bank: 0.7,
      },
      {
          lotteryID: 2,
          state: "money trnasferred",
          next_state: "",
          players: ["0x1B75f6c15E34eEfE458FD713fD016C6d515436AA","0x1B75f6c15E34eEfE458FD713fD016C6d515436AB"],
          winner: "0x1B75f6c15E34eEfE458FD713fD016C6d515436AC",
          bank: 0.8,
      }];

    return (        
        <div className="space-y-5">
            {lotteries.map((lottery) => 
                <div key={lottery.lotteryID}>
                <div className="space-x-5 mb-3">                
                    <span className="text-2xl">Lottery {lottery.lotteryID}</span>
                    <span className="text-xl text-slate-400">
                        {lottery.state}
                    </span>
                    <a className="underline text-xl text-pink-400
                        hover:text-pink-500"
                        href="">
                        {lottery.next_state}
                    </a>
                </div>                
                <div className="flex-col pl-10">
                    {lottery.players.map((address) => 
                        <div key={address}>                            
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