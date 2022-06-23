const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

module.exports = (phase, { defaultConfig }) => {  
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;    
  return {    
    reactStrictMode: true,
    env: {
      // isDev ? true : false,      
      lotteryMakerAddress: "0x1D04d42236E237E855189F6dA4ebf6079553B321",
    },
  }
}