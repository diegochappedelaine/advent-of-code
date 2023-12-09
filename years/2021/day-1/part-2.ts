const path = `${import.meta.dir}/input.txt`;
const file = Bun.file(path);
const input = await file.text();

type Report = number[];
const slidingWindow = 3;

const sumOfNumbers = (array: number[]): number => array.reduce((acc, curr) => acc + curr);

const depthReport = input.split("\n").map(Number);

// PART 2

const getMeasurementsSlidingWindowLargerThenPreviousOne = (report: Report): number => {
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
