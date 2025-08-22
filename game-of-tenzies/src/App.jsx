import './App.css'
import { useEffect, useState } from 'react'
import Dice from './components/Dice'
import {nanoid} from 'nanoid'
import {useWindowSize} from 'react-use'
import { useRef } from 'react'
import Confetti from 'react-confetti'

export default function App(){

  const[dieNums, setDieNums] = useState(() => generateAllNewDice());
  const button = useRef(null);
  const gameWon = (
    dieNums.every((dieNum) => dieNum.isHeld) &&
    dieNums.every((dieNum) => dieNum.randomNumber === dieNums[0].randomNumber)
  );
  
  useEffect(() => {
    if(gameWon)
      button.current.focus()
  },[gameWon])
  

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
    if(gameWon){
      setDieNums(generateAllNewDice());
    }
    else{
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
  }

  const {width, height} = useWindowSize();

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
      {gameWon && <Confetti width={width} height = {height}/>}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <section className='dice-container'>
        {diceComp}
      </section>
      <button ref={button} className='roll-btn' onClick={rollAll}>{gameWon ? "New game" : "Roll"}</button>
    </main>
  )
}