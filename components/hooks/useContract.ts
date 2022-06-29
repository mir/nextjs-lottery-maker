import { Contract } from "ethers";
import { useState } from "react";
import { LotteryMakerContract } from "../../contracts/LotteryMakerWrapper";

const useContract = () => {
    const [contract, setContract] = useState<Contract>(LotteryMakerContract());    
    return contract;
}

export default useContract;