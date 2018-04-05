var decoder = require('../../lib/index');
var uportContracts = require('./contracts');
var Web3 = require('web3');
const web3 = new Web3('https://rinkeby.infura.io/ldQyXJ1VEPzix4OQ7cNT');

async function getInternalTransactionData(abi, trxHash) {
  const abis = {
    IdentityManagerABI: uportContracts.IdentityManagerABI,
    TxRelayABI: uportContracts.TxRelayABI,
    EndContract: abi
  }
  const instances = decoder.init(abis, web3);
  const decodedRelayTransaction = await decoder.decodeInitialTransaction(instances.TxRelayABI, trxHash);
  const decodedIdentityTransaction = decoder.decodeMethod(instances.IdentityManagerABI, decodedRelayTransaction.params[4].value);
  const endTransaction = decoder.decodeMethod(instances.EndContract, decodedIdentityTransaction.params[4].value);
  return endTransaction;
}

module.exports = getInternalTransactionData;
