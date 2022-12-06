import { getMarkerFromDataStream } from "./packet-parser.ts";

const filePath = new URL(".", import.meta.url).pathname + "input.txt";
const input = await Deno.readTextFile(filePath);

const dataStreamSequence = [...input];

// PART 2

const packetSize = 14;
const marker = getMarkerFromDataStream(dataStreamSequence, packetSize);

export const result = marker;
