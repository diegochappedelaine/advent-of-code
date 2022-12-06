import { getMarkerFromDataStream } from "./packet-parser.ts";

const filePath = new URL(".", import.meta.url).pathname + "input.txt";
const input = await Deno.readTextFile(filePath);

const dataStreamSequence = [...input];

// PART 1

const packetSize = 4;
const marker = getMarkerFromDataStream(dataStreamSequence, packetSize);

export const result = marker;
