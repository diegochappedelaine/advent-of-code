import { parseTable } from "./card-parser";
import type { Card } from "./card-parser";

const path = `${import.meta.dir}/input.txt`;
const file = Bun.file(path);
const input = await file.text();

const table = input.split("\n");

// PART 1

const parsedTable = table.map(parseTable);

const getCardWinnings = ({ winningNumbers, selectedNumbers }: Card): number =>
  winningNumbers.reduce((acc, number) => {
    if (selectedNumbers.includes(number)) {
      if (acc === 0) return 1;
      return acc * 2;
    }

    return acc;
  }, 0);

const scores = parsedTable.map(getCardWinnings);
const score = scores.reduce((acc, score) => acc + score, 0);

export const result = score;
