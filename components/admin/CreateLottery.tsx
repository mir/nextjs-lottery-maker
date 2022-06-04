export default function CreateLottery () {
    const minFee = 0.001;
    return (
        <div className="flex gap-2">
            <a href="#" 
                className="flex-none                
                w-9 h-9
                bg-pink-400                
                rounded-full              
                transition-all ease-in-out duration-100                
                hover:scale-105
                active:scale-100
                relative                                                          
                " >
                <div className="bg-white rounded-full w-7 h-1 mt-4 ml-1 absolute"></div>
                <div className="bg-white rounded-full w-1 h-7 ml-4 mt-1 absolute"></div>
            </a>             
            <form>                
                <span className="text-2xl">Lottery</span>
                <input 
                type="number"
                min={minFee}
                step={minFee}
                max="1"
                className="w-20 border-b-2 m-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                id="username"
                placeholder={`${minFee}`}/>
                <label htmlFor="username">Eth</label>
            </form>
        </div>
    )
}