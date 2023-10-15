import { priorities } from "./priorities.ts";

const path = `${import.meta.dir}/input.txt`;
const file = Bun.file(path);
const input = await file.text();

// PART 1

type RucksackContent = string;
type Compartment = string;
type RucksackType = string;
type Priority = string;

const rucksacks: Array<RucksackContent> = input.split("\n");

const splitRucksackInTwo = (string: RucksackContent): [Compartment, Compartment] => {
  const middle = Math.floor(string.length / 2);
  return [string.slice(0, middle), string.slice(middle)];
};

const uniqueCharacterInRucksacks = (first: Compartment, second: Compartment): RucksackType | -1 => {
  const firstArray = [...first];
  const secondArray = [...second];
  return firstArray.find((character) => secondArray.includes(character)) ?? -1;
};

const types: Array<Priority> = rucksacks.map((rucksack) => {
  const [first, second] = splitRucksackInTwo(rucksack);
  const type = uniqueCharacterInRucksacks(first, second);
  if (type === -1) throw new Error("Rucksack has no type");

  return type;
});

const sumOfAllPriorities = types.reduce((sum, type) => sum + priorities[type], 0);

export const result = sumOfAllPriorities;
