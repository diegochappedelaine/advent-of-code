import { type Node } from "./types.ts";

export const getDirectoriesSize = (node: Node): number[] => {
  const sizes: number[] = [];

  const traverse = (child: Node): number => {
    if (child.type === "directory") {
      const dirSize = child.children.reduce((size, acc) => size + traverse(acc), 0);
      sizes.push(dirSize);
      return dirSize;
    }
    return child.size;
  };

  traverse(node);

  return sizes;
};
