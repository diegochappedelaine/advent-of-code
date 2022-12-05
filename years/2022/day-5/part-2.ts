import { type Instruction, type Stacks, instructions, stacks } from "./matrix.ts";

// PART 2

const runCrateMover9001 = (stacksToUpdate: Stacks, instructions: Array<Instruction>): Stacks => {
  const updatedStacks = { ...stacksToUpdate };

  instructions.forEach(({ from, numberOfCrateToMove, to }) => {
    const stack = updatedStacks[from];
    const cratesToMove = stack.slice(-numberOfCrateToMove);

    const remaining = stack.slice(0, -numberOfCrateToMove);
    const newColumn = updatedStacks[to] + cratesToMove;

    updatedStacks[from] = remaining;
    updatedStacks[to] = newColumn;
  });

  return updatedStacks;
};

const updatedStacks = runCrateMover9001(stacks, instructions);

const craneAtTopOfEachStack = Object.values(updatedStacks)
  .map((stack) => stack.slice(-1))
  .join("");

export const result = craneAtTopOfEachStack;
