import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { getDefaultProvider } from 'ethers'
import { Rinkeby,DAppProvider, Config, Mumbai } from '@usedapp/core'

const config: Config = {
  readOnlyChainId: Rinkeby.chainId,
  readOnlyUrls: {
    [Rinkeby.chainId]: getDefaultProvider('rinkeby'),
    [Mumbai.chainId]: getDefaultProvider('matic'),
  },
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DAppProvider config={config}>
      <Component {...pageProps} />
    </DAppProvider>
  )
}

export default MyApp
