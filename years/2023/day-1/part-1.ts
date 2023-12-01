const path = `${import.meta.dir}/input.txt`;
const file = Bun.file(path);
const input = await file.text();

const calibrations = input.split("\n");

// PART 1

const keepOnlyDigits = (str: string) => str.replace(/\D/g, "");

const calibrationsLines = calibrations.map(keepOnlyDigits);

const sumOfCalibrationValues = calibrationsLines.reduce((acc, curr) => {
  const firstCalibration = curr[0];
  const lastCalibration = curr[curr.length - 1];
  const result = Number(`${firstCalibration}${lastCalibration}`);

  return acc + result;
}, 0);

export const result = sumOfCalibrationValues;
