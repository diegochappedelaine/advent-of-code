import { ranges, type Ranges } from "./ranges.ts";

// PART 1

const assignmentsWithFullOverlap: Array<Ranges> = ranges.filter(([first, second]) => {
  const firstRangeIncludesSecondRange = first.every((id) => second.includes(id));
  const secondRangeIncludesFirstRange = second.every((id) => first.includes(id));

  return firstRangeIncludesSecondRange || secondRangeIncludesFirstRange;
});

export const result = assignmentsWithFullOverlap.length;
