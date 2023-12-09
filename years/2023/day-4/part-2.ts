import { parseTable } from "./card-parser";
import type { Card, PileOfCards } from "./card-parser";

const path = `${import.meta.dir}/input.txt`;
const file = Bun.file(path);
const input = await file.text();

const table = input.split("\n");

// PART 2

const parsedTable = table.map(parseTable);

const getCardWinnings = (card: Card): number =>
  card.winningNumbers.reduce((acc, number) => {
    if (card.selectedNumbers.includes(number)) return acc + 1;
    return acc;
  }, 0);

const calculateAmountOfCards = (pileofCards: PileOfCards): number => {
  const pileOfCardsMap = new Map<number, Card>(pileofCards.map((card) => [card.cardNumber, card]));

  for (let i = 0; i < pileOfCardsMap.size; i++) {
    const card = pileOfCardsMap.get(i + 1);

    if (card === undefined) throw new Error("Card not found");

    const cardWinnings = getCardWinnings(card);

    for (let j = 0; j < cardWinnings; j++) {
      const winningCardIndex = i + j + 2;
      const winningCard = pileOfCardsMap.get(winningCardIndex);

      if (winningCard === undefined) throw new Error("Card not found");

      winningCard.amount += card.amount;
    }
  }

  const pileOfCards = [...pileOfCardsMap.values()].map((card) => card.amount);

  const numberOfCards = pileOfCards.reduce((acc, amount) => acc + amount, 0);

  return numberOfCards;
};

const amountOfCards = calculateAmountOfCards(parsedTable);

export const result = amountOfCards;
