enum Directions {
  Right = "R",
  Down = "D",
  Left = "L",
  Up = "U",
}
interface Motion {
  direction: Directions;
  distance: number;
}
type Motions = Motion[];

interface Position {
  x: number;
  y: number;
}
type Positions = Position[];

type TailPosition = `${string}-${string}`;

export const formatMotions = (input: string[]): Motions =>
  input.map((motion) => {
    const [direction, distance] = motion.split(" ");
    return {
      direction,
      distance: Number(distance),
    };
  }) as Motions;

const generatePositions = (numberOfKnots: number): Positions =>
  Array.from({ length: numberOfKnots }, () => ({
    x: 0,
    y: 0,
  }));

const getDistance = (direction: "horizontal" | "vertical", currentPosition: Position, nextPosition: Position): number | undefined => {
  if (direction === "horizontal") return Math.abs(currentPosition.x - nextPosition.x);
  if (direction === "vertical") return Math.abs(currentPosition.y - nextPosition.y);
};

const getMovementInstructions = (
  horizontalDistance: number,
  verticalDistance: number,
): {
  shouldMoveHorizontally: boolean;
  shouldMoveVertically: boolean;
} => {
  const shouldMoveInDiagonal = horizontalDistance !== 0 && verticalDistance !== 0 && (horizontalDistance > 1 || verticalDistance > 1);
  const shouldMoveHorizontally = verticalDistance === 0 && horizontalDistance > 1;
  const shouldMoveVertically = horizontalDistance === 0 && verticalDistance > 1;

  return {
    shouldMoveHorizontally: shouldMoveHorizontally || shouldMoveInDiagonal,
    shouldMoveVertically: shouldMoveVertically || shouldMoveInDiagonal,
  };
};

const followHead = (index: number, positions: Positions): void => {
  const currentPosition = positions[index];
  const nextPosition = positions[index + 1];

  const horizontalDistance = getDistance("horizontal", currentPosition, nextPosition) ?? 0;
  const verticalDistance = getDistance("vertical", currentPosition, nextPosition) ?? 0;

  const { shouldMoveHorizontally, shouldMoveVertically } = getMovementInstructions(horizontalDistance, verticalDistance);

  if (shouldMoveHorizontally) {
    const movement = currentPosition.x > nextPosition.x ? 1 : -1;
    nextPosition.x += movement;
  }
  if (shouldMoveVertically) {
    const movement = currentPosition.y > nextPosition.y ? 1 : -1;
    nextPosition.y += movement;
  }
};

export const getNumberOfPositionsVisited = (motions: Motions, numberOfKnots: number): number => {
  const positions = generatePositions(numberOfKnots);
  const tail = positions[numberOfKnots - 1];

  const tailPositions = motions.reduce((tailPositions, { direction, distance }) => {
    for (let index = 0; index < distance; index++) {
      const instructions = {
        [Directions.Right]: () => positions[0].x++,
        [Directions.Down]: () => positions[0].y--,
        [Directions.Left]: () => positions[0].x--,
        [Directions.Up]: () => positions[0].y++,
      };

      instructions[direction]();

      for (let index = 0; index < numberOfKnots - 1; index++) {
        followHead(index, positions);
      }

      const tailPosition = `${tail.x}-${tail.y}` as const;
      tailPositions.add(tailPosition);
    }

    return tailPositions;
  }, new Set<TailPosition>());

  return tailPositions.size;
};
