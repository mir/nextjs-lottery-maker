import { utils } from "ethers";
import { useState } from "react";
import { stripLotteryID } from "../../../contracts/LotteryMakerWrapper";
import useLogs from "./useLogs";
import useWallet from "./useWallet";
import { Log } from "@ethersproject/abstract-provider";

type WinEvent = {winner: string, lotteryID: string};

function equalWinEvents(events1: Array<WinEvent>,events2: Array<WinEvent>) {
  if (events1.length === events2.length) {
    let theSame = true;
    events2.forEach((elem, index) => {
      if (elem.lotteryID !== events1[index].lotteryID ||
          elem.winner !== events1[index].winner) {
        theSame = false;
      }
    });
    return theSame;
  } else {
    return false;
  }    
}

function parseWinLogs(logs: Log[]) {
  return logs.map<WinEvent>(
    (log) => {
      return { winner: log.topics[1], lotteryID: log.topics[2] };
    })
    .filter((topics) => topics.winner && topics.lotteryID)
    .map<WinEvent>((winEvent) => {
      return {
        winner: winEvent.winner,
        lotteryID: stripLotteryID(winEvent.lotteryID)
      };
    });
}

const useWinners = (lotteryIDs: Array<string>): Array<WinEvent> => {    
    const { account, provider } = useWallet();        

    const filter = {
      topics: [
        utils.id("WinnerCalculatedEvent(address,uint256)"),
        null,
        null
      ],
      fromBlock: 0,
    };

    const logs = useLogs(filter);
    const [winEvents, setWinEvents] = useState<Array<WinEvent>>([]);
    
    if (logs.length > 0) {
      const newWinEvents = parseWinLogs(logs);
      if (equalWinEvents(winEvents, newWinEvents)) {
        console.log(`New winners: ${winEvents}`);
        setWinEvents(newWinEvents);
      } else {
        console.log(`Old winners: ${winEvents}`);
      }
    }  else {
      console.log(`Empty logs`);
    }
          
    return winEvents;
}

export default useWinners;
