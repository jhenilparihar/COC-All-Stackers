import { useState, Component } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Web3 from "web3";

import { contractABI, contractAddress } from "./utils/constants";

import ConnectToMetamask from "./components/ConnectMetamask/ConnectToMetamask";
import ContractNotDeployed from "./components/ContractNotDeployed/ContractNotDeployed";
import Loading from "./components/Loading/Loading";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountAddress: "",
      accountBalance: "",
      count: 0,
      loading: true,
      metamaskConnected: false,
      contractDetected: false,
      Contract: null,
    };
  }

  componentWillMount = async () => {
    await this.loadWeb3();
    await this.loadBlockchainData();
  };

  loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  loadBlockchainData = async () => {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    if (accounts.length === 0) {
      this.setState({ metamaskConnected: false });
    } else {
      this.setState({ metamaskConnected: true });
      this.setState({ loading: true });
      this.setState({ accountAddress: accounts[0] });
      let accountBalance = await web3.eth.getBalance(accounts[0]);
      accountBalance = web3.utils.fromWei(accountBalance, "Ether");
      this.setState({ accountBalance });
      const Contract = new web3.eth.Contract(contractABI, contractAddress);
      if (Contract) {
        this.setState({ Contract });
        this.setState({ contractDetected: true });
      } else {
        this.setState({ contractDetected: false });
      }
      this.setState({ loading: false });
    }
  };

  connectToMetamask = async () => {
    await window.ethereum.enable();
    this.setState({ metamaskConnected: true });
    window.location.reload();
  };

  addToBlockchain = async (tokenPrice, message, keyword) => {
    this.setState({ loading: true });
    const price = window.web3.utils.toWei(tokenPrice.toString(), "ether");
    const transactionHash = await this.state.Contract.methods
      .addToBlockchain(this.state.accountAddress, price, message, keyword)
      .send({ from: this.state.accountAddress })
      .on("confirmation", () => {
        localStorage.setItem(this.state.accountAddress, new Date().getTime());
        this.setState({ loading: false });
        window.location.reload();
      });
  };
  getTransaction = async () => {
    const tran = await this.state.Contract.methods.getAllTransactions().call();
    console.log(tran)
  }

  render() {
    return (
      <>
        {!this.state.metamaskConnected ? (
          <ConnectToMetamask connectToMetamask={this.connectToMetamask} />
        ) : !this.state.contractDetected ? (
          <ContractNotDeployed />
        ) : this.state.loading ? (
          <Loading />
        ) : (
          <div className="App">
            <div>
              <a href="https://vitejs.dev" target="_blank">
                <img src="/vite.svg" className="logo" alt="Vite logo" />
              </a>
              <a href="https://reactjs.org" target="_blank">
                <img src={reactLogo} className="logo react" alt="React logo" />
              </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
              <button
                onClick={this.getTransaction}
              >
                get data
              </button>
              <button
                // onClick={() => this.setState({ count: this.state.count + 1 })}
                // onClick={() => this.addToBlockchain(15, "Hackathon", "Test2")}
                onClick={this.getTransaction}
              >
                add data
              </button>
              <p>
                Edit <code>src/App.jsx</code> and save to test HMR
              </p>
            </div>
            <p className="read-the-docs">
              Click on the Vite and React logos to learn more
            </p>
          </div>
        )}
      </>
    );
  }
}

export default App;
