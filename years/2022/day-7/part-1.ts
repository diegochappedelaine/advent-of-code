import { getDirectoriesSize } from "./directory-utils.ts";
import { createTree } from "./tree-utils.ts";

const path = `${import.meta.dir}/input.txt`;
const file = Bun.file(path);
const input = await file.text();

// PART 1

const maxDirectorySize = 100_000;

const instructions = input.split("\n").map((line) => line.replaceAll("$ ", ""));

const tree = createTree(instructions);
const sizes = getDirectoriesSize(tree);
const directoriesWithEnoughSize = sizes.filter((size) => size <= maxDirectorySize);
const sumOfDirectoriesWithEnoughSize = directoriesWithEnoughSize.reduce((acc, size) => acc + size, 0);

export const result = sumOfDirectoriesWithEnoughSize;
