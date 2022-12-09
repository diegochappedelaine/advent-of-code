import { getDirectoriesSize } from "./directory-utils.ts";
import { createTree } from "./tree-utils.ts";

const filePath = new URL(".", import.meta.url).pathname + "input.txt";
const input = await Deno.readTextFile(filePath);

// PART 2

const availableSpace = 70_000_000;
const requiredSpace = 30_000_000;

const instructions = input.split("\n").map((line) => line.replaceAll("$ ", ""));

const tree = createTree(instructions);
const sizes = getDirectoriesSize(tree).sort((a, b) => a - b);

const getSmallestDirectoryToRemove = (totalRequiredFreeSpace: number, diskSize: number): number => {
  const usedSpace = sizes.at(-1) || 0;
  const unusedSpace = diskSize - usedSpace;
  const requiredSpace = totalRequiredFreeSpace - unusedSpace;

  return sizes.find((size) => size >= requiredSpace) ?? -1;
};

const smallestDirectory = getSmallestDirectoryToRemove(requiredSpace, availableSpace);

export const result = smallestDirectory;
