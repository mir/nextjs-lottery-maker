import { utils } from "ethers";
import { useEffect, useState } from "react";
import { LotteryMakerContract, stripLotteryID } from "../../../contracts/LotteryMakerWrapper";
import useWallet from "./useWallet";

const useLotteryIDs = (): Array<string> => {
    
    const { account, provider } = useWallet();       

    const [lotteryIDs, setLotteryIDs] = useState<string[]>([]);
    const [blockNumber, setBlockNumber] = useState<number>(0);
    const [timer, setTimer] = useState<number>(0);
    
    const contract = LotteryMakerContract();    

    const filter = {
      address: contract.address,
      topics: [
        utils.id("LotteryCreatedEvent(address,uint256)"),
        null,
        null
      ],
      fromBlock: 0,
    };

    const accountCheck = () => {
      if (!contract) {
        console.log("Can not get contract");
        return false;
      }    
  
      if (!provider || !account) {
        console.log("Not logged in"); 
        return false;
      }
      return true;
    }

    useEffect(() => {
      if (!accountCheck) return;

      setTimeout(() => {
        console.log(`Timer run`);
        provider?.getBlockNumber().then((number) => {
          if (number !== blockNumber) {
            console.log(`New block mined ${number}`);
            setBlockNumber(number);
          } else {
            console.log(`Still an old block: ${number}`);
          }
        });
        setTimer(timer + 1);
      }, 10000);      
    }, [account,timer]);

    useEffect(() => {     
      if (!accountCheck) return;
       
      const logs = provider?.getLogs(filter)
        .then((logs) => {
          const newLotteryIds = logs.map((log) => log.topics[2]);
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
        });
    }, [account, blockNumber]);
    return lotteryIDs;
}

export default useLotteryIDs;