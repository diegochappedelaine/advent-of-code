const filePath = new URL(".", import.meta.url).pathname + "input.txt";
const input = await Deno.readTextFile(filePath);

// PART 2

type Elf = Array<number>;

const elves: Array<Elf> = input
  .split("\n\n")
  .map((elf) => elf.split("\n").map(Number));

const reduceArrayOfNumbers = (array: Array<number>): number =>
  array.reduce((acc, curr) => acc + curr);

const getTopThreeFoodsTotal = (elvesToCheck: Array<Elf>): number => {
  const foodAmounts = elvesToCheck.map(reduceArrayOfNumbers);
  const sorted = foodAmounts.sort((a, b) => b - a);

  return sorted.slice(0, 3).reduce((acc, curr) => {
    return acc + curr;
  }, 0);
};

const topThreeElvesTotalFood = getTopThreeFoodsTotal(elves);

export const result = topThreeElvesTotalFood;
