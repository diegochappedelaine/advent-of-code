const filePath = new URL(".", import.meta.url).pathname + "input.txt";
const input = await Deno.readTextFile(filePath);

type Elf = Array<number>;

// PART 1

// PART 2
