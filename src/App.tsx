import React, { useContext, useMemo, useState } from 'react';
import {init} from './init'
import {Context} from './context'
import { gameState } from './gameState'

const ICONS = ['fish', 'poop', 'weather']

function App() {
  const { fox,scene, poopBag, modal, dispatch} = useContext(Context)
  const machine = useMemo(() => gameState(dispatch), [])
  useMemo(() => init(machine), [])
  
  const [selectedIcon, setSelectedIcon] = useState(0)
  const goLeft = () => {setSelectedIcon( (2 + selectedIcon)%3 )}
  const goRight = () => {setSelectedIcon( (1 + selectedIcon)%3 )}

  return (
    <div className="container">
    <div className="inner">
      <div className={scene}></div>
      <div className={fox}></div>
      <div className={poopBag}></div>
      <div className="foreground-rain"></div>
      <div className="frame"></div>
      <div className="modal">
        <div className="modal-inner">
          {modal}
        </div>
      </div>
      <div className="buttons">
        <button onClick={goLeft} 
                className={`btn left-btn`}></button>
        <button onClick={() => machine.handleUserAction(ICONS[selectedIcon])} className={`btn middle-btn`}></button>
        <button onClick={goRight}
                className={`btn right-btn`}></button>
      </div>
      <div className="icons">
        <div className={`icon fish-icon     ${ICONS[selectedIcon] === 'fish'? 'highlighted' : ''}`}></div>
        <div className={`icon poop-icon     ${ICONS[selectedIcon] === 'poop'? 'highlighted' : ''}`}></div>
        <div className={`icon weather-icon  ${ICONS[selectedIcon] === 'weather'? 'highlighted' : ''}`}></div>
      </div>
    </div>
  </div>
  );
}

export default App;


// ui 