export type Card = {
  amount: number;
  cardNumber: number;
  winningNumbers: number[];
  selectedNumbers: number[];
};
export type PileOfCards = Card[];

export const parseTable = (input: string): Card => {
  const regex = /Card\s+(\d+):\s*((?:\s*\d+\s*)+)\|\s*((?:\s*\d+\s*)+)/;

  const match = input.match(regex);

  if (match === null || match.length !== 4) throw new Error("Invalid input format");

  const cardNumber = Number(match[1]);
  const winningNumbers = match[2].trim().split(/\s+/).map(Number);
  const selectedNumbers = match[3].trim().split(/\s+/).map(Number);

  return { cardNumber, winningNumbers, selectedNumbers, amount: 1 };
};
