const filePath = new URL(".", import.meta.url).pathname + "input.txt";
const input = await Deno.readTextFile(filePath);

// PART 1

type Elf = Array<number>;

const elves: Array<Elf> = input.split("\n\n").map((elf) => elf.split("\n").map(Number));

const reduceArrayOfNumbers = (array: Array<number>): number => array.reduce((acc, curr) => acc + curr);

const getTopFood = (elvesToCheck: Array<Elf>): number => {
  const foodAmounts = elvesToCheck.map(reduceArrayOfNumbers);
  const sorted = foodAmounts.sort((a, b) => b - a);

  return sorted[0];
};

const amount = getTopFood(elves);

export const result = amount;
