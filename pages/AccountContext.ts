import { Signer } from "ethers";
import { Web3Provider } from "@ethersproject/providers";
import { createContext } from "react";

interface AccountContextValue {
    account: Signer | undefined,
    provider: Web3Provider | undefined,
}

const AccountContext = createContext<AccountContextValue>({account: undefined, provider: undefined});

export default AccountContext;