import { priorities } from "./priorities.ts";

const path = `${import.meta.dir}/input.txt`;
const file = Bun.file(path);
const input = await file.text();

// PART 2

type Elf = string;
type ElvesGroup = [Elf, Elf, Elf];
type Badge = string;

const rucksacks: Elf[] = input.split("\n");

const groupOfThreeElves: ElvesGroup[] = rucksacks.reduce((result: ElvesGroup[], rucksack, index) => {
  const groupIndex = Math.floor(index / 3);
  const group = result[groupIndex] ?? [];
  group.push(rucksack);
  result[groupIndex] = group;
  return result;
}, []);

const uniqueCharacterInElvesGroup = (group: ElvesGroup): Badge => {
  const [first, second, third] = group;
  const firstArray = [...first];
  const secondArray = [...second];
  const thirdArray = [...third];
  const badge = firstArray.find((character) => secondArray.includes(character) && thirdArray.includes(character)) ?? -1;
  if (badge === -1) throw new Error("No badge character found");

  return badge;
};

const badges: Badge[] = groupOfThreeElves.map(uniqueCharacterInElvesGroup);

const sumOfAllPriorities = badges.reduce((sum, badge) => sum + priorities[badge], 0);

export const result = sumOfAllPriorities;
