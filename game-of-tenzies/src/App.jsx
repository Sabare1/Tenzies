import './App.css'
import { useState } from 'react'
import Dice from './components/Dice'

export default function App(){

  const[dieNums, setDieNums] = useState(generateAllNewDice());

  function generateAllNewDice(){
    return new Array(10).fill(0).map(() => (Math.floor(Math.random()*6)+1))
  }

  const diceComp = dieNums.map((dieNum) => (
    <Dice dieNum = {dieNum}/>
  ))

  return(
    <main className="container">
      <section className='dice-container'>
        {diceComp}
      </section>
    </main>
  )
}