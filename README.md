## eth-internal-transaction-disecter


This library lets you have a look at internal transactions on Ethereum chains. It contains recipies such as internal transactions for uPort, on the rinkeby net.

## Usage

```npm install --save eth-internal-transaction-disecter```

```
import Web3 from 'web3'
import { uport } from 'eth-internal-transaction-disecter';
//Provider can be infura or something local
const web3 = new Web3(provider);
const exampleContractAbi = [{"constant":false,"inputs":.....

//The transaction hash that is returned when doing a transaction with uPort.
const txHash = "0xd700....";

//This is based on using one of the recipies that is in the folder
uport(exampleContract, txHash, web3).then(item=>{
  //Then you have access to the transaction item you did towards your contract
  console.log(item)
})
```

## Examples

See examples folder on how to use the lib. Works for both node-js and the browser
