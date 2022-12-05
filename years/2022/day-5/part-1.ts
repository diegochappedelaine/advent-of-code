import { type Instruction, type Stacks, instructions, stacks } from "./matrix.ts";

const reverseString = (string: string): string => string.split("").reverse().join("");

// PART 1

const runCrateMover9000 = (stacksToUpdate: Stacks, instructions: Array<Instruction>): Stacks => {
  const updatedStacks = { ...stacksToUpdate };

  instructions.forEach(({ from, numberOfCrateToMove, to }) => {
    const stack = updatedStacks[from];
    const cratesToMove = reverseString(stack.slice(-numberOfCrateToMove));

    const remaining = stack.slice(0, -numberOfCrateToMove);
    const newColumn = updatedStacks[to] + cratesToMove;

    updatedStacks[from] = remaining;
    updatedStacks[to] = newColumn;
  });

  return updatedStacks;
};

const updatedStacks = runCrateMover9000(stacks, instructions);

const craneAtTopOfEachStack = Object.values(updatedStacks)
  .map((stack) => stack.slice(-1))
  .join("");

export const result = craneAtTopOfEachStack;
