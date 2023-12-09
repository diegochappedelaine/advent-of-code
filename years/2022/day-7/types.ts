export interface File {
  type: "file";
  filename: string;
  size: number;
}

export interface Directory {
  type: "directory";
  dirname: string;
  children: Node[];
}

export type Node = File | Directory;
