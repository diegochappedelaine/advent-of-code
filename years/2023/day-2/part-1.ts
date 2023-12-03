import { type Cubes, parseGameReports } from "./bag-parser";

const path = `${import.meta.dir}/input.txt`;
const file = Bun.file(path);
const input = await file.text();

// PART 1

const gameReports = input.split("\n");

const games = parseGameReports(gameReports);

const getPossibleGamesIds = (bag: Cubes) =>
  games
    .filter(({ gameBag }) => {
      const { red, blue, green } = gameBag;

      return red <= bag.red && blue <= bag.blue && green <= bag.green;
    })
    .map(({ id }) => id);

const possibleGames = getPossibleGamesIds({
  red: 12,
  green: 13,
  blue: 14,
});

const sumOfPossibleGamesIds = possibleGames.reduce((acc, id) => acc + id, 0);

export const result = sumOfPossibleGamesIds;
