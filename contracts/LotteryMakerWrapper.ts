import { BigNumber, Contract, Signer, utils } from "ethers"
import { Result } from "ethers/lib/utils";
import lotteryMakerABIjson from "./LotteryMakerABI.json"

export enum Functions {
    CreateLottery = "createLottery",
    Balance = "lotteryIDBalanceMapping",
    LotteryIDStateMapping = "lotteryIDStateMapping",
    LotteryIDEntrancesMapping = "lotteryIDEntrancesMapping",
    LotteryIDFeeMapping = "lotteryIDFeeMapping",
    CreateLotteryEvent = "LotteryCreatedEvent(address,uint256)",
    WinnerCalculatedEvent = "WinnerCalculatedEvent(address,uint256)",
}

export const address = process.env.lotteryMakerAddress;

export function LotteryMakerContract() {
    const lotteryInterface = new utils.Interface(lotteryMakerABIjson)
    if (!lotteryInterface) {
        throw "ABI is not properly read";
    }    
    if (!address) {
        throw "Lootery maker address is undefined!"
    }
    return new Contract(address, lotteryInterface);  
}

export interface LotteryItem {
    lotteryID: string,
    state: string,
    next_state:  string,
    players: Array<string>,
    winner: string,
    bank: string,
}

function getStateString(state: number) {
    switch (state) {
        case 0:
            return "Opened"
        case 1:
            return "Stopped"
        case 2:
            return "Calculating"
        case 3:
            return "MoneyTransfered"
        default:
            return ""
    }
}

export function stripLotteryID(lotteryID: string): string {    
    return BigNumber.from(lotteryID) + "";
}

export async function goNextState(lotteryID: string, state: string, account: Signer) {
    const contract = LotteryMakerContract();
    switch(state) {
        case "Opened":
            await contract.connect(account).stopEntrance(lotteryID);
            console.log(`Entrances should be stopped for Lottery ${lotteryID}`);
            return;
        case "Stopped":
            await contract.connect(account).calculateWinner(lotteryID);
            console.log(`Go to calculating winners got Lottery ${lotteryID}`);
            return;
        default:            
            return;                
    }

}

async function getPlayers(lotteryID: string, account: Signer) {
    const contract = LotteryMakerContract();    
    const players = await contract.connect(account).getAllEntrances(lotteryID) as string[];    
    if (players.length > 0) {
        return players
    } else {
        return ["0x1MOCKADDRESS4eEfE458FD713fD016C6d515436A","0x2MOCKADDRESS4eEfE458FD713fD016C6d515436A"]
    }
}

export async function getLotteryItem(lotteryID: string, account: Signer): Promise<LotteryItem> {
    const contract = LotteryMakerContract();    
    const stateNumber = await contract.connect(account).lotteryIDStateMapping(lotteryID) as number;
    const stateString = getStateString(stateNumber);    
    const nextStateString = getStateString(stateNumber + 1);
    const balanceBigNumber = await contract.connect(account).lotteryIDBalanceMapping(lotteryID) as BigNumber;
    const balance = utils.formatUnits(balanceBigNumber) || "";    
    return {
        lotteryID: stripLotteryID(lotteryID),
        state: stateString,
        next_state: nextStateString,
        players: await getPlayers(lotteryID, account),
        winner: "0x1MOCKADDRESS4eEfE458FD713fD016C6d515436C",
        bank: balance,
      }
}