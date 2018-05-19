import React, { Component } from 'react';
import './App.css';
import { uport } from 'eth-internal-transaction-disecter';
import Web3 from 'web3'
const web3 = new Web3('https://rinkeby.infura.io/ldQyXJ1VEPzix4OQ7cNT');
const exampleContract =
[{"constant":false,"inputs":[{"name":"_hashStr","type":"string"}],"name":"addCert","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"hashStr","type":"string"}],"name":"certInfo","type":"event"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"certificates","outputs":[{"name":"hash_str","type":"string"}],"payable":false,"stateMutability":"view","type":"function"}]

const txHash = "0xd70092643553c86d302877dd20a9846f0740268c5351f2ff6bbbbb4db3ef5cc1";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      transaction: {}
    }
    this.getTransaction = this.getTransaction.bind(this)
  }

  getTransaction() {
    uport.getInternalTransactions(exampleContract, txHash, web3).then(item=>{
      this.setState({transaction:item})
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Click the button to fetch the example transaction</h1>
        </header>
        <p className="App-intro" onClick={this.getTransaction}>
          Fetch
        </p>
        <div>{JSON.stringify(this.state.transaction)}</div>
      </div>
    );
  }
}

export default App;
