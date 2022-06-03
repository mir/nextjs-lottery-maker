const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

module.exports = (phase, { defaultConfig }) => {  
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;    
  return {    
    reactStrictMode: true,
    env: {
      // isDev ? true : false,      
      lotteryMakerAddress: "0xa66A32EF8885ED6DFF0e92c841886d732EB28BA0",
    },
  }
}