import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3'
import lottery from './lottery'

class App extends Component {

  state = {
    manager:'',
    players:[],
    balance:'',
    value:'',
    message:''

  }

  async componentDidMount(){

    // with metamask is not necessary to specify the getAccounts
    // because by default the first account is taken
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);

    console.log('players: ',players.length)
    console.log('balance: ',balance)
    this.setState({ manager,players,balance })
  }

  onSubmit = async (event) => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    this.setState({message:'Waiting on transaction success....'})
    await lottery.methods.enter().send({
      from:accounts[0],
      value:web3.utils.toWei(this.state.value,'ether')
    });

    this.setState({message:'you have been entered.'})

  }

  onClick = async () => {
    const accounts = await web3.eth.getAccounts();

    await lottery.methods.pickWinner().send({
      from:accounts[0]
    });

    this.setState({message:'A winner has been picked.'})
  }

  render() {

    console.log(web3.version)

    web3.eth.getAccounts().then(console.log);

    let etherBalance = web3.utils.fromWei(this.state.balance,'ether');
    return (
      <div>
        <h2>Loteria del ethereum</h2>
        <p>Contrato manejado por la cuenta: {this.state.manager}.
        </p>
        <p>
          Hay por el momento {this.state.players.length} jugadores en la loteria,
          compitiendo para ganar {etherBalance} ether!
        </p>
        <hr/>

        <form onSubmit={this.onSubmit}>
          <h4></h4>
          <div>
            <form>
              <label>probá suerte payaso !</label>
              <br/>
              <input
                value={this.state.value}
                onChange={event => this.setState({value:event.target.value})}/>
              <button>Enter</button>
            </form>
          </div>
        </form>
        <hr/>
        <h4>Elegir ganador</h4>
        <button onClick={this.onClick}>elegir ganador</button>

        <hr/>

        <h1>{this.state.message}</h1>
      </div>
    );
  }
}

export default App;
