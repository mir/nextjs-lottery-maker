import { Signer } from 'ethers';
import Image from 'next/image'
import { useContext } from 'react';
import metamask_img from '../../public/metamask.png'

interface WalletButtonProps {
    connectFunction(): void,
}


export default function ConnectWallet({connectFunction}: WalletButtonProps) {    
    
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
            onClick={connectFunction}>
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