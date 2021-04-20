type gameStateType = {
  current: string;
  clock: number;
  tick: () => number;
}

export const gameState: gameStateType = {
  current: 'INIT',
  clock: 1,
  tick() {
    this.clock++;
    console.log('clock', this.clock);
    return this.clock;
  }
}
