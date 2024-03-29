import { ranges, type Ranges } from "./ranges.ts";

// PART 2

const assignmentWithPartialOverlap: Ranges[] = ranges.filter(([first, second]) => {
  const firstRangeIncludesSecondRange = first.find((id) => second.includes(id));
  const secondRangeIncludesFirstRange = second.find((id) => first.includes(id));

  return firstRangeIncludesSecondRange ?? secondRangeIncludesFirstRange;
});

export const result = assignmentWithPartialOverlap.length;
