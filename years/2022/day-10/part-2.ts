import { type Instructions, Command, makeInstruction } from "./crt-tooling.ts";

const filePath = new URL(".", import.meta.url).pathname + "input.txt";
const input = await Deno.readTextFile(filePath);

// PART 2

const instructions = input.split("\n").map(makeInstruction);

const screenWidth = 40;
const spriteWidth = 3;

enum Pixel {
  Lit = "#",
  Dark = ".",
}
type Line = Array<Pixel>;

const getPixelStatus = (spritePosition: number, cycle: number): Pixel => {
  const spriteCoverage = Array.from({ length: spriteWidth }, (_, i) => i + spritePosition);
  const pixelPosition = cycle % screenWidth;

  return spriteCoverage.includes(pixelPosition) ? Pixel.Lit : Pixel.Dark;
};

const drawScreen = (pixels: Line) =>
  pixels.map((pixel, index) => {
    if ((index + 1) % screenWidth === 0) return `${pixel}\n`;
    return pixel;
  });

const getScreenFromInstructions = (instructions: Instructions) => {
  const drawing: Line = [];
  let cycle = 0;
  let spritePosition = 0;

  const executeCycle = () => {
    drawing[cycle] = getPixelStatus(spritePosition, cycle);
    cycle += 1;
  };

  for (const instruction of instructions) {
    if (instruction.type === Command.Noop) {
      executeCycle();
    }
    if (instruction.type === Command.Add) {
      executeCycle();
      executeCycle();
      spritePosition += instruction.value;
    }
  }

  return drawScreen(drawing).join("");
};

export const result = `\n${getScreenFromInstructions(instructions)}`;
