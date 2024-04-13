const { Core } = require('@quicknode/sdk');
require('dotenv').config()

const core = new Core({
  endpointUrl: process.env.URL,
})

async function f1(){
const currentBlockNumber = await core.client.getBlockNumber();
console.log(currentBlockNumber)
}

f1();