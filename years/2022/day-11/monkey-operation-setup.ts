import { type Instructions } from "./stuff-slinging-simian-shenanigans.ts";

const number_regex = /\d+/;
const numbers_regex = /\d+/g;

export enum Operation {
  Sum = "sum",
  Multiply = "multiply",
}
export type Monkey = {
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
};
export type Monkeys = Map<string, Monkey>;

export const getMonkeys = (instructions: Instructions): Monkeys => {
  const monkeys = new Map<string, Monkey>();

  for (const [_id, startingItems, operation, test, success, failure] of instructions) {
    const [id, items, [_, sign, value], testValue, onSuccess, onFailure] = [
      _id.match(number_regex)?.[0],
      startingItems.match(numbers_regex)?.map((item) => +item),
      operation.split("=")[1].trim().split(" "),
      test.match(number_regex)?.[0],
      success.match(number_regex)?.[0],
      failure.match(number_regex)?.[0],
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
