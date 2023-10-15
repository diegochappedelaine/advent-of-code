import { formatMotions, getNumberOfPositionsVisited } from "./tail-tracker.ts";

const path = `${import.meta.dir}/input.txt`;
const file = Bun.file(path);
const input = await file.text();

// PART 2

const numberOfKnots = 10;

const instructions = input.split("\n");
const motions = formatMotions(instructions);

export const result = getNumberOfPositionsVisited(motions, numberOfKnots);
