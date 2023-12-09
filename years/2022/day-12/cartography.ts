enum Direction {
  Start = "S",
  End = "E",
}

const [lowest, highest] = ["a", "z"];
const starts = [lowest, Direction.Start];
const lowerCaseCharCodeStart = 97;

export type Position = [number, number];
type Dimension = [number, number];

type Point = number;
type Row = Point[];
export type Map = Row[];

export const locationToString = ([row, column]: Position): string => `${row},${column}`;
export const mapLetterToHeight = (char: string): number => char.charCodeAt(0) - lowerCaseCharCodeStart;
export const getMapDimensions = (map: Map): Dimension => [map[0].length, map.length];

export const getHeight = ([row, column]: Position, map: Map): number => map[row][column];
export const getNeighbors = ([row, column]: Position, [mapWidth, mapHeight]: Dimension): Position[] => {
  const left = row > 0 && [row - 1, column];
  const top = column > 0 && [row, column - 1];
  const bottom = row < mapHeight - 1 && [row + 1, column];
  const right = column < mapWidth - 1 && [row, column + 1];
  return [top, right, bottom, left].filter(Boolean) as Position[];
};

export const generateMap = (
  instructions: string[],
  withMultipleStart = false,
): {
  map: Map;
  start: Position;
  end: Position;
  multipleStarts: Position[];
} => {
  const multipleStarts: Position[] = [];
  let start: Position = [-1, -1];
  let end: Position = [-1, -1];

  const map = instructions
    .map((line) => [...line])
    .map((row, rowIndex) =>
      [...row].map((height, columnIndex) => {
        if (height === Direction.End) {
          end = [rowIndex, columnIndex];
          return mapLetterToHeight(highest);
        }
        if (withMultipleStart && starts.includes(height)) {
          multipleStarts.push([rowIndex, columnIndex]);
          return mapLetterToHeight(lowest);
        }
        if (height === Direction.Start) {
          start = [rowIndex, columnIndex];
          return mapLetterToHeight(lowest);
        }
        return mapLetterToHeight(height);
      }),
    );

  if ((start[0] === -1 || start[1] === -1) && multipleStarts.length === 0) throw new Error("No start(s) found");
  if (end[0] === -1 || end[1] === -1) throw new Error("No end found");

  return { map, start, end, multipleStarts };
};
