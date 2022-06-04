export default function LotteryItem() {
    return (        
        <div className="space-y-5">
            {["001","002","003"].map((lotteryID) => 
                <div>
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
                    {["","text-pink-400",""].map((number) => 
                        <div className={number}>
                            0x6B75f6c15E34eEfE458FD713fD016C6d515436AC
                            <span className={number? 'text-pink-400 pl-2' : 'invisible'}>winner!</span>
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