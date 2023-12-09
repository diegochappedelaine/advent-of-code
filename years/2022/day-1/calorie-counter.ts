type Inventory = number[];

export const reduceArrayOfNumbers = (array: Inventory): number => array.reduce((acc, curr) => acc + curr);

export const getElvesWithMostFood = (elvesToCheck: Inventory[], numberOfElvesWanted: number): number[] => {
  const foodAmounts = elvesToCheck.map(reduceArrayOfNumbers);
  const sorted = foodAmounts.sort((a, b) => b - a);

  return sorted.slice(0, numberOfElvesWanted);
};
