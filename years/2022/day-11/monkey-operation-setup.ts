import { type Instructions } from "./stuff-slinging-simian-shenanigans.ts";

const numberRegex = /\d+/;
const numbersRegex = /\d+/g;

export enum Operation {
  Sum = "sum",
  Multiply = "multiply",
}
export interface Monkey {
  id: number;
  operation: {
    type: Operation;
    value?: number;
  };
  test: {
    value: number;
    onSuccess: number;
    onFailure: number;
  };
  items: number[];
  inspectionCounter: number;
}
export type Monkeys = Map<string, Monkey>;

export const getMonkeys = (instructions: Instructions): Monkeys => {
  const monkeys = new Map<string, Monkey>();

  for (const [_id, startingItems, operation, test, success, failure] of instructions) {
    const [id, items, [_, sign, value], testValue, onSuccess, onFailure] = [
      _id.match(numberRegex)?.[0],
      startingItems.match(numbersRegex)?.map((item) => +item),
      operation.split("=")[1].trim().split(" "),
      test.match(numberRegex)?.[0],
      success.match(numberRegex)?.[0],
      failure.match(numberRegex)?.[0],
    ];

    const monkey: Monkey = {
      id: Number(id),
      items: items ?? [],
      operation: {
        type: sign === "+" ? Operation.Sum : Operation.Multiply,
        value: Number.isNaN(Number(value)) ? undefined : Number(value),
      },
      test: {
        value: Number(testValue),
        onSuccess: Number(onSuccess),
        onFailure: Number(onFailure),
      },
      inspectionCounter: 0,
    };

    monkeys.set(String(id), monkey);
  }

  return monkeys;
};
