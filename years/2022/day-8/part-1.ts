import { type Grid, type Trees, getMapDimensions, getTreePosition, getRow, getColumn } from "./lumberjack-utils.ts";

const path = `${import.meta.dir}/input.txt`;
const file = Bun.file(path);
const input = await file.text();

// PART 1

const grid = input.split("\n");

const isVisibleInItsLine = (treeIndex: number, trees: Trees): boolean => {
  const treeSize = trees[treeIndex];

  const leftSide = trees.slice(0, treeIndex);
  const rightSide = trees.slice(treeIndex + 1);

  return leftSide.every((tree) => tree < treeSize) || rightSide.every((tree) => tree < treeSize);
};

const getNumberOfVisibleTrees = (grid: Grid): number => {
  const map = getMapDimensions(grid);
  const flatMap = grid.flatMap((row) => row.split(""));

  return flatMap.reduce((visibleTreeCount, _, index) => {
    const { columnIndex, indexInRow, rowIndex } = getTreePosition(index, map);

    const row = getRow(rowIndex, grid);
    const column = getColumn(columnIndex, grid);

    if (isVisibleInItsLine(indexInRow, row) || isVisibleInItsLine(rowIndex, column)) {
      return visibleTreeCount + 1;
    }
    return visibleTreeCount;
  }, 0);
};

export const result = getNumberOfVisibleTrees(grid);
