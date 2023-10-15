import { binaryToInt } from "./binary.ts";

const path = `${import.meta.dir}/input.txt`;
const file = Bun.file(path);
const input = await file.text();

// PART 1

const report = input.split("\n");
const bitCount = report[0].length;

const zero = "0";
const one = "1";

type Sequence = Array<string>;
type Digits = {
  zeros: number;
  ones: number;
};

const getDigits = (bit: Sequence): Digits => {
  const ones = bit.filter((digit) => digit === one).length;
  const zeros = bit.length - ones;
  return { zeros, ones };
};

const getGammaAndEpsilon = (report: Sequence): { gamma: Sequence; epsilon: Sequence } => {
  const gamma: Sequence = [];
  const epsilon: Sequence = [];

  for (let i = 0; i < bitCount; i++) {
    const bit = report.map((line) => line[i]);

    const { zeros, ones } = getDigits(bit);

    gamma.push(zeros > ones ? zero : one);
    epsilon.push(zeros > ones ? one : zero);
  }

  return { gamma, epsilon };
};

const getPowerConsumption = (report: Sequence): number => {
  const { gamma, epsilon } = getGammaAndEpsilon(report);

  const gammaRate = binaryToInt(gamma.join(""));
  const epsilonRate = binaryToInt(epsilon.join(""));

  return gammaRate * epsilonRate;
};

const powerConsumption = getPowerConsumption(report);

export const result = powerConsumption;
