var Web3 = require('web3');
const web3 = new Web3('https://rinkeby.infura.io/ldQyXJ1VEPzix4OQ7cNT');
const internalTransactions = require('../../dist');

const exampleContract =
[{"constant":false,"inputs":[{"name":"_hashStr","type":"string"}],"name":"addCert","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"hashStr","type":"string"}],"name":"certInfo","type":"event"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"certificates","outputs":[{"name":"hash_str","type":"string"}],"payable":false,"stateMutability":"view","type":"function"}]
const exampleTxHash = "0xd70092643553c86d302877dd20a9846f0740268c5351f2ff6bbbbb4db3ef5cc1"

const dataPromise = internalTransactions.uport(exampleContract, exampleTxHash, web3)
dataPromise.then(function(data) {
  console.log(data)
})
