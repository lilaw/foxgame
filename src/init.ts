import {gameState, gameStateType} from './gameState'

const TICK_RATE = 2000;

function tick() {
  console.log('tick', Date.now())
}

function init(gameState: gameStateType): void  {
  console.log('start game')
  
  let nextTimeToTick = Date.now()

  function nextAnimationFrame() {
    const now = Date.now()

    if (nextTimeToTick <= now) {
      gameState.tick()
      nextTimeToTick = now + TICK_RATE
    }
    requestAnimationFrame(nextAnimationFrame)
    
  }
  requestAnimationFrame(nextAnimationFrame)
}

export {init}









export {}