const { Core } = require('@quicknode/sdk');

const core = new Core({
  endpointUrl: 'https://distinguished-damp-wind.avalanche-testnet.quiknode.pro/910039aa826c9b2cfe070987241b1183377ee1c2/ext/bc/C/rpc/',
})

async function f1(){
const currentBlockNumber = await core.client.getBlockNumber();
console.log(currentBlockNumber)
}

f1();