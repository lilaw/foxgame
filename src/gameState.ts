import {AdjustmentAction} from './context'

const RAIN_CHANCE = 0.5
const SCENE = ["day", 'rain']
const DAY_LENGTH = 60
const NIGHT_LENGTH = 3


export type gameStateType = {
  current:
    | "INIT"
    | "HATCHING"
    | "IDLING"
    | "SLEEPING"
    | "EATING"
    | "POOPING"
    | "HUNGRY"
    | "CELEBRATING"
    | "DEAD";
  clock: number;
  wakeTime: number;
  tick: () => number;
  startGame: () => void;
  handleUserAction: (icon: string) => void;
  wake: () => void;
  changeWeather: () => void;
  cleanUpPoop: () => void;
  feed: () => void;
};



export function gameState(
  dispatch: React.Dispatch<AdjustmentAction>
): gameStateType {
  return {
    current: "INIT",
    clock: 1,
    wakeTime: -1,
    tick() {
      this.clock++;
      console.log("clock", this.clock);
      if (this.clock === this.wakeTime) {
        this.wake();
      }
      return this.clock;
    },
    startGame() {
      console.log("hatching");
      this.current = "HATCHING";
      this.wakeTime = this.clock + 3;

      dispatch({type: 'FOX', payload: 'egg'})
      dispatch({type: 'SCENE', payload: 'day'})
    },
    wake() {
      console.log("awoken");
      this.current = "IDLING";
      this.wakeTime = -1;
      
      dispatch({type: 'FOX', payload: 'idling'})
      const scene = Math.random() > RAIN_CHANCE ? 0 : 1
      dispatch({type: 'SCENE', payload: SCENE[scene]})
    },
    handleUserAction(icon: string) {
      console.log("handleUserAction");
      if (
        ["SLEEP", "FEEDING", "CELEBRATING", "HATCHING"].includes(this.current)
      )
        return;

      if (this.current === "INIT" || this.current === "DEAD") {
        this.startGame();
        return;
      }
      switch (icon) {
        case "weather":
          this.changeWeather();
          break;
        case "poop":
          this.cleanUpPoop();
          break;
        case "fish":
          this.feed();
          break;
      }
    },
    changeWeather() {
      console.log();
    },
    cleanUpPoop() {
      console.log();
    },
    feed() {
      console.log();
    },
  };
}

