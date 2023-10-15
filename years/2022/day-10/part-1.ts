import { type Instructions, Command, makeInstruction } from "./crt-tooling.ts";

const path = `${import.meta.dir}/input.txt`;
const file = Bun.file(path);
const input = await file.text();

// PART 1

const instructions = input.split("\n").map(makeInstruction);

const cyclesToReport = [20, 60, 100, 140, 180, 220];

const shouldReport = (cycle: number): boolean => cyclesToReport.includes(cycle);

const getSumOfSignalStrengths = (instructions: Instructions): number => {
  const report: Array<number> = [];
  let cycle = 0;
  let registerX = 1;

  const executeCycle = () => {
    cycle += 1;
    if (shouldReport(cycle)) report.push(registerX * cycle);
  };

  for (const instruction of instructions) {
    if (instruction.type === Command.Noop) {
      executeCycle();
    }
    if (instruction.type === Command.Add) {
      executeCycle();
      executeCycle();
      registerX += instruction.value;
    }
  }

  return report.reduce((acc, value) => acc + value, 0);
};

const sumOfSignalStrengths = getSumOfSignalStrengths(instructions);

export const result = sumOfSignalStrengths;
