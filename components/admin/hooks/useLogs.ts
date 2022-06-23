import { useEffect, useState } from "react";
import { LotteryMakerContract } from "../../../contracts/LotteryMakerWrapper";
import useWallet from "./useWallet";
import { Log } from "@ethersproject/abstract-provider";

const useLogs = (filter: {topics: (string | null) [], fromBlock: number }) => {
    const { account, provider } = useWallet();       

    const [logs, setLogs] = useState<Log[]>([]);
    const [blockNumber, setBlockNumber] = useState<number>(0);
    const [timer, setTimer] = useState<number>(0);
    
    const contract = LotteryMakerContract();

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
       
      provider?.getLogs(filter)
        .then((logsResult) => {
          if (logsResult.length === logs.length) {
            let theSame = true;
            logsResult.forEach((item, index) => {
              if (item !== logs[index]) {
                theSame = false;                
              }
            });
            if (theSame) return;
          }          
          setLogs(logsResult);         
        });
    }, [account, blockNumber]);
    return logs.filter((log) => log !== undefined && log !== null);  
}

export default useLogs;