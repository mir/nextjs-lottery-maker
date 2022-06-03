import lotteryMakerABIjson from "./LotteryMakerABI.json"
import { useWeb3Contract } from "react-moralis"

const entranceFee = 1e15; //0.001 eth
const lotteryID = 1;

export async function enterLottery(
        onError?: (error: any) => void,
        onSuccess?: (results: any) => void,
    ) {

    console.log(`ABI: ${lotteryMakerABIjson}`);

    const {runContractFunction: enterLottery} = useWeb3Contract({
        abi: lotteryMakerABIjson,
        contractAddress: process.env.lotteryMakerAddress,
        functionName: "enterLottery",
        msgValue: entranceFee,
        params: { lotteryID: lotteryID }
    });

    
    await enterLottery({
        onError: onError,
        onSuccess: onSuccess
    });
}