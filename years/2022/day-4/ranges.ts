const path = `${import.meta.dir}/input.txt`;
const file = Bun.file(path);
const input = await file.text();

interface Instruction {
  start: number;
  end: number;
}
type Assignment = [Instruction, Instruction];
type Range = number[];
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
  }) as Assignment[];

const generateNumbersFromRange = (start: number, end: number): Range => Array.from({ length: end - start + 1 }, (_, index) => index + start);

export const ranges: Ranges[] = assignments.map(([elf1, elf2]) => [generateNumbersFromRange(elf1.start, elf1.end), generateNumbersFromRange(elf2.start, elf2.end)]);
