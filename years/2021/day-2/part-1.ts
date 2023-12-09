import { Directions, instructions } from "./instructions.ts";

// PART 1

const startingPosition = {
  depth: 0,
  horizontal: 0,
};
type Position = typeof startingPosition;

// eslint-disable-next-line array-callback-return
const position: Position = instructions.reduce((position: Position, instruction) => {
  switch (instruction.direction) {
    case Directions.up:
      return { ...position, depth: position.depth + instruction.distance };
    case Directions.down:
      return { ...position, depth: position.depth - instruction.distance };
    case Directions.forward:
      return { ...position, horizontal: position.horizontal + instruction.distance };
  }
}, startingPosition);

const finalDepth = Math.abs(position.depth * position.horizontal);

export const result = finalDepth;
