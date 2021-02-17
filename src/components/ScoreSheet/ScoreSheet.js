import React from 'react';
import classes from './ScoreSheet.module.css';

const scoreSheet = (props) =>{
  return(
    <table id='table' className={classes.Scorecard} cellPadding='1' cellSpacing='0'>
      <tbody>
        <tr>
          <th id='c1' colSpan='6'>Frame 1</th>
          <th id='c2' colSpan='6'>Frame 2</th>
          <th id='c3' colSpan='6'>Frame 3</th>
          <th id='c4' colSpan='6'>Frame 4</th>
          <th id='c5' colSpan='6'>Frame 5</th>
          <th id='c6' colSpan='6'>Frame 6</th>
          <th id='c7' colSpan='6'>Frame 7</th>
          <th id='c8' colSpan='6'>Frame 8</th>
          <th id='c9' colSpan='6'>Frame 9</th>
          <th id='c10' colSpan='9'>Frame 10</th>
          <th id='c11' colSpan='6'>Total Score</th>
        </tr>
        <tr>
          <td id='r1' colSpan='3'>{props.game[0].frames[0]}</td><td id='r2' colSpan='3'>{props.game[0].frames[1]}</td>
          <td id='r3' colSpan='3'>{props.game[1].frames[0]}</td><td id='r4' colSpan='3'>{props.game[1].frames[1]}</td>
          <td id='r5' colSpan='3'>{props.game[2].frames[0]}</td><td id='r6' colSpan='3'>{props.game[2].frames[1]}</td>
          <td id='r7' colSpan='3'>{props.game[3].frames[0]}</td><td id='r8' colSpan='3'>{props.game[3].frames[1]}</td>
          <td id='r9' colSpan='3'>{props.game[4].frames[0]}</td><td id='r10' colSpan='3'>{props.game[4].frames[1]}</td>
          <td id='r11' colSpan='3'>{props.game[5].frames[0]}</td><td id='r12' colSpan='3'>{props.game[5].frames[1]}</td>
          <td id='r13' colSpan='3'>{props.game[6].frames[0]}</td><td id='r14' colSpan='3'>{props.game[6].frames[1]}</td>
          <td id='r15' colSpan='3'>{props.game[7].frames[0]}</td><td id='r16' colSpan='3'>{props.game[7].frames[1]}</td>
          <td id='r17' colSpan='3'>{props.game[8].frames[0]}</td><td id='r18' colSpan='3'>{props.game[8].frames[1]}</td>
          <td id='r19' colSpan='3'>{props.game[9].frames[0]}</td><td id='r20' colSpan='3'>{props.game[9].frames[1]}</td><td id='r21' colSpan='3'>{props.game[9].frames[2]}</td>
          <td id='total-score' className='Total' colSpan='6'></td>
        </tr>
        <tr>
          <td id='cumulative-score-f1' colSpan='6'>{props.game[0].score}</td>
          <td id='cumulative-score-f2' colSpan='6'>{props.game[1].score}</td>
          <td id='cumulative-score-f3' colSpan='6'>{props.game[2].score}</td>
          <td id='cumulative-score-f4' colSpan='6'>{props.game[3].score}</td>
          <td id='cumulative-score-f5' colSpan='6'>{props.game[4].score}</td>
          <td id='cumulative-score-f6' colSpan='6'>{props.game[5].score}</td>
          <td id='cumulative-score-f7' colSpan='6'>{props.game[6].score}</td>
          <td id='cumulative-score-f8' colSpan='6'>{props.game[7].score}</td>
          <td id='cumulative-score-f9' colSpan='6'>{props.game[8].score}</td>
          <td id='cumulative-score-f10' colSpan='9'>{props.game[9].score}</td>
          <td id='total-score' colSpan='6'>{props.game[9].score}</td>
        </tr>
      </tbody>
    </table>
  )
}

export default scoreSheet;
