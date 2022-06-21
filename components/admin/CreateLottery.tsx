import { BigNumber, Signer, utils } from "ethers";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Functions, LotteryMakerContract } from "../../contracts/LotteryMakerWrapper";
import AccountContext from "../../pages/AccountContext";

interface CreateLotteryProps {
    minFee: number
}

export default function CreateLottery ({minFee}:CreateLotteryProps) {
    
    const {account, provider} = useContext(AccountContext);    

    const [entranceFee, setEntranceFee] = useState<number>(0);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newEntranceFee = 
            event.target.value === "" ? 
                minFee : 
                Number(event.target.value)
        setEntranceFee(newEntranceFee)
    }    

    const createLottery = () => {
        if (!entranceFee ||
            entranceFee < minFee) {
                console.log("Entrance fee is too low");
                setEntranceFee(minFee);                
            }            
        if (!account) {
            console.log("Waiting to login");            
        } else {
            console.log("Logged-in. Creating a lottery");            
            const feeInWei = utils.parseUnits("" + entranceFee, "ether");
            console.log(`Fee in wei: ${feeInWei}`);
            const contract = LotteryMakerContract();
            contract.connect(account).createLottery(entranceFee, {value: feeInWei});            
        }        
    }    

    return (
        <div className="flex gap-2">
            <a href="#"
                onClick={createLottery} 
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
                onChange={handleInputChange}
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