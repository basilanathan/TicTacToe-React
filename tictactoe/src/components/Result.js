import React, { Component } from 'react';
import './Result.css';

export default class Result extends Component {
  render() {
    return (
      <div className={this.props.winner ? 'visible' : 'hidden'}>
        <h2>Game Over - {this.props.winner}</h2>
      </div>
    );
  }
}
