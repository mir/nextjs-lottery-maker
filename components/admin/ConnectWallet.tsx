import { useEthers } from "@usedapp/core"
import Image from 'next/image'
import metamask_img from '../../public/metamask.png'

export default function ConnectWallet() {

    const { activateBrowserWallet, account } = useEthers()
    
    return (
    <div>        
        <button 
            className="bg-pink-400
            rounded-xl
            p-5
            scale-100
            hover:scale-105
            active:scale-100
            transition-all ease-in-out duration-100
            "
            onClick={() => activateBrowserWallet()}>
                <span className="text-2xl text-white mx-2">
                Connect Metamask
                </span> 
            <Image                                 
                src={metamask_img}
                alt="metamask icon"
                width={25}
                height={25}/>
                           
        </button>
    </div>
    )
}