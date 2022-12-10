import { getElvesWithMostFood, reduceArrayOfNumbers } from "./calorie-counter.ts";

const filePath = new URL(".", import.meta.url).pathname + "input.txt";
const input = await Deno.readTextFile(filePath);

// PART 2

const numberOfElves = 3;

const elves = input.split("\n\n").map((elf) => elf.split("\n").map(Number));

const topThreeElvesFood = getElvesWithMostFood(elves, numberOfElves);

export const result = reduceArrayOfNumbers(topThreeElvesFood);
