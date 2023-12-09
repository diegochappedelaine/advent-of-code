export enum Command {
  Noop = "noop",
  Add = "addx",
}

interface Add {
  type: Command.Add;
  value: number;
}
interface Noop {
  type: Command.Noop;
}

type Instruction = Add | Noop;
export type Instructions = Instruction[];

const makeNoopInstruction = (): Noop => ({
  type: Command.Noop,
});

const makeAddInstruction = (value: number): Add => ({
  type: Command.Add,
  value,
});

export const makeInstruction = (line: string): Instruction => {
  const [instruction, value] = line.split(" ");
  if (instruction === Command.Noop) return makeNoopInstruction();
  if (instruction === Command.Add) return makeAddInstruction(Number(value));
  throw new Error("Invalid instruction");
};
