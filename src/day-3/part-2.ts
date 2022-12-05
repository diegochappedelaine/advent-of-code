import { priorities } from "./priorities.ts";

const filePath = new URL(".", import.meta.url).pathname + "input.txt";
const input = await Deno.readTextFile(filePath);

// PART 2

type Elf = string;
type ElvesGroup = [Elf, Elf, Elf];
type Badge = string;

const rucksacks: Array<Elf> = input.split("\n");

const groupOfThreeElves: Array<ElvesGroup> = rucksacks.reduce(
  (result: Array<ElvesGroup>, rucksack, index) => {
    const groupIndex = Math.floor(index / 3);
    const group = result[groupIndex] ?? [];
    group.push(rucksack);
    result[groupIndex] = group;
    return result;
  },
  []
);

const uniqueCharacterInElvesGroup = (group: ElvesGroup): Badge => {
  const [first, second, third] = group;
  const firstArray = [...first];
  const secondArray = [...second];
  const thirdArray = [...third];
  const badge =
    firstArray.find(
      (character) =>
        secondArray.includes(character) && thirdArray.includes(character)
    ) ?? -1;
  if (badge === -1) throw new Error("No badge character found");

  return badge;
};

const badges: Array<Badge> = groupOfThreeElves.map(uniqueCharacterInElvesGroup);

const sumOfAllPriorities = badges.reduce(
  (sum, badge) => sum + priorities[badge],
  0
);

export const result = sumOfAllPriorities;
