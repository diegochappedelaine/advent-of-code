type Inventory = Array<number>;

export const reduceArrayOfNumbers = (array: Inventory): number => array.reduce((acc, curr) => acc + curr);

export const getElvesWithMostFood = (elvesToCheck: Array<Inventory>, numberOfElvesWanted: number): Array<number> => {
  const foodAmounts = elvesToCheck.map(reduceArrayOfNumbers);
  const sorted = foodAmounts.sort((a, b) => b - a);

  return sorted.slice(0, numberOfElvesWanted);
};
