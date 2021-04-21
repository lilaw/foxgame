import * as React from 'react'

type GameType = {
  fox: string;
  scene: string;
  poopBag: string;
  modal: string;
}
type GameContextType = GameType & {dispatch: React.Dispatch<AdjustmentAction>}
const initGame: GameType = {
  fox: 'fox hidden',
  scene: 'game day',
  poopBag: '.poop-bag',
  modal: ''
}
export type AdjustmentAction = {
  type: 'FOX' | 'SCENE' | 'POOPBAG' | 'MODAL';
  payload: string;
};

const reducer = (
  state: GameType,
  action: AdjustmentAction
): GameType => {
  if (action.type === 'FOX') {
    return { ...state, fox: `fox fox-${action.payload}`};
  }

  if (action.type === 'SCENE') {
    return { ...state, scene: `game ${action.payload}` };
  }

  if (action.type === 'POOPBAG') {
    return { ...state, poopBag: `.poop-bag ${action.payload}` };
  }
  if (action.type === 'MODAL') {
    return { ...state, modal: action.payload }
  }

  return state;
};


export const Context = React.createContext<GameContextType>(initGame as GameContextType);
export const GameContextProvider = ({children} : {children: React.ReactNode}): JSX.Element => {     
  const [gameState, dispatch] = React.useReducer(reducer, initGame)
  return <Context.Provider value={{...gameState, dispatch}}>{children}</Context.Provider>
}