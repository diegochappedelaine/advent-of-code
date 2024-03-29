const path = `${import.meta.dir}/input.txt`;
const file = Bun.file(path);
const input = await file.text();

export enum Directions {
  up = "up",
  down = "down",
  forward = "forward",
}
interface Instruction {
  direction: Directions;
  distance: number;
}

export const instructions = input.split("\n").map((line) => {
  const [direction, distance] = line.split(" ");
  return {
    direction,
    distance: +distance,
  };
}) as Instruction[];
