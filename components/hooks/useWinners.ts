import { utils } from "ethers";
import { useState } from "react";
import { stripLotteryID } from "../../contracts/LotteryMakerWrapper";
import useLogs from "./useLogs";
import { Log } from "@ethersproject/abstract-provider";
import { hexStripZeros } from "ethers/lib/utils";

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
        winner: hexStripZeros(winEvent.winner),
        lotteryID: stripLotteryID(winEvent.lotteryID)
      };
    });
}

function winnersFor(winEvents: Array<WinEvent>): Map<string, string> {
  const winMap = new Map<string, string>();
  winEvents.forEach((winEvent) => {
    winMap.set(winEvent.lotteryID, winEvent.winner);    
  });
  return winMap;
}

const useWinners = (lotteryIDs: Array<string>): Map<string, string> => {    
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
      if (!equalWinEvents(winEvents, newWinEvents)) {        
        setWinEvents(newWinEvents);
      }
    }  else {
      console.log(`Empty winner logs`);
    }
          
    return winnersFor(winEvents);
}

export default useWinners;
