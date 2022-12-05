const filePath = new URL(".", import.meta.url).pathname + "input.txt";
const input = await Deno.readTextFile(filePath);

export enum Directions {
  up = "up",
  down = "down",
  forward = "forward",
}
type Instruction = {
  direction: Directions;
  distance: number;
};

export const instructions = input.split("\n").map((line) => {
  const [direction, distance] = line.split(" ");
  return {
    direction: direction,
    distance: +distance,
  };
}) as Array<Instruction>;
