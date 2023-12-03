import { parseGameReports } from "./bag-parser";

const path = `${import.meta.dir}/input.txt`;
const file = Bun.file(path);
const input = await file.text();

// PART 2

const gameReports = input.split("\n");

const games = parseGameReports(gameReports);

const bagPower = games.map(({ gameBag: { red, blue, green } }) => red * blue * green);

const bagPowerSum = bagPower.reduce((acc, curr) => acc + curr, 0);

export const result = bagPowerSum;
