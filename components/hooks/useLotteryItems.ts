import { useState } from "react";
import { getLotteryItem, LotteryItem, stripLotteryID } from "../../contracts/LotteryMakerWrapper";
import useLotteryIDs from "./useLotterIDs";
import useWallet from "./useWallet";
import useWinners from "./useWinners";

function setWinner(lotteryItem: LotteryItem, winnersMap: Map<string, string>) {
  const lotteryID = stripLotteryID(lotteryItem.lotteryID);  
  lotteryItem.winner = winnersMap.get(lotteryID) || "";  
  return lotteryItem;
}

const useLotteryItems = (): Array<LotteryItem> => {     
    
    const {address, account} = useWallet();
    const lotteryIDs = useLotteryIDs(address);
    const [lotteries, setLotteries] = useState<Map<string, LotteryItem>>(new Map);
    const winnersMap = useWinners(lotteryIDs);
    
    if (!account) return [];

    lotteryIDs.forEach((lotteryID) => {
      getLotteryItem(lotteryID, account).then((lotteryItem) => {
        setWinner(lotteryItem, winnersMap);
        lotteries.set(lotteryID, lotteryItem);        
        setLotteries(lotteries);
      }).catch(e => {
        console.log(e);
      });
    });

    return Array.from(lotteries.values()).sort((a,b) => {
      if (a.lotteryID < b.lotteryID) return -1
      else if (a.lotteryID === b.lotteryID) return 0 
      else return 1;
    });
}

export default useLotteryItems;