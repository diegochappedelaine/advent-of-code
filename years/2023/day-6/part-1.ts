import type { Races } from "./button-holder";
import { getWinningHoldDurationsCount } from "./button-holder";

const path = `${import.meta.dir}/input.txt`;
const file = Bun.file(path);
const input = await file.text();

const lines = input.split("\n");

// PART 1

const getRaces = (input: string[]): Races => {
  const timeValues = input[0].trim().split(/\s+/).slice(1).map(Number);
  const distanceValues = input[1].trim().split(/\s+/).slice(1).map(Number);

  return timeValues.map((time, index) => ({
    time,
    distance: distanceValues[index],
  }));
};

const races = getRaces(lines);

const winningHoldDurations = races.map(getWinningHoldDurationsCount);

const product = winningHoldDurations.reduce((acc, value) => acc * value, 1);

export const result = product;
