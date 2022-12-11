import { type Monkey, type Monkeys, Operation } from "./monkey-operation-setup.ts";

export const parseInstructions = (input: string) =>
  input
    .split("Monkey")
    .map((monkey) =>
      monkey
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
    )
    .filter((array) => array.length);

export type Instructions = ReturnType<typeof parseInstructions>;

const executeOperation = (operation: Operation, itemValue: number, value?: number): number => {
  const byValue = value ?? itemValue;
  switch (operation) {
    case Operation.Sum:
      return itemValue + byValue;
    case Operation.Multiply:
      return itemValue * byValue;
  }
};

const updateValueInMonkey = (monkeys: Monkeys, monkeyId: string, value: Partial<Monkey>): void => {
  const monkey = monkeys.get(monkeyId);
  if (!monkey) throw new Error(`Monkey with id ${monkeyId} not found`);
  monkeys.set(monkeyId, {
    ...monkey,
    ...value,
  });
};

type StressRelief =
  | {
      type: "stress-relief";
      value: number;
    }
  | {
      type: "no-stress-relief";
      modulus: number;
    };

const manageWorryLevel = (worryLevel: number, stressRelief: StressRelief): number => {
  switch (stressRelief.type) {
    case "stress-relief":
      return Math.floor(worryLevel / stressRelief.value);
    case "no-stress-relief":
      return worryLevel % stressRelief.modulus;
  }
};

export const runMonkeyBusiness = (monkeys: Map<string, Monkey>, numberOfRounds: number, stressRelief: StressRelief): number => {
  for (let round = 1; round <= numberOfRounds; round++) {
    for (const [monkeyId, { operation, test, items, inspectionCounter }] of monkeys) {
      let currentInspectionCounter = 0;

      items.forEach((item) => {
        const operationResult = executeOperation(operation.type, item, operation.value);
        const worryLevel = manageWorryLevel(operationResult, stressRelief);
        const testSucceed = worryLevel % test.value === 0;
        const monkeyReceiver = testSucceed ? test.onSuccess : test.onFailure;

        currentInspectionCounter++;

        updateValueInMonkey(monkeys, String(monkeyId), {
          inspectionCounter: inspectionCounter + currentInspectionCounter,
          items: [],
        });

        updateValueInMonkey(monkeys, String(monkeyReceiver), {
          items: [...(monkeys.get(String(monkeyReceiver))?.items ?? []), worryLevel],
        });
      });
    }
  }

  const [mostActiveMonkey, secondMostActiveMonkey] = [...monkeys.values()].map(({ inspectionCounter }) => inspectionCounter).sort((a, b) => b - a);

  return mostActiveMonkey * secondMostActiveMonkey;
};
