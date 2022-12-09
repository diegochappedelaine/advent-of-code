export type Grid = string[];
export type Trees = number[];

type TreePosition = {
  rowIndex: number;
  columnIndex: number;
  indexInRow: number;
};
type MapDimensions = {
  width: number;
  height: number;
};

export const getMapDimensions = (grid: Grid): MapDimensions => ({
  height: grid.length,
  width: grid[0].length,
});

const getRowIndex = (treeIndex: number, map: MapDimensions): number => Math.floor(treeIndex / map.width);
const getColumnIndex = (treeIndex: number, map: MapDimensions): number => treeIndex % map.width;

export const getRow = (rowIndex: number, grid: Grid): Trees => grid[rowIndex].split("").map(Number);
export const getColumn = (columnIndex: number, grid: Grid): Trees => grid.map((row) => row[columnIndex]).map(Number);

export const getTreePosition = (treeIndex: number, map: MapDimensions): TreePosition => {
  const rowIndex = getRowIndex(treeIndex, map);
  const columnIndex = getColumnIndex(treeIndex, map);
  const indexInRow = treeIndex % map.width;

  return { columnIndex, indexInRow, rowIndex };
};
