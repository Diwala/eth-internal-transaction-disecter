import React, { Component } from 'react';
import './App.css';
import { uport } from 'eth-internal-transaction-disecter';
import Web3 from 'web3'
import loader from './loader.svg'
const web3 = new Web3('https://rinkeby.infura.io/ldQyXJ1VEPzix4OQ7cNT');

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      transaction: {},
      fetch: false
    }
    this.getTransaction = this.getTransaction.bind(this)
  }

  getTransaction() {
    const abi = JSON.parse(document.getElementById("abi").value);
    const txnHash = document.getElementById("txnHash").value;
    this.setState({
      fetch:true,
      failed: false
    })

    if(abi && txnHash) {
      uport(abi, txnHash, web3).then(item=>{
        this.setState({transaction:item, fetch:false})
      }).catch( e => {
        console.log(e)
        this.setState({failed:{message:"Invalid objects in the input", error: e}})
      })
    } else {
      this.setState({failed:{message:"You need to fill in inputs!!!"}, fetch:false})
    }
  }

  render() {
    const output = (obj) => {
      if(this.state.failed) {
        return (
          <div>
            {this.state.failed.message}
            <br/>
            {this.state.failed.error ? this.state.failed.error.message : ""}
          </div>)
      }
      else if(this.state.fetch) {
        return (<img src={loader} alt="loader"/>)
      }
      else if(Object.keys(obj).length === 0 && obj.constructor === Object) {
        return ""
      }
      else {
        return JSON.stringify(this.state.transaction)
      }
    }

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Add the parameteres to find your uPort transaction</h1>
          <span>Internal uport transactions can't be viewed on rinkeby</span><br/>
          <span>So we made this to be able to see what transactions that was sent</span><br/>
          <span>txnHash is the hash of the transaction that was sent</span><br/>
          <span>contract abi is the abi of the end contract recieving the transaction</span><br/>
        </header>
        <div className="content">
          <input type="text" id="txnHash" placeholder="txnHash"/>
          <input type="text" id="abi" placeholder="Your contract abi"/>
          <div className="button" onClick={this.getTransaction}>
            Find
          </div>
          <div className="txn">{output(this.state.transaction)}</div>
        </div>
        <footer>
          Made with <span role="img">💜</span> by <a href="https://diwala.io/" target="_blank" rel="noopener noreferrer">https://diwala.io/</a>
        </footer>
      </div>
    );
  }
}

export default App;
