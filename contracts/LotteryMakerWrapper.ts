import { Contract, utils } from "ethers"
import lotteryMakerABIjson from "./LotteryMakerABI.json"

export enum Functions {
    CreateLottery = "createLottery",
}

export function LotteryMakerContract() {
    const lotteryInterface = new utils.Interface(lotteryMakerABIjson)
    if (!lotteryInterface) {
        throw "ABI is not properly read";
    }
    const lotteryMakerAddress = process.env.lotteryMakerAddress
    if (!lotteryMakerAddress) {
        throw "Lootery maker address is undefined!"
    }
    return new Contract(lotteryMakerAddress, lotteryInterface);  
}