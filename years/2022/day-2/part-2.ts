import { GameGain, Plays, Resolution, SignValues } from "./rock-paper-scissors.ts";

const filePath = new URL(".", import.meta.url).pathname + "input.txt";
const input = await Deno.readTextFile(filePath);

// PART 2

const PlaysMap = {
  A: Plays.Rock,
  B: Plays.Paper,
  C: Plays.Scissors,
} as const;
type Instruction = keyof typeof PlaysMap;

const ResolutionsMap = {
  X: Resolution.Lose,
  Y: Resolution.Draw,
  Z: Resolution.Win,
} as const;
type ResolutionType = keyof typeof ResolutionsMap;

const gameRules = {
  [Plays.Rock]: {
    [Resolution.Lose]: Plays.Scissors,
    [Resolution.Draw]: Plays.Rock,
    [Resolution.Win]: Plays.Paper,
  },
  [Plays.Paper]: {
    [Resolution.Lose]: Plays.Rock,
    [Resolution.Draw]: Plays.Paper,
    [Resolution.Win]: Plays.Scissors,
  },
  [Plays.Scissors]: {
    [Resolution.Lose]: Plays.Paper,
    [Resolution.Draw]: Plays.Scissors,
    [Resolution.Win]: Plays.Rock,
  },
} as const;

type Game = [Instruction, ResolutionType];
const games = input.split("\n").map((line) => line.split(" ")) as Array<Game>;

let score = 0;

games.forEach(([opponent, me]) => {
  const opponentPlay = PlaysMap[opponent];
  const resolutionInstruction = ResolutionsMap[me];

  const myPlay = gameRules[opponentPlay][resolutionInstruction];
  const gain = GameGain[resolutionInstruction];

  score += gain + SignValues[myPlay];
});

export const result = score;
