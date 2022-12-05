const lowerCaseCharCodeStart = 97;
const upperCaseCharCodeStart = 65;
const alphabetLength = 26;

type Letter = string;
type Rank = number;
type Priorities = { [key: Letter]: Rank };

const generatePriorities = (start: number, indexStart = 0) =>
  Array.from({ length: alphabetLength }).reduce((acc: Priorities, _, index) => {
    const character = String.fromCharCode(index + start);
    const rank = index + 1 + indexStart;

    acc[character] = rank;

    return acc;
  }, {});

export const priorities: Priorities = {
  ...generatePriorities(lowerCaseCharCodeStart),
  ...generatePriorities(upperCaseCharCodeStart, alphabetLength),
};
