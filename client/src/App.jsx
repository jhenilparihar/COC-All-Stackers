import { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Web3 from "web3";

import { contractABI, contractAddress } from "./utils/constants";

import ConnectToMetamask from "./components/ConnectMetamask/ConnectToMetamask";
import ContractNotDeployed from "./components/ContractNotDeployed/ContractNotDeployed";
import Loading from "./components/Loading/Loading";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import Dashboard from "./components/Dashboard/Dashboard";
import Home from "./components/Home/Home";

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
      verified: false,
      allUserProfile: {},
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
      console.log(Contract)
      if (Contract != null) {
        this.setState({ Contract });
        this.setState({ contractDetected: true });

        // console.log(this.state.Contract);
        const isProfileVerified = await Contract.methods
          .userExist(this.state.accountAddress)
          .call();

        if (isProfileVerified) {
          this.setState({ verified: true });
          const ProfileCounter = await Contract.methods.usersCounter().call();
          for (
            var profile_counter = 1;
            profile_counter <= ProfileCounter;
            profile_counter++
          ) {
            const address = await Contract.methods
              .allAddress(profile_counter)
              .call();
            const profile = await Contract.methods.allProfiles(address).call();

            this.state.allUserProfile[address] = profile;
          }
        }
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

  getDate = () => {
    var months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    var currentTime = new Date();
    var month = months[currentTime.getMonth()];
    var day = currentTime.getDate();
    var year = currentTime.getFullYear();

    let date2 = new Date(d2).getTime();
    const overAllDate = month + " " + day + " " + year;
    return overAllDate;
  };

  registerUser = async (name, phone) => {
    this.setState({ loading: true });
    const d = new Date();
    let time = d.getTime();
    this.state.Contract.methods
      .addUser(name, phone, time)
      .send({ from: this.state.accountAddress })
      .on("confirmation", () => {
        this.setState({ loading: false });
        window.location.reload();
      });
  };

  render() {
    console.log(this.state.contractDetected);
    return (
      <>
        {!this.state.metamaskConnected ? (
          <ConnectToMetamask connectToMetamask={this.connectToMetamask} />
        ) : !this.state.contractDetected ? (
          <ContractNotDeployed />
        ) : this.state.loading ? (
          <Loading />
        ) : !this.state.verified ? (
          <>
            <RegisterPage
              registerUser={this.registerUser}
              loading={this.state.loading}
            />
          </>
        ) : (
          <>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/dashboard" element={<Dashboard />}></Route>
              </Routes>
            </BrowserRouter>
          </>
        )}
      </>
    );
  }
}

export default App;
