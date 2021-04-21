import { AdjustmentAction } from "./context";

const RAIN_CHANCE = 0.5;
const SCENE = ["day", "rain"];
const DAY_LENGTH = 16;
const NIGHT_LENGTH = 3;

export type gameStateType = {
  current:
    | "INIT"
    | "HATCHING"
    | "IDLING"
    | "FEEDING"
    | "SLEEPING"
    | "EATING"
    | "POOPING"
    | "HUNGRY"
    | "CELEBRATING"
    | "DEAD";
  clock: number;
  scene : number;
  sleepTime: number;
  wakeTime: number;
  hungryTime: number;
  timeToStartCelebrating: number;
  timeToEndCelebrating: number;
  dieTime: number;
  poopTime: number;
  tick: () => number;
  startGame: () => void;
  handleUserAction: (icon: string) => void;
  wake: () => void;
  changeWeather: () => void;
  cleanUpPoop: () => void;
  feed: () => void;
  sleep: () => void;
  getHungry: () => void;
  die: () => void;
  determineFoxState: () => void;
  startCelebrating: () => void;
  endCelebrating: () => void;
};

export function gameState(
  dispatch: React.Dispatch<AdjustmentAction>
): gameStateType {
  return {
    current: "INIT",
    clock: 1,
    scene: -1,
    wakeTime: -1,
    sleepTime: -1,
    hungryTime: -1,
    dieTime: -1,
    timeToStartCelebrating: -1,
    timeToEndCelebrating: -1,
    poopTime: -1,
    tick() {
      this.clock++;
      console.log("clock", this.clock);
      if (this.clock === this.wakeTime) {
        this.wake();
      } else if (this.clock === this.sleepTime) {
        this.sleep();
      } else if (this.clock === this.hungryTime) {
        this.getHungry();
      } else if (this.clock === this.dieTime) {
        this.die();
      } else if (this.clock === this.timeToStartCelebrating) {
        this.startCelebrating();
      } else if (this.clock === this.timeToEndCelebrating) {
        this.endCelebrating();
      }
      return this.clock;
    },
    startGame() {
      console.log("hatching");
      this.current = "HATCHING";
      this.wakeTime = this.clock + 3;

      dispatch({ type: "FOX", payload: "egg" });
      dispatch({ type: "SCENE", payload: "day" });
    },
    wake() {
      console.log("awoken");
      this.current = "IDLING";
      this.wakeTime = -1;

      this.scene = Math.random() > RAIN_CHANCE ? 0 : 1;
      dispatch({ type: "SCENE", payload: SCENE[this.scene] });

      this.sleepTime = this.clock + DAY_LENGTH;
      this.hungryTime = getNextHungerTime(this.clock);
      this.determineFoxState();
    },
    sleep() {
      this.current = "SLEEPING";
      dispatch({ type: "FOX", payload: "sleep" });
      dispatch({ type: "SCENE", payload: "night" });
      this.wakeTime = this.clock + NIGHT_LENGTH;
    },
    getHungry() {
      this.current = "HUNGRY";
      this.dieTime = getNextDieTime(this.clock);
      this.hungryTime = -1;
      dispatch({ type: "FOX", payload: "hungry" });
    },
    die() {
      console.log("die");
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
      if (this.current !== "HUNGRY") {
        return;
      }
      this.current = "FEEDING";
      this.dieTime = -1;
      this.poopTime = getNexTPoopTime(this.clock);
      dispatch({ type: "FOX", payload: "eating" });
      this.timeToStartCelebrating = this.clock + 2;
      console.log('feed');
    },

    determineFoxState() {
      if (this.current === "IDLING") {
        if (SCENE[this.scene] === "rain") {
          dispatch({ type: "FOX", payload: "rain" });
        } else {
          dispatch({ type: "FOX", payload: "idling" });
        }
      }
    },

    startCelebrating() {
      this.current = "CELEBRATING";
      dispatch({ type: "FOX", payload: "celebrate" });
      this.timeToStartCelebrating = -1;
      this.timeToEndCelebrating = this.clock + 2;
    },
    endCelebrating() {
      this.timeToEndCelebrating = -1;
      this.current = "IDLING";
      this.determineFoxState();
    },
  };
}

function getNextHungerTime(clock: number) {
  return Math.floor(Math.random() * 3) + 5 + clock;
}
const getNextDieTime = (clock: number) =>
  Math.floor(Math.random() * 3) + 5 + clock;
const getNexTPoopTime = (clock: number) =>
  Math.floor(Math.random() * 3) + 4 + clock;
