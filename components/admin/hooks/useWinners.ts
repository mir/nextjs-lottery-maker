import { utils } from "ethers";
import { Functions, LotteryMakerContract } from "../../../contracts/LotteryMakerWrapper";
import useWallet from "./useWallet";

const useWinners = (lotteryIDs: Array<string>): {value: Array<string>, error: string | undefined} => {
    const contract = LotteryMakerContract();
    if (!contract) {
      return {value: [], error: "Can not get contract"};
    }
    
    const { account, provider } = useWallet();

    if (!account) {
        return {value: [], error: "Not logged in"};      
    }    

    const filter = {
      address: contract.address,
      topics: [
        utils.id(Functions.WinnerCalculatedEvent),
        null,
        null
      ],
      fromBlock: 0,
    };

    const lotteryWinners:Array<string> = [];    
    return { value: lotteryWinners, error: undefined }
}

export default useWinners;