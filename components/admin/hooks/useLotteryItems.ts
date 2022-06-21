import { useState } from "react";
import { getLotteryItem, LotteryItem } from "../../../contracts/LotteryMakerWrapper";
import useLotteryIDs from "./useLotterIDs";
import useWallet from "./useWallet";

const useLotteryItems = (): Array<LotteryItem> => {     
    const lotteryIDs = useLotteryIDs();
    const {account} = useWallet();
    const [lotteries, setLotteries] = useState<Map<string, LotteryItem>>(new Map); 
    
    if (!account) return [];

    lotteryIDs.forEach((lotteryID) => {
      getLotteryItem(lotteryID, account).then((lotteryItem) => {
        lotteries.set(lotteryID, lotteryItem);
        setLotteries(lotteries);
      });
    });

    return Array.from(lotteries.values());
}

export default useLotteryItems;