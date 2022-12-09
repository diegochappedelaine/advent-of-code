import { formatMotions, getNumberOfPositionsVisited } from "./tail-tracker.ts";

const filePath = new URL(".", import.meta.url).pathname + "input.txt";
const input = await Deno.readTextFile(filePath);

// PART 2

const numberOfKnots = 10;

const instructions = input.split("\n");
const motions = formatMotions(instructions);

export const result = getNumberOfPositionsVisited(motions, numberOfKnots);
