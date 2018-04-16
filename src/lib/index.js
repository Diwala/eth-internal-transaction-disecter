var abiDecoder = require('abi-decoder');
var APIHelper = require('../helper/api-helper');

let web3Instance;

function init(abis, web3) {
  let decoderInstances = {}
  web3Instance = web3;
  for (var name in abis) {
    const abiInstance = Object.assign({}, abiDecoder);
    abiInstance.addABI(abis[name])
    decoderInstances[name] = abiInstance
  }
  return decoderInstances;
}

async function decodeInitialTransaction(abiDecoderInstance, txnHash) {
  let err, result;
  [err, result] = await APIHelper.to(web3Instance.eth.getTransaction(txnHash));
  if (err) {
    console.log("sdadada");
    console.log(err);
    throw err;
  }
  const decodedIntitialTransaction = abiDecoderInstance.decodeMethod(result.input)
  return decodedIntitialTransaction;
}

function decodeMethod(abiDecoderInstance, data) {
  return abiDecoderInstance.decodeMethod(data);
}



module.exports = {
  init: init,
  decodeMethod: decodeMethod,
  decodeInitialTransaction: decodeInitialTransaction
}
