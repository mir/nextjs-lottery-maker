import { useEffect, useState } from "react";
import useWallet from "./useWallet";
import { Log } from "@ethersproject/abstract-provider";
import useContract from "./useContract";

function equalLogs(oldLogs: Log[], newLogs: Log[]) {
  if (oldLogs.length === newLogs.length) {    
    oldLogs.forEach((item, index) => {
      if (item !== newLogs[index]) {
        return false;                
      }
    });
    return true;
  } else {
    return false;
  }
}

const useLogs = (filter: { address?: string, topics: (string | null) [], fromBlock: number }) => {
    const { address, provider } = useWallet();       
    
    const [logs, setLogs] = useState<Log[]>([]);
    const [blockNumber, setBlockNumber] = useState<number>(0);
    const [timer, setTimer] = useState<number>(0);
    
    const contract = useContract();        

    const accountCheck = () => {
      if (!contract) {
        console.log("Can not get contract");
        return false;
      }    
  
      if (!provider || !address) {
        console.log("Not logged in"); 
        return false;
      }
      return true;
    }

    useEffect(() => {     
      if (!accountCheck) return;
      
      if (!filter.address) {      
        filter.address = contract.address;
      }

      provider?.getLogs(filter)
        .then((newLogs) => {
          if (!equalLogs(newLogs, logs)) {
            setLogs(newLogs);
          }          
        }).catch(e => {
          console.log(e);
        });
    }, [blockNumber]);

    useEffect(() => {
      if (!accountCheck) return;

      provider?.getBlockNumber().then((number) => {
        if (number !== blockNumber) {
          console.log(`New block mined ${number}`);
          setBlockNumber(number);
        } else {
          console.log(`Still an old block: ${number}`);
        }
      }).catch(e => {
        console.log(e);
      });

      setTimeout(() => {
        console.log(`Timer run`);        
        setTimer(timer + 1);
      }, 10000);      
    }, [address,timer]);
    
    return logs.filter((log) => log !== undefined && log !== null);  
}

export default useLogs;