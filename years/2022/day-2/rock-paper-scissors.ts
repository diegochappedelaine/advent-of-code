export enum Plays {
  Rock,
  Paper,
  Scissors,
}

export enum Resolution {
  Lose,
  Draw,
  Win,
}

export const GameGain = {
  [Resolution.Win]: 6,
  [Resolution.Draw]: 3,
  [Resolution.Lose]: 0,
} as const;
export const SignValues = {
  [Plays.Rock]: 1,
  [Plays.Paper]: 2,
  [Plays.Scissors]: 3,
} as const;
