import { type Directory, type File } from "./types.ts";

type Instructions = Array<string>;
enum Instruction {
  Cd = "cd",
  Up = "..",
}

const isDirectory = (line: string) => line.startsWith(Instruction.Cd);
const isFile = (line: string) => /^[0-9]/.test(line);

const createFile = (filename: string, size: number): File => ({
  type: "file",
  filename,
  size,
});
const createDirectory = (dirname: string): Directory => ({
  type: "directory",
  dirname,
  children: [],
});

export const createTree = (instructions: Instructions) => {
  const path: Array<Directory> = [];

  for (const instruction of instructions) {
    const parent = path.at(-1);

    if (isDirectory(instruction)) {
      const [_, direction] = instruction.split(" ");

      if (direction === Instruction.Up) {
        path.pop();
      } else {
        const directory = createDirectory(direction);
        parent?.children.push(directory);
        path.push(directory);
      }
    }

    if (isFile(instruction) && parent?.type === "directory") {
      const [size, filename] = instruction.split(" ");
      const file = createFile(filename, Number(size));
      parent.children.push(file);
    }
  }

  return path[0];
};
