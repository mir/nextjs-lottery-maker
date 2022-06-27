import '../styles/globals.css'
import type { AppProps } from 'next/app'
import ConnectWallet from '../components/admin/ConnectWallet'
import { createContext } from 'react'
import useWallet from '../components/hooks/useWallet';
import AccountContext from './AccountContext';
import styles from '../styles/Home.module.css'

function MyApp({ Component, pageProps }: AppProps) {
  
  const { account, provider, connectFunction } = useWallet();  
  
  return (    
    <div className={styles.container}>
      <AccountContext.Provider value={{account: account, provider: provider}}>
        <div className="p-20">
          { account ?            
            <Component {...pageProps} />                  
            :
            <ConnectWallet connectFunction={connectFunction}/>
          }
        </div>        
      </AccountContext.Provider>
    </div>  
  )
}

export default MyApp
