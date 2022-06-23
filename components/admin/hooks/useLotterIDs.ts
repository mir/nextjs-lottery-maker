import { utils } from "ethers";
import { useState } from "react";
import { stripLotteryID } from "../../../contracts/LotteryMakerWrapper";
import useLogs from "./useLogs";

const useLotteryIDs = (): Array<string> => {    

    const [lotteryIDs, setLotteryIDs] = useState<Array<string>>([]);
    const filter = {
      topics: [
        utils.id("LotteryCreatedEvent(address,uint256)"),
        null,
        null
      ],
      fromBlock: 0,
    };

    const logs = useLogs(filter);
    if (logs.length > 0) {
      const newLotteryIds = logs
        .map((log) => log.topics[2])
        .filter((topic) => topic);
      console.log(`LotteryIDs: ${newLotteryIds}`);
      let theSame = true;
      newLotteryIds.forEach((elem, index) => {
        if (elem !== lotteryIDs[index]) {
          theSame = false;
        }
      });
      if (!theSame) {
        console.log(`New lottery IDs: ${newLotteryIds.map(stripLotteryID)}`);
        setLotteryIDs(newLotteryIds);
      } else {
        console.log(`Old lottery IDs: ${newLotteryIds.map(stripLotteryID)}`);
      }
    }  else {
      console.log(`Empty logs`);
    }
    return lotteryIDs;
}

export default useLotteryIDs;