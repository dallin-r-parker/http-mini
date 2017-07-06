import React, { Component } from 'react';
import './styles/App.css';
import {getEnemies} from './services/enemies'
import {getTroops, addTroop} from './services/troops'

class App extends Component {
	constructor(props){
		super(props)

		this.state = {
			enemies: [],
			troops: [],
			newRecruit: ''
		}
		this.seeEnemies = this.seeEnemies.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.recruitTroop = this.recruitTroop.bind(this)
	}


  seeEnemies() {
		getEnemies().then(enemies => {
			this.setState({
				enemies
			})
		})
  }

  callTroops() {
		getTroops().then(troops => {
			this.setState({
				troops
			})
		})
  }

  recruitTroop(e) {
		e.preventDefault()
		if(this.state.newRecruit){
			addTroop(this.state.newRecruit)
				.then(() => {
					this.callTroops()
					this.setState({newRecruit: ''})
				})
		}
  }


  transformMinion() {
  }

  slayLeader() {
  }

  componentDidMount(){
		getTroops().then(troops => {
			this.setState({
				troops: troops
			})
		})
  }

  handleChange(e) {
  	this.setState({
		  newRecruit: e.target.value
	  })
  }


  render() {
  	const troops = this.state.troops.map((t,i) => (
  		<li key={i} className="troop">{t.recruit}</li>
	  ))

		const enemies = this.state.enemies.map((e, i) => (
			<ul className="army" key={i}>
				<h3>Enemy Army #{e.id}: {e.name}</h3>
				<div className="leader">
					{e.leader}
				</div>

				<div className="minions">
					{e.minions.map((e, i) =>(<li className="minion" key={i}>{e.type}</li>))}
				</div>
			</ul>
		))
	  const message = this.state && this.state.enemies.length < 1 ? "ALL CLEAR" : "";
    return (
      <div className="App">

        {/* Main Defenses */}
        <div className="App-header">
          <h1>Enemies at our gate!</h1>
          <h2>Prepare our defenses!</h2>
          <div className="defenses">
            <div className="defense" id="sentry" onClick={this.seeEnemies}>Sentry<span className="instructions">Click here to see approaching enemies!</span></div>
            <div className="defense" id="captain">Captain<span className="instructions">Fill out Request Form below to recruit new troop!</span></div>
            <div className="defense" id="wizard">Wizard<span className="instructions">Click directly on a minion to cast a spell!</span></div>
            <div className="defense" id="ballista">Ballista<span className="instructions">Blast enemy leader to disperse army!</span></div>
          </div>
        </div>


        {/* Reinforcements */}
        <div className="reinforcements">
          <form type="submit">
            New Recruit Request Form:
            <input id="paperwork" placeholder="Please indicate requested recruit" onChange={this.handleChange} value={this.state.newRecruit}/>
            <button onClick={this.recruitTroop}>Enlist!</button>
          </form>

          <div id="wall">
            <span></span><span id="gate"></span><span></span>
          </div>
        </div>

        <ul className="troops">
	        {troops}
        </ul>

        <h1 id="message">{message}</h1>

        {/* Enemy Armies */}
        <div className="enemies">
	        {enemies}
        </div>
      </div>
    );
  }
}

export default App;
