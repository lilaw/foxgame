type gameState = {
  current: string;
  clock: number;
  tick: () => number;
}

export const gameState: gameState = {
  current: 'INIT',
  clock: 1,
  tick() {
    this.clock++;
    console.log('clock', this.clock);
    return this.clock;
  }
}
