import { GameGain, Plays, Resolution, SignValues } from "./rock-paper-scissors.ts";

const path = `${import.meta.dir}/input.txt`;
const file = Bun.file(path);
const input = await file.text();

// PART 1

export const PlaysMap = {
  A: Plays.Rock,
  B: Plays.Paper,
  C: Plays.Scissors,
  X: Plays.Rock,
  Y: Plays.Paper,
  Z: Plays.Scissors,
} as const;
export type Instruction = keyof typeof PlaysMap;

const gameRules = {
  [Plays.Rock]: {
    [Plays.Rock]: Resolution.Draw,
    [Plays.Paper]: Resolution.Win,
    [Plays.Scissors]: Resolution.Lose,
  },
  [Plays.Paper]: {
    [Plays.Rock]: Resolution.Lose,
    [Plays.Paper]: Resolution.Draw,
    [Plays.Scissors]: Resolution.Win,
  },
  [Plays.Scissors]: {
    [Plays.Rock]: Resolution.Win,
    [Plays.Paper]: Resolution.Lose,
    [Plays.Scissors]: Resolution.Draw,
  },
} as const;

type Game = [Instruction, Instruction];
const games = input.split("\n").map((line) => line.split(" ")) as Game[];

let score = 0;

games.forEach(([opponent, me]) => {
  const opponentPlay = PlaysMap[opponent];
  const myPlay = PlaysMap[me];

  const resolution = gameRules[opponentPlay][myPlay];
  const gain = GameGain[resolution];

  score += gain + SignValues[myPlay];
});

export const result = score;
