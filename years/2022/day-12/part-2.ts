import { type Map, type Position, generateMap, getHeight, getMapDimensions, getNeighbors, locationToString } from "./cartography.ts";

const path = `${import.meta.dir}/input.txt`;
const file = Bun.file(path);
const input = await file.text();

const instructions = input.split("\n");

// PART 2

const { end, map, multipleStarts } = generateMap(instructions, true);

const dijkstra = (start: Position, endPositions: Position[], map: Map): number => {
  const mapDimension = getMapDimensions(map);
  const visited: string[] = [];
  const toVisit: Position[] = [start];
  const lowestCost = {
    [locationToString(start)]: 0,
  };

  let currentPosition: Position | undefined;
  while ((currentPosition = toVisit.shift()) != null) {
    const current = locationToString(currentPosition);
    if (visited.includes(current)) continue;

    const currentHeight = getHeight(currentPosition, map);
    const paths = getNeighbors(currentPosition, mapDimension).filter((position: Position) => !visited.includes(locationToString(position)));
    const reachablePaths = paths.filter((position) => getHeight(position, map) + 1 >= currentHeight);

    toVisit.push(...reachablePaths);

    const costToCurrent = lowestCost[current];

    reachablePaths.forEach((pathLocation) => {
      const path = locationToString(pathLocation);

      const newCostToPath = costToCurrent + 1;
      const costToPath = lowestCost[path] ?? newCostToPath;

      if (newCostToPath <= costToPath) {
        lowestCost[path] = newCostToPath;
      }
    });

    visited.push(current);
  }

  const startingCosts = endPositions.map((startPos) => lowestCost[locationToString(startPos)]).filter(Boolean);

  return Math.min(...startingCosts);
};

export const result = dijkstra(end, multipleStarts, map);
