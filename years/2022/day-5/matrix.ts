const filePath = new URL(".", import.meta.url).pathname + "input.txt";
const input = await Deno.readTextFile(filePath);

// Input parsing

const rows = input.split("\n");
const separationIndex = rows.indexOf("");
const matrix = rows.slice(0, separationIndex - 1);
const unparsedInstructions = rows.slice(separationIndex + 1);

// Instructions parsing

export type Instruction = {
  from: number;
  numberOfCrateToMove: number;
  to: number;
};
export const instructions: Array<Instruction> = unparsedInstructions.map((instruction) => {
  const [_, numberOfCrateToMove, __, from, ___, to] = instruction.split(" ");

  return { from: +from, numberOfCrateToMove: +numberOfCrateToMove, to: +to };
});

/*
  Matrix parsing

  Input matrix:

  |   | D |   |
  | N | C |   |
  | Z | M | P |

  Output stacks:

  1 = "ZN"
  2 = "MCD"
  3 = "P"
*/

type Stack = string;
export type Stacks = Record<number, Stack>;
const emptyCrate = " ";
const crateMatrix = matrix.map((row) => [...row].filter((_, index) => (index - 1) % 4 === 0));

export const stacks = crateMatrix.reduce((acc: Stacks, row) => {
  row.forEach((crate, index) => {
    if (crate === emptyCrate) return;
    const stackIndex = index + 1;
    const stack = acc[stackIndex] ?? "";

    acc[stackIndex] = crate + stack;
  });

  return acc;
}, {});
