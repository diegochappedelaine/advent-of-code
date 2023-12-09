import { type Instructions, Command, makeInstruction } from "./crt-tooling.ts";

const path = `${import.meta.dir}/input.txt`;
const file = Bun.file(path);
const input = await file.text();

// PART 2

const instructions = input.split("\n").map(makeInstruction);

const screenWidth = 40;
const spriteWidth = 3;

enum Pixel {
  Lit = "#",
  Dark = ".",
}
type Line = Pixel[];

const getPixelStatus = (spritePosition: number, cycle: number): Pixel => {
  const spriteCoverage = Array.from({ length: spriteWidth }, (_, i) => i + spritePosition);
  const pixelPosition = cycle % screenWidth;

  return spriteCoverage.includes(pixelPosition) ? Pixel.Lit : Pixel.Dark;
};

const drawScreen = (pixels: Line): string[] =>
  pixels.map((pixel, index) => {
    if ((index + 1) % screenWidth === 0) return `${pixel}\n`;
    return pixel;
  });

const getScreenFromInstructions = (instructions: Instructions): string => {
  const drawing: Line = [];
  let cycle = 0;
  let spritePosition = 0;

  const executeCycle = (): void => {
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
