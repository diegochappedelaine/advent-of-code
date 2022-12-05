const filePath = new URL(".", import.meta.url).pathname + "input.txt";
const input = await Deno.readTextFile(filePath);

const depthReport = input.split("\n").map(Number);

// PART 1

const measurementsLargerThenPreviousOne = depthReport.filter((current, index, array) => index > 0 && current > array[index - 1]).length;

export const result = measurementsLargerThenPreviousOne;
