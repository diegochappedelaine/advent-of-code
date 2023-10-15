import { getElvesWithMostFood } from "./calorie-counter.ts";

const path = `${import.meta.dir}/input.txt`;
const file = Bun.file(path);
const input = await file.text();

// PART 1

const elves = input.split("\n\n").map((elf) => elf.split("\n").map(Number));

const elfWithMostFood = getElvesWithMostFood(elves, 1)[0];

export const result = elfWithMostFood;
