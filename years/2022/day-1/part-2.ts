import { getElvesWithMostFood, reduceArrayOfNumbers } from "./calorie-counter.ts";

const path = `${import.meta.dir}/input.txt`;
const file = Bun.file(path);
const input = await file.text();

// PART 2

const numberOfElves = 3;

const elves = input.split("\n\n").map((elf) => elf.split("\n").map(Number));

const topThreeElvesFood = getElvesWithMostFood(elves, numberOfElves);

export const result = reduceArrayOfNumbers(topThreeElvesFood);
