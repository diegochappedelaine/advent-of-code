const path = `${import.meta.dir}/input.txt`;
const file = Bun.file(path);
const input = await file.text();

const depthReport = input.split("\n").map(Number);

// PART 1

const measurementsLargerThenPreviousOne = depthReport.filter((current, index, array) => index > 0 && current > array[index - 1]).length;

export const result = measurementsLargerThenPreviousOne;
