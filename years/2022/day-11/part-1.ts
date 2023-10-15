import { getMonkeys } from "./monkey-operation-setup.ts";
import { parseInstructions, runMonkeyBusiness } from "./stuff-slinging-simian-shenanigans.ts";

const path = `${import.meta.dir}/input.txt`;
const file = Bun.file(path);
const input = await file.text();

// PART 1

const numberOfRounds = 20;
const inspectionRelief = 3;

const instructions = parseInstructions(input);
const monkeys = getMonkeys(instructions);

const monkeyBusinessLevel = runMonkeyBusiness(monkeys, numberOfRounds, {
  type: "stress-relief",
  value: inspectionRelief,
});

export const result = monkeyBusinessLevel;
