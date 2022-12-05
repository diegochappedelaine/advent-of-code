const filePath = new URL(".", import.meta.url).pathname + "input.txt";
const input = await Deno.readTextFile(filePath);

type Instruction = { start: number; end: number };
type Assignment = [Instruction, Instruction];
type Range = Array<number>;
export type Ranges = [Range, Range];

const assignments = input
  .split("\n")
  .map((assignment) => assignment.split(","))
  .map(([elf1, elf2]) => {
    const [elf1start, elf1end] = elf1.split("-");
    const [elf2start, elf2end] = elf2.split("-");

    return [
      { start: +elf1start, end: +elf1end },
      { start: +elf2start, end: +elf2end },
    ];
  }) as Array<Assignment>;

const generateNumbersFromRange = (start: number, end: number): Range => Array.from({ length: end - start + 1 }, (_, index) => index + start);

export const ranges: Array<Ranges> = assignments.map(([elf1, elf2]) => [generateNumbersFromRange(elf1.start, elf1.end), generateNumbersFromRange(elf2.start, elf2.end)]);
