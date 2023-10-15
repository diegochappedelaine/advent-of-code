import { getMarkerFromDataStream } from "./packet-parser.ts";

const path = `${import.meta.dir}/input.txt`;
const file = Bun.file(path);
const input = await file.text();

const dataStreamSequence = [...input];

// PART 2

const packetSize = 14;
const marker = getMarkerFromDataStream(dataStreamSequence, packetSize);

export const result = marker;
