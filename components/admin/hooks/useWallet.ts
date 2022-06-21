import { Web3Provider } from "@ethersproject/providers";
import { ethers, Signer, VoidSigner } from "ethers";
import { useEffect, useState } from "react";

const useWallet = () => {
    // A Web3Provider wraps a standard Web3 provider, which is
    // what MetaMask injects as window.ethereum into each page

    const[ signer, setSigner ] = useState<Signer | undefined>(undefined);
    const[ provider, setProvider ] = useState<Web3Provider | undefined>(undefined);    

    const checkAndSetProvider = () => {
        const ethWindow = window as Window & typeof globalThis & {readonly ethereum: any};
        
        if (!ethWindow.ethereum) {
            console.log(`install metamask`);
            return
        }
        
        if (!provider) {
            console.log(`Setting provider`);
            setProvider(new ethers.providers.Web3Provider(ethWindow.ethereum));
        } else {
            console.log(`Provider exists. Checked.`);
            if (!signer) {
                console.log(`Setting account`);
                setSigner(provider.getSigner());
            } else {
                console.log(`Account exists, checked.`);
            }
        }
    }

    useEffect(checkAndSetProvider, [provider]);

    const connectWallet = () => {        
        checkAndSetProvider();        
        // MetaMask requires requesting permission to connect users accounts
        provider?.send("eth_requestAccounts", [])
        .then((accounts)=>{
          if(accounts.length>0) {
              console.log(`Setting account: ${accounts[0]}`);
              setSigner(provider.getSigner());
              provider.getSigner().getAddress().then((address) => {
                console.log(`Singer provider.getSinger() address = ${address}`);
              });              
          }
        })
        .catch((e)=>console.log(e));
    }

    // The MetaMask plugin also allows signing transactions to
    // send ether and pay to change state within the blockchain.
    // For this, you need the account signer...    
    return { account: signer, provider: provider, connectFunction: connectWallet };
}

export default useWallet;