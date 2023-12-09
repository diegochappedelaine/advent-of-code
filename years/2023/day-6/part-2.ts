import type { Race } from "./button-holder";
import { getWinningHoldDurationsCount } from "./button-holder";

const path = `${import.meta.dir}/input.txt`;
const file = Bun.file(path);
const input = await file.text();

const lines = input.split("\n");

// PART 2

const getRace = (input: string[]): Race => {
  const time = input[0].replace(/\D+/g, "");
  const distance = input[1].replace(/\D+/g, "");

  return {
    time: Number(time),
    distance: Number(distance),
  };
};

const race = getRace(lines);

const winningHoldDurations = getWinningHoldDurationsCount(race);

export const result = winningHoldDurations;
