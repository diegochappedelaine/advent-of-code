import { Directions, instructions } from "./instructions.ts";

// PART 2

const startingPosition = {
  aim: 0,
  depth: 0,
  horizontal: 0,
};
type Position = typeof startingPosition;

// eslint-disable-next-line array-callback-return
const position: Position = instructions.reduce((position: Position, instruction) => {
  switch (instruction.direction) {
    case Directions.up:
      return { ...position, aim: position.aim - instruction.distance };
    case Directions.down:
      return { ...position, aim: position.aim + instruction.distance };
    case Directions.forward:
      return { ...position, horizontal: position.horizontal + instruction.distance, depth: position.depth + position.aim * instruction.distance };
  }
}, startingPosition);

const finalDepth = position.depth * position.horizontal;

export const result = finalDepth;
