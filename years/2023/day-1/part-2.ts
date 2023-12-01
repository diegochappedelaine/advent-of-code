const path = `${import.meta.dir}/input.txt`;
const file = Bun.file(path);
const input = await file.text();

const calibrations = input.split("\n");

const digitsWithLettersMap: Record<string, number> = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};
const digitsWithLetters = Object.keys(digitsWithLettersMap);

const digits = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

type PossibleValue = {
  position: number;
  value: number;
};

// PART 2

const finalCalibrations: string[] = [];

for (const calibration of calibrations) {
  const possibleValues: PossibleValue[] = [];

  digitsWithLetters.forEach((digitWithLetter) => {
    const matches = [...calibration.matchAll(new RegExp(digitWithLetter, "g"))];

    matches.forEach((match) => {
      const position = match.index ?? 0;
      possibleValues.push({ position, value: digitsWithLettersMap[digitWithLetter] });
    });
  });

  digits.forEach((digit) => {
    const matches = [...calibration.matchAll(new RegExp(digit, "g"))];

    matches.forEach((match) => {
      const position = match.index ?? 0;
      possibleValues.push({ position, value: Number(digit) });
    });
  });

  const sortedPossibleValues = possibleValues.sort((a, b) => a.position - b.position);

  const firstValue = sortedPossibleValues[0].value;
  const lastValue = sortedPossibleValues[sortedPossibleValues.length - 1].value;

  const value = `${firstValue}${lastValue}`;

  finalCalibrations.push(value);
}

const finalCalibrationsSum = finalCalibrations.reduce((acc, curr) => acc + Number(curr), 0);

export const result = finalCalibrationsSum;
