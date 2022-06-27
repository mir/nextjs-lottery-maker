import { utils } from "ethers";
import { hexZeroPad } from "ethers/lib/utils";
import { useState } from "react";
import { stripLotteryID } from "../../../contracts/LotteryMakerWrapper";
import useLogs from "./useLogs";
import useWallet from "./useWallet";
import { Log } from "@ethersproject/abstract-provider";

function parseLogs(logs: Log[]) {
  return logs
        .map((log) => log.topics[2])
        .filter((topic) => topic)
        .map(stripLotteryID)
        .sort();
}

function equalLotteryIDs(newArray: string[], oldArray:string[]): boolean {
  if (newArray?.length !== oldArray?.length) return false;
  
  newArray?.forEach((newArrayItem, index) => {
    if (newArrayItem !== oldArray[index]) return false;
  });
  return true;
}

const useLotteryIDs = (): Array<string> => {    

  const { address } = useWallet();  
  
  const onwerAddress = hexZeroPad(address, 32);  
    const [lotteryIDs, setLotteryIDs] = useState<Array<string>>([]);
    const filter = {
      topics: [
        utils.id("LotteryCreatedEvent(address,uint256)"),
        onwerAddress,
        null
      ],
      fromBlock: 0,
    };

    const logs = useLogs(filter);
    if (logs.length > 0) {
      const newLotteryIds = parseLogs(logs);            
      if (!equalLotteryIDs(newLotteryIds, lotteryIDs)) {        
        setLotteryIDs(newLotteryIds);
      }
    }  else {
      console.log(`Empty logs`);
    }
    return lotteryIDs;
}

export default useLotteryIDs;