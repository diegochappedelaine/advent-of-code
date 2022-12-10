import { getElvesWithMostFood } from "./calorie-counter.ts";

const filePath = new URL(".", import.meta.url).pathname + "input.txt";
const input = await Deno.readTextFile(filePath);

// PART 1

const elves = input.split("\n\n").map((elf) => elf.split("\n").map(Number));

const elfWithMostFood = getElvesWithMostFood(elves, 1)[0];

export const result = elfWithMostFood;
