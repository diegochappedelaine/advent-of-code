import { binaryToInt } from "./binary.ts";

const filePath = new URL(".", import.meta.url).pathname + "input.txt";
const input = await Deno.readTextFile(filePath);

// PART 2

const report = input.split("\n").map((sequence) => sequence.split(""));
const bitCount = report[0].length;

const zero = "0";
const one = "1";

type Sequence = Array<string>;
type Report = Array<Sequence>;
type DigitsCounter = (a: Report, b: number) => string;
type Digits = {
  zeros: number;
  ones: number;
};

const getDigits = (input: Report, index: number): Digits => {
  const ones = input.filter((digit) => digit[index] === one).length;
  const zeros = input.length - ones;
  return { zeros, ones };
};

const getMostCommon = (input: Report, index: number): string => {
  const { zeros, ones } = getDigits(input, index);
  return ones >= zeros ? one : zero;
};

const getLeastCommon = (input: Report, index: number): string => {
  const { zeros, ones } = getDigits(input, index);
  return ones >= zeros ? zero : one;
};

const calculateValue = (input: Report, size: number, digitCounter: DigitsCounter, index = 0): Sequence => {
  if (input.length === 1) return input[0];

  const valueCheck = digitCounter(input, index);
  const result = input.filter((sequence) => sequence[index] === valueCheck);
  return calculateValue(result, size, digitCounter, index + 1);
};

const getLifeSupportRating = (input: Report): number => {
  const oxygen = calculateValue(input, bitCount, getMostCommon).join("");
  const co2 = calculateValue(input, bitCount, getLeastCommon).join("");

  const oxygenRate = binaryToInt(oxygen);
  const co2Rate = binaryToInt(co2);

  return oxygenRate * co2Rate;
};

export const result = getLifeSupportRating(report);
