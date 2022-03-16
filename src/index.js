import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/**
 * Global variables for updating elements
 */
const playerScore = document.querySelector('#playerScore');
const computerScore = document.querySelector('#computerScore');

const currentMoves = document.querySelector('.currentMoves');

/**
 * Add button listeners to capture gameplay; record result
 * and update score displayed
 */
const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
  button.addEventListener('click', (e) => {
    let result = playRound(e.target.id);

    if (result === "DRAW") return;
    // update the scores
    if (result === "WIN") {
      playerScore.textContent++;
    }
    if (result === "LOSE") {
      computerScore.textContent++;
    }

    // first to reach 5 wins, so add a win/lose statement and reset scores
    if (+playerScore.textContent == 5 || +computerScore.textContent == 5) {
      const container = document.querySelector('body');

      // win/lose and final score statement
      const finalScore = document.createElement('div');
      finalScore.textContent = `You ${result}! Final Score: `
          + `${playerScore.textContent} to ${computerScore.textContent}`;
      finalScore.style.cssText = 'text-align: center';
      finalScore.style.color = (result === "WIN") ? 'green' : 'red';
      container.appendChild(finalScore);

      // reset scores for next game
      playerScore.textContent = 0;
      computerScore.textContent = 0;
    }
  });
});

/**
 * play a round of rock, paper, scissors
 * 
 * @param {string} playerMove
 * @returns {string} result of the round
 */
function playRound(playerMove) {
  let computerMove = computerPlay();

  if (playerMove === computerMove) {
    currentMoves.textContent = "It's a Draw!";
    return("DRAW");
  }
  
  if (playerMove === 'ROCK' && computerMove === 'SCISSORS' ||
      playerMove === 'PAPER' && computerMove === 'ROCK' ||
      playerMove === 'SCISSORS' && computerMove === 'PAPER') {
    currentMoves.textContent = `You Win this round! ${playerMove} beats ${computerMove}!`;
    return("WIN");
  }
  currentMoves.textContent = `You Lose this round! ${computerMove} beats ${playerMove}!`;
  return("LOSE");
}


/**
 * select random move for computer
 * 
 * @returns {string} rock, paper, or scissors
 */
function computerPlay() {
  let move = Math.floor(Math.random()*3);
  
  return getMoveName(move);
}

/**
 * helper function for computerPlay()
 * 
 * @param {number} move
 * @returns {string} rock, paper, or scissors
 */
function getMoveName(move) {
  if (move === 0) {
    return "ROCK";
  } else if (move === 1) {
    return "PAPER";
  } else {
    return "SCISSORS";
  }
}



/**
 * 
 */

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
