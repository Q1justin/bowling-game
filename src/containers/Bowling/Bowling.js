import React, {Component} from 'react';
import classes from './Bowling.module.css';
import ScoreSheet from '../../components/ScoreSheet/ScoreSheet';

const SYMBOL = {
  X: 10,
  "/": 10,
  "-": 0
}

const initFrames = () => {
  let frames =[]
  for(let i = 0; i < 10; i++) {
    frames.push({
      frames: [],
      score: null,
    })
  }
  return frames
}

class Bowling extends Component{
  state = {
    /*Save the current progress of the game in a state*/
    game: initFrames(),
    /*Current frame. start from 0 so it is easier to index into the game array above*/
    currentFrame: 0,
    /*Keep track of the total score that gets calculated*/
    totalScore: 0,
    remainingPins: [0,1,2,3,4,5,6,7,8,9,10]
  };

  resetGame(){
    this.setState({
      game: initFrames(),
      currentFrame: 0,
      totalScore: 0,
      remainingPins: [0,1,2,3,4,5,6,7,8,9,10]
    })
  }

  gameEnded(game){
    /*9th index is the last frame*/
    if(game[9].frames.length === 2){
      if(game[9].frames.includes("/") || game[9].frames.includes("X")){
        return false
      }
      else{
        return true
      }
    }
    if(game[9].frames.length === 3){
      return true
    }
    return false
  }

  /*Check if a spare was thrown this frame*/
  isSpare(input, frame){
    /*Spares cannot happen on the first bowl. That's a strike*/
    if(frame.frames.length >= 1){
      /*Get most recent throw*/
      let prev = frame.frames[frame.frames.length - 1];
      let knockedPins = input
      knockedPins += isFinite(prev) ? prev : SYMBOL[prev];
      if(knockedPins === 10){
        return true
      }
    }
    return false
  }

  getRemainingPins(input, frame){
    /*Get most recent items knocked*/
    let prevThrow = frame.frames.length > 0 ? frame.frames[frame.frames.length - 1] : 0;
    prevThrow = isFinite(prevThrow) ? prevThrow : SYMBOL[prevThrow];
    let remaining = 10 - input - prevThrow;
    remaining = remaining <= 0 ? 10 : remaining;
    let arr = []
    for(let i = 0; i < remaining+1; i++){
      arr.push(i)
    }
    return arr
  }

  getTotalScore(game){
    let max;
    for(let i = 0; i < game.length; i++){
      if(isNaN(game[i].score)){
        break;
      }
      max = max > game[i].score ? max : game[i].score
    }
    return max === null ? 0 : max
  }

  getFrameScore(frame){
    let sum = 0;
    for(let i = 0; i < frame.frames.length; i++){
      /*If spare or strike, we know we hit 10*/
      if(frame.frames[i] === "X" || frame.frames[i] === "/"){
        return 10
      }
      else if(frame.frames[i] === "-"){
        sum += 0
      }
      /*Last value is for a miss which is 0*/
      else{
        sum += frame.frames[i]
      }
    }
    return sum
  }

  getNextFrame(input, frame){
    /*If at last frame, we don't move on*/
    if(this.state.currentFrame === 9){
      return this.state.currentFrame
    }
    /*Move to next frame if strike*/
    if(frame.frames.includes("X")){
      return this.state.currentFrame + 1;
    }
    if(frame.frames.length === 2){
      return this.state.currentFrame + 1;
    }
    return this.state.currentFrame
  }

  calculateScore(input, game, total){
    for(let i = 0; i < game.length; i++){
      if(game[i].score === null){
        let futureBowls = [];
        for(let j = i; j < game.length; j++){
          futureBowls = futureBowls.concat(game[j].frames)
        }
        let frameScore = this.getFrameScore(game[i]);
        /*Spare*/
        if(game[i].frames.includes("/")){
          if(futureBowls.length > 2){
            game[i].score = total + frameScore
            game[i].score += isFinite(futureBowls[2]) ? futureBowls[2] : SYMBOL[futureBowls[2]]
          }
        }
        /*Strike*/
        else if(game[i].frames.includes("X")){
          if(futureBowls.length > 2){
            game[i].score = total + frameScore
            /*If there is a spare, we just add 10*/
            futureBowls =futureBowls.slice(1,3)
            if(futureBowls.includes("/")){
              game[i].score += 10
            }
            else{
              for(let j = 0; j < futureBowls.length; j++){
                game[i].score += isFinite(futureBowls[j]) ? futureBowls[j] : SYMBOL[futureBowls[j]]
              }
            }
          }
        }
        else if(game[i].frames.length >= 2){
          game[i].score = total + frameScore
        }
      }
      total = game[i].score === null ? total : game[i].score
    }
    return game
  }

  /*Setup the current frame depending on input*/
  setFrame(input, game, frame){
    if(this.isSpare(input, frame)){
      frame.frames.push("/");
    }
    /*Easier check because we went through spare already*/
    else if(input === 10){
      frame.frames.push("X");
    }
    else if(input === 0){
      frame.frames.push("-")
    }
    else{
      frame.frames.push(input)
    }
    game[this.state.currentFrame] = frame;
    return game
  }

  handleSubmit(input, event){
    /*To prevent refreshes on submit. Helps debugging*/
    event.preventDefault();
    let tempGame = this.state.game;
    let tempFrame = tempGame[this.state.currentFrame];
    let tempTotal = this.state.totalScore;
    let gameEnded = this.gameEnded(tempGame)
    let remainingPins = this.getRemainingPins(input, tempFrame);
    /*Set current frame value*/
    tempGame = this.setFrame(input, tempGame, tempFrame)
    /*Get score for each frame*/
    tempGame = this.calculateScore(input, tempGame, tempTotal);
    /*Get total so far. Could be a better way to do as we are calling this twice*/
    tempTotal = this.getTotalScore(tempGame);
    /*See if we move to the next frame*/
    let currentFrame = this.getNextFrame(input, tempFrame);
    this.setState({
      currentFrame: currentFrame,
      game: tempGame,
      totalScore: tempTotal,
      remainingPins: currentFrame !== this.state.currentFrame ? [0,1,2,3,4,5,6,7,8,9,10] : remainingPins
    })
  }

  render(){
    let buttons = this.state.remainingPins.map(val =>{
      return <button onClick={(event) => this.handleSubmit(val, event)} key={val}>{val}</button>
    })
    if(this.gameEnded(this.state.game)){
      buttons = <div>
        <p>Game Ended</p>
        <button onClick = {() => this.resetGame()}>Replay?</button>
      </div>
    }
    return(
      <div>
        <div className = {classes.title}>
          <h1>Bowling Game</h1>
        </div>
        <div className = {classes.inputField}>
          {buttons}
        </div>
        <br/>
        <br/>
        <div className = {classes.boxScore}>
          <ScoreSheet game = {this.state.game} />
        </div>
      </div>
    )
  }
};

export default Bowling;
