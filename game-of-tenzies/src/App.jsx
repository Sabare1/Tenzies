import './App.css'
import { useState } from 'react'
import Dice from './components/Dice'
import {nanoid} from 'nanoid'

export default function App(){

  const[dieNums, setDieNums] = useState(generateAllNewDice());

  function generateAllNewDice(){
    return new Array(10).fill(0).map(() => (
      {
        id: nanoid(),
        randomNumber: Math.floor(Math.random()*6)+1,
        isHeld: false
      }
    ))
  }

  function rollAll(){
    setDieNums((prevDieNums) => (
      prevDieNums.map((prevDieNum) => (
        !prevDieNum.isHeld ? {
          ...prevDieNum,
          randomNumber: Math.floor(Math.random()*6)+1
        }
        : prevDieNum
      ))
    ));
  }

  function hold(id){
    setDieNums((prevDieNums) => (
      prevDieNums.map((dieNum) => (
        {
          ...dieNum,
          isHeld: dieNum.id === id ? !dieNum.isHeld : dieNum.isHeld
        }
      ))
    ))
  }

  const diceComp = dieNums.map((dieNum) => (
    <Dice id={dieNum.id} key={dieNum.id} dieNum = {dieNum.randomNumber} isHeld={dieNum.isHeld} hold={hold}/>
  ))

  return(
    <main className="container">
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <section className='dice-container'>
        {diceComp}
      </section>
      <button className='roll-btn' onClick={rollAll}>Roll</button>
    </main>
  )
}