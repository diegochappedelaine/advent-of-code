const filePath = new URL(".", import.meta.url).pathname + "input.txt";
const input = await Deno.readTextFile(filePath);

type Report = Array<number>;
const slidingWindow = 3;

const sumOfNumbers = (array: Array<number>): number => array.reduce((acc, curr) => acc + curr);

const depthReport = input.split("\n").map(Number);

// PART 2

const getMeasurementsSlidingWindowLargerThenPreviousOne = (report: Report) => {
  let counter = 0;
  let previousSum = 0;

  for (let i = 0; i < report.length - slidingWindow; i++) {
    const currentSlidingWindow = report.slice(i, i + slidingWindow);
    const slidingWindowSum = sumOfNumbers(currentSlidingWindow);

    if (slidingWindowSum > previousSum) counter++;

    previousSum = slidingWindowSum;
  }

  return counter;
};

const measurementsSlidingWindowLargerThenPreviousOne = getMeasurementsSlidingWindowLargerThenPreviousOne(depthReport);

export const result = measurementsSlidingWindowLargerThenPreviousOne;
