import { MouseEventHandler } from "react";
import { goNextState } from "../../../contracts/LotteryMakerWrapper";
import useWallet from "./useWallet";

const useLotteryState = () => {
    const { account } = useWallet();

    const nextStateClicked = (lotteryID: string, currentState: string) => {  
        console.log(`State button clicked for Lottery ${lotteryID} and currnt state ${currentState}`);
        if (account) {
            goNextState(lotteryID,currentState,account);
        }
    }
    return { nextStateClicked: nextStateClicked }
}

export default useLotteryState;