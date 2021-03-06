import React from "react";
import { Route } from "react-router-dom";
import { RampInstantSDK } from "@ramp-network/ramp-instant-sdk";
import "./App.css";
import NavBar from "./components/NavBar";
import Accounts from "./components/Accounts";
import CreateNewForm from "./components/CreateNewForm";
import Projects from "./components/Projects";

import EthereumContext from "./contexts/EthereumContext";
import Torus from "@toruslabs/torus-embed";
import { ethers } from "ethers";
import WalletAddress from "./components/WalletAddress";
import CampaignView from "./components/CampaignView";
const network = "rinkeby";
const torus = new Torus();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      provider: new ethers.getDefaultProvider(network),
      signer: null,
      account: null,
      authInProgress: false,
      auth: () => {
        this.handleAuth();
      }
    };
  }
  async componentDidMount() {
    await torus.init({ showTorusButton: false, network: { host: network } });
    this.setState({ ready: true });
  }
  render() {
    if (!this.state.ready) return "Initializing...";
    return (
      <div className="App">
        <EthereumContext.Provider value={this.state}>
          <NavBar />
          <Accounts />
          <div>
            <Route exact path="/" component={Projects} />
            <Route path="/start" component={CreateNewForm} />
            <Route path="/campaign/:address" component={CampaignView} />
          </div>
          <WalletAddress />
        </EthereumContext.Provider>
      </div>
    );
  }
  handleAuth() {
    this.setState({ authInProgress: true });
    if (window.ethereum) this.handleMetamaskAuth();
    else this.handleTorusAuth();
    this.setState({ authInProgress: false });
  }
  async handleTorusAuth() {
    await torus.login();
    const provider = new ethers.providers.Web3Provider(torus.provider);
    const signer = provider.getSigner(0);
    this.setState({ provider, signer, address: await signer.getAddress() });
  }
  async handleMetamaskAuth() {
    await window.ethereum.enable();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner(0);
    this.setState({ provider, signer, address: await signer.getAddress() });
  }
}

export default App;
