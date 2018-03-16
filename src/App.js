import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3'
import lottery from './lottery'

class App extends Component {

  state = {
    manager:'',
    players:[],
    balance:''
  }

  async componentDidMount(){

    // with metamask is not necessary to specify the getAccounts
    // because by default the first account is taken
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);
    this.setState({ manager })
  }

  render() {

    console.log(web3.version)

    web3.eth.getAccounts().then(console.log);

    let etherBalance = web3.utils.fromWei(this.state.balance,'ether');
    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>This contract is managed by {this.state.manager}.
          There are currently {this.state.players.length} people entered,
          Competing to win {etherBalance} ether!
        </p>
      </div>
    );
  }
}

export default App;
