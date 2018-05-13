var decoder = require('../../lib/index');
var uportContracts = require('./contracts');

async function getInternalTransactionData(abi, trxHash, web3) {
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

async function getInternalTransactions(abi, trxHash, web3) {
  const abis = {
    IdentityManagerABI: uportContracts.IdentityManagerABI,
    TxRelayABI: uportContracts.TxRelayABI,
    EndContract: abi
  }
  const instances = decoder.init(abis, web3);
  const decodedRelayTransaction = await decoder.decodeInitialTransaction(instances.TxRelayABI, trxHash);
  const decodedIdentityTransaction = decoder.decodeMethod(instances.IdentityManagerABI, decodedRelayTransaction.params[4].value);
  const endTransaction = decoder.decodeMethod(instances.EndContract, decodedIdentityTransaction.params[4].value);
  const transactionStages = {
      relayTransaction: decodedRelayTransaction,
      identityTransaction: decodedIdentityTransaction,
      endTransaction: endTransaction
  };
  return transactionStages;
}

module.exports = {
    getInternalTransactionData,
    getInternalTransactions
    };
