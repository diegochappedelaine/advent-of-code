import { getMonkeys } from "./monkey-operation-setup.ts";
import { parseInstructions, runMonkeyBusiness } from "./stuff-slinging-simian-shenanigans.ts";

const filePath = new URL(".", import.meta.url).pathname + "input.txt";
const input = await Deno.readTextFile(filePath);

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
