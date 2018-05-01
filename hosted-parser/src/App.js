import React, { Component } from 'react';
import './App.css';
import { uport } from 'eth-internal-transaction-disecter';
import Web3 from 'web3'
import ReactJson from 'react-json-view'
import logo from './loader.gif'
const web3 = new Web3('https://rinkeby.infura.io/ldQyXJ1VEPzix4OQ7cNT');

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasTransaction: false,
      name: "",
      txHash: "",
      transaction: {},
      fetch: false
    }
    this.getTransaction = this.getTransaction.bind(this)
  }

  getTransaction() {
    const abi = JSON.parse(document.getElementById("abi").value);
    const txnHash = document.getElementById("txnHash").value;
    this.setState({
      name: abi[0].name,
      txHash: txnHash,
      fetch:true,
      failed: false,
      hasTransaction: false
    })

    if(abi && txnHash) {
      uport(abi, txnHash, web3).then(item=>{
        this.setState({hasTransaction: true, transaction:item, fetch:false})
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
      else if(Object.keys(obj).length === 0 && obj.constructor === Object) {
        return ""
      }
      else {
        return (<div className="outputtxn">
                    <p>TxHash :</p>
                    <p>{this.state.txHash}</p>
                    <p>Name :</p>
                    <p>{this.state.name}</p>
                    <div className="viewer">
                        <ReactJson src={this.state.transaction} collapseStringsAfterLength={20} iconStyle="circle" />
                    </div>
                </div>)
      }
    }
    
    return (
        <div className = "main">
        <header className="App-header">
                <h1 className="App-title">Add the parameteres to find your uPort transaction</h1>
                <p>Internal uport transactions can't be viewed on rinkeby So we made this to be able to see<br/>
                    what transactions that was sent txnHash is the hash of the transaction that was sent<br/>
                    contract abi is the abi of the end contract recieving the transaction
                </p>
        </header>
            
        <div className="container">
            <div className="content">
                <div className="row">
                    <div className="col-lg-6">
                        <input type="text" id="txnHash" placeholder="TxnHash"/>
                        <textarea id="abi" rows="9" cols="50" placeholder="Your contract ABI"></textarea>
                        <button className="button" onClick={this.getTransaction}>
                            FIND
                        </button>
                    </div>
                    <div className="col-lg-6">
                        {(this.state.hasTransaction)? 
                            output(this.state.transaction):
                            ((this.state.fetch)?
                             (<div className="outputtxn">
                                <img className="logo" src={logo} alt="loader"/>
                             </div>):
                             (<div className="output">
                                Please provide TxnHash and your contract ABI to see decoded transaction
                              </div>))
                        }
                    </div>
                </div>  
                <div className="articles">
                    <p>You can read more about the reasoning for this here:</p>
                    <a href="https://medium.com/diwala/uport-transactions-c8fc4e31d9" target="_blank" rel="noopener noreferrer">https://medium.com/diwala/uport-transactions-c8fc4e31d9</a>
                </div>
            </div>
        </div>
        <footer>
              Made with <span role="img" aria-label="Heart emoji">💜</span> by <a target="_blank" rel="noopener noreferrer" href="https://diwala.io/" >https://diwala.io/</a>
        </footer>
        </div>
    )
  }
}

export default App;
