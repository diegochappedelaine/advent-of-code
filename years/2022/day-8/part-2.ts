import { type Grid, type Trees, getMapDimensions, getTreePosition, getRow, getColumn } from "./lumberjack-utils.ts";

const filePath = new URL(".", import.meta.url).pathname + "input.txt";
const input = await Deno.readTextFile(filePath);

// PART 2

const grid = input.split("\n");

type Views = {
  left: Trees;
  right: Trees;
  top: Trees;
  bottom: Trees;
};

const getViews = (row: Trees, indexInRow: number, column: Trees, rowIndex: number): Views => {
  const left = row.slice(0, indexInRow).reverse();
  const right = row.slice(indexInRow + 1);
  const top = column.slice(0, rowIndex).reverse();
  const bottom = column.slice(rowIndex + 1);

  return { left, right, top, bottom };
};

const lengthOfLineOfSight = (maxTreeHeight: number, trees: number[]): number => {
  const index = trees.findIndex((tree) => tree >= maxTreeHeight);
  return index === -1 ? trees.length : index + 1;
};

const getScenicScore = (grid: Grid): number => {
  const map = getMapDimensions(grid);
  const flatMap = grid.flatMap((row) => row.split(""));

  return flatMap.reduce((maxScenicScore, _, index) => {
    const { columnIndex, indexInRow, rowIndex } = getTreePosition(index, map);

    const row = getRow(rowIndex, grid);
    const column = getColumn(columnIndex, grid);
    const treeHeight = +grid[rowIndex][columnIndex];

    const { left, right, top, bottom } = getViews(row, indexInRow, column, rowIndex);

    const currentScenicScore = lengthOfLineOfSight(treeHeight, left) * lengthOfLineOfSight(treeHeight, right) * lengthOfLineOfSight(treeHeight, top) * lengthOfLineOfSight(treeHeight, bottom);

    return Math.max(maxScenicScore, currentScenicScore);
  }, 0);
};

export const result = getScenicScore(grid);
