import React, { Component } from 'react';
import './App.css';

import Result from './components/Result';
import Tile from './components/Tile';
import ResetButton from './components/ResetButton';

class App extends Component {
  constructor() {
    super();
    this.state = {
      gameBoard: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      turn: 'x',
      winner: null
    };
  }
  //click element on board
  //run updateBoard function => checks to see if position clicked has X or O in it
  //if it does it's an invalid move
  //if it doesn't => updates the board and continues the game
  //check all possible combinations to see if there is a winner
  //if theres is no winner or draw, then change player
  updateBoard(loc, player) {
    if (
      this.state.gameBoard[loc] === 'x' ||
      this.state.gameBoard[loc] === 'o' ||
      this.state.winner
    ) {
      //invalid move
      return;
    }
    let currentGameBoard = this.state.gameBoard;
    currentGameBoard.splice(loc, 1, this.state.turn);
    this.setState({ gameBoard: currentGameBoard });
    let topRow =
      this.state.gameBoard[0] +
      this.state.gameBoard[1] +
      this.state.gameBoard[2];
    if (topRow.match(/xxx|ooo/)) {
      this.setState({ winner: this.state.turn });
      return;
    }
    let middleRow =
      this.state.gameBoard[3] +
      this.state.gameBoard[4] +
      this.state.gameBoard[5];
    if (middleRow.match(/xxx|ooo/)) {
      this.setState({ winner: this.state.turn });
      return;
    }
    let bottomRow =
      this.state.gameBoard[6] +
      this.state.gameBoard[7] +
      this.state.gameBoard[8];
    if (bottomRow.match(/xxx|ooo/)) {
      this.setState({ winner: this.state.turn });
      return;
    }
    let leftCol =
      this.state.gameBoard[0] +
      this.state.gameBoard[3] +
      this.state.gameBoard[6];
    if (leftCol.match(/xxx|ooo/)) {
      this.setState({ winner: this.state.turn });
      return;
    }
    let midCol =
      this.state.gameBoard[1] +
      this.state.gameBoard[4] +
      this.state.gameBoard[7];
    if (midCol.match(/xxx|ooo/)) {
      this.setState({ winner: this.state.turn });
      return;
    }
    let rightCol =
      this.state.gameBoard[2] +
      this.state.gameBoard[5] +
      this.state.gameBoard[8];
    if (rightCol.match(/xxx|ooo/)) {
      this.setState({ winner: this.state.turn });
      return;
    }
    let leftDiag =
      this.state.gameBoard[0] +
      this.state.gameBoard[4] +
      this.state.gameBoard[7];
    if (leftDiag.match(/xxx|ooo/)) {
      this.setState({ winner: this.state.turn });
      return;
    }
    let rightDiag =
      this.state.gameBoard[2] +
      this.state.gameBoard[4] +
      this.state.gameBoard[6];
    if (rightDiag.match(/xxx|ooo/)) {
      this.setState({ winner: this.state.turn });
      return;
    }
    //length of moves = #of plays so far
    let moves = this.state.gameBoard.join('').replace(/ /g, '');
    if (moves.length === 9) {
      this.setState({ winner: 'draw' });
    }
    this.setState({ turn: this.state.turn === 'x' ? 'o' : 'x' });
  }
  resetBoard() {
    this.setState({
      gameBoard: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      turn: 'x',
      winner: null
    });
  }
  render() {
    return (
      <div className="wrapper">
        <div className="container">
          <div className="menu">
            <h1 className="title-container__title">Tic-Tac-Toe</h1>
            <Result winner={this.state.winner} />
            <ResetButton reset={this.resetBoard.bind(this)} />
          </div>
          {this.state.gameBoard.map(
            function(value, i) {
              return (
                <Tile
                  key={i}
                  loc={i}
                  value={value}
                  updateBoard={this.updateBoard.bind(this)}
                  turn={this.state.turn}
                />
              );
            }.bind(this)
          )}
        </div>
      </div>
    );
  }
}

export default App;
