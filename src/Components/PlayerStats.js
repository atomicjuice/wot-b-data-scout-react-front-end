import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import '../Css/StatsStyle.css'

class PlayerStats extends Component {

  playerLocalStorage = (localStorage.getItem('currentPlayer'))
  playerParsed = JSON.parse(this.playerLocalStorage)

  state = {
    player: !this.props.player ? this.playerParsed : this.props.player
  }

  addToPlayerList = (name, id) => {
    if (!localStorage.getItem('playerList')) {
      localStorage.setItem('playerList', JSON.stringify({ [name]: id }))
      const player = localStorage.getItem('playerList')
      const parsedPlayer = JSON.parse(player)
      this.props.setPlayerList(parsedPlayer)
      alert('Player Added To List')
    }
    else {
      let retreivedData = localStorage.getItem('playerList')
      let playerArray = JSON.parse(retreivedData)
      playerArray[name] = id
      localStorage.setItem('playerList', JSON.stringify(playerArray))
      this.props.setPlayerList(playerArray)
      alert('Player Added To List')
    }
  }

  setPlayerOneComparisonID = this.props.setPlayerOneComparisonID
  compareFromPlayerList = this.props.compareFromPlayerList


  render() {
    const player = this.state.player
    const nickname = this.state.player.nickname
    const info = player.statistics.all
    const accuracy = info.hits / info.shots * 100
    return (
      <div className='playerStats'>
        <div className='playerCard'>
          <h1 style={{color:'#E56306E3'}} >Player name: {nickname}</h1>
          <h2 className="individualStat" >Battles: {info.battles}</h2>
          <br></br>
          <h2 className="individualStat" >Won: {info.wins}</h2>
          <br></br>
          <h2 className="individualStat" >Losses: {info.losses}</h2>
          <br></br>
          <h2 className="individualStat" >Won And Survived: {info.win_and_survived}</h2>
          <br></br>
          <h2 className="individualStat" >Destroyed: {info.frags}</h2>
          <br></br>
          <h2 className="individualStat" >Accuracy: {accuracy.toFixed(2)}%</h2>
          <br></br>
          <div className='buttons'>
            <button className="CompareBySearch" onClick={() => this.setPlayerOneComparisonID(player.account_id)}>Compare Players By Search</button>
            <button className="compareFromList"onClick={() => this.compareFromPlayerList(player.account_id)}> Compare With <br></br>Player From List</button>         
            <button className="addToList" onClick={() => this.addToPlayerList(nickname, player.account_id)}>+ Add To <br></br> Player List</button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(PlayerStats);
