export default function LotteryItem() {
    return (        
        <div className="space-y-5">
            {["001","002","003"].map((lotteryID) => 
                <div key={lotteryID}>
                <div className="space-x-5 mb-3">                
                    <span className="text-2xl">Lottery {lotteryID}</span>
                    <span className="text-xl text-slate-400">
                        money trnasferred
                    </span>
                    <a className="underline text-xl text-pink-400
                        hover:text-pink-500"
                        href="">
                        stop
                    </a>
                </div>                
                <div className="flex-col pl-10">
                    {[{address:"0x1B75f6c15E34eEfE458FD713fD016C6d515436AA", style: ""},
                      {address:"0x2B75f6c15E34eEfE458FD713fD016C6d515436AB", style: "text-pink-400"},
                      {address:"0x3B75f6c15E34eEfE458FD713fD016C6d515436AC", style: ""}].map((player) => 
                        <div key={player.address} 
                            className={player.style}>
                            {player.address}
                            <span className={player.style? 'text-pink-400 pl-2' : 'invisible'}>winner!</span>
                        </div>
                    )}
                    <div className="text-2xl text-pink-400">
                        {0.7} eth
                    </div>                
                </div>
                </div>
            )}                        
        </div>
    )
}