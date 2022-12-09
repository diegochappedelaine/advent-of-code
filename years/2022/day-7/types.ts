export type File = {
  type: "file";
  filename: string;
  size: number;
};

export type Directory = {
  type: "directory";
  dirname: string;
  children: Array<Node>;
};

export type Node = File | Directory;
