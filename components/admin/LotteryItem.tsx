export default function LotteryItem() {
    return (        
        <div>
            <div className="space-x-5">                
                <span className="text-2xl">Lottery 001</span>
                <span className="text-xl text-slate-400">
                    money trnasferred
                </span>
                <a className="underline text-xl text-pink-400
                hover:text-pink-500"
                href="">
                    stop
                </a>
            </div>
            <div className="flex-col pl-10 pt-5">
                {["","text-pink-400 underline",""].map((number) => 
                    <div className={number}>0x6B75f6c15E34eEfE458FD713fD016C6d515436AC</div>
                )}
                <div className="pt-5 text-2xl text-pink-400">
                    {0.7} eth
                </div>                
            </div>
        </div>
    )
}