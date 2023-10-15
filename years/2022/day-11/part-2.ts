import { type Monkey, getMonkeys } from "./monkey-operation-setup.ts";
import { parseInstructions, runMonkeyBusiness } from "./stuff-slinging-simian-shenanigans.ts";

const path = `${import.meta.dir}/input.txt`;
const file = Bun.file(path);
const input = await file.text();

// PART 2

const numberOfRounds = 10_000;

const manageWorryLevelModulus = (monkeys: Array<Monkey>) => monkeys.map(({ test: { value } }) => value).reduce((a, b) => a * b, 1);

const instructions = parseInstructions(input);
const monkeys = getMonkeys(instructions);
const worryLevelModulus = manageWorryLevelModulus([...monkeys.values()]);

const monkeyBusinessLevel = runMonkeyBusiness(monkeys, numberOfRounds, {
  type: "no-stress-relief",
  modulus: worryLevelModulus,
});

export const result = monkeyBusinessLevel;
