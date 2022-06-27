import { MouseEventHandler, useState } from "react";
import { enterTheLottery, getPlayers, goNextState } from "../../contracts/LotteryMakerWrapper";
import useWallet from "./useWallet";

const useLotteryState = () => {
    const { account, address } = useWallet();    

    const nextStateClicked = (lotteryID: string, currentState: string) => {  
        console.log(`State button clicked for Lottery ${lotteryID} and currnt state ${currentState}`);
        if (account) {
            goNextState(lotteryID,currentState,account);
        }
    }

    const enterLotteryClicked = (lotteryID: string) => {
        console.log(`Somebody entered the lottery ${lotteryID}`);
        if (account) {
            enterTheLottery(lotteryID,account);            
        }
    }    

    const loadPlayers = (lotteryID: string) => {
        if (account) {
            return getPlayers(lotteryID, account);        
        } else {
            return Promise.resolve([]);
        }
    }

    return { 
        nextStateClicked: nextStateClicked,
        enterLotteryClicked: enterLotteryClicked,
        getPlayers: loadPlayers,
    }
}

export default useLotteryState;