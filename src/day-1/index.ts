const filePath = new URL(".", import.meta.url).pathname + "input.txt";
const input = await Deno.readTextFile(filePath);

type Elf = Array<number>;

// PART 1

const elves: Array<Elf> = input
  .split("\n\n")
  .map((elf) => elf.split("\n").map(Number));

const reduceArrayOfNumbers = (array: Array<number>): number =>
  array.reduce((acc, curr) => acc + curr);

const getElfWithMostFood = (
  elvesToCheck: Array<Elf>
): {
  amount: number;
  elfIndex: number;
} =>
  elvesToCheck.reduce(
    (acc, curr, index) => {
      const foodAmount = reduceArrayOfNumbers(curr);

      if (foodAmount > acc.amount) {
        return {
          amount: foodAmount,
          elfIndex: index,
        };
      }

      return acc;
    },
    { amount: 0, elfIndex: 0 }
  );

const { amount } = getElfWithMostFood(elves);

console.log("Part 1:", amount);

// PART 2

const getTopThreeFoodsTotal = (elvesToCheck: Array<Elf>): number => {
  const foodAmounts = elvesToCheck.map(reduceArrayOfNumbers);
  const sorted = foodAmounts.sort((a, b) => b - a);

  return sorted.slice(0, 3).reduce((acc, curr) => {
    return acc + curr;
  }, 0);
};

const topThreeElvesTotalFood = getTopThreeFoodsTotal(elves);

console.log("Part 2:", topThreeElvesTotalFood);
