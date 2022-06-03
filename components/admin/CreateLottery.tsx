export default function CreateLottery () {
    return (
        <div className="flex">
            <a href="#" 
                className="                                        
                shrink-0 text-3xl font-bold 
                bg-pink-400
                text-white
                rounded-full
                items-center justify-center
                px-3
                pt-0.5                
                transition-all ease-in-out duration-100
                hover:scale-105
                active:scale-100               
                ">
                +
            </a>
            <form>
                <input 
                type="number"
                className=" border-b-2 m-3 pl-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="0.001 Eth"/>                
            </form>
        </div>
    )
}