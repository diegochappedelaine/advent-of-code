const path = `${import.meta.dir}/input.txt`;
const file = Bun.file(path);
const input = await file.text();

// PART 1
type SeedLine = `seeds: ${number}`;
type SectionLine = `${Section} map:`;
type ConversionLine = `${number} ${number} ${number}`;

type InputLine = SeedLine | SectionLine | ConversionLine;

const rawAlmanac = input.split("\n").filter(Boolean) as InputLine[];

interface Conversion {
  destinationRange: number;
  sourceRangeStart: number;
  rangeLength: number;
}

interface Almanac {
  seeds: number[];
  seedToSoil: Conversion[];
  soilToFertilizer: Conversion[];
  fertilizerToWater: Conversion[];
  waterToLight: Conversion[];
  lightToTemperature: Conversion[];
  temperatureToHumidity: Conversion[];
  humidityToLocation: Conversion[];
}

const sections = ["seed-to-soil", "soil-to-fertilizer", "fertilizer-to-water", "water-to-light", "light-to-temperature", "temperature-to-humidity", "humidity-to-location"] as const;
type Section = (typeof sections)[number];

const sectionMap = {
  "seed-to-soil": "seedToSoil",
  "soil-to-fertilizer": "soilToFertilizer",
  "fertilizer-to-water": "fertilizerToWater",
  "water-to-light": "waterToLight",
  "light-to-temperature": "lightToTemperature",
  "temperature-to-humidity": "temperatureToHumidity",
  "humidity-to-location": "humidityToLocation",
} satisfies Record<Section, keyof Almanac>;

const parseAlmanac = (input: InputLine[]): Almanac => {
  let currentSection: Section | null = null;

  return input.reduce<Almanac>(
    (acc, line) => {
      const isSeedLine = line.includes("seeds:");
      const isMapLine = line.includes("map:");

      if (isSeedLine) {
        const [, ...seeds] = line.split(" ");
        acc.seeds = seeds.map(Number);
        return acc;
      }

      if (isMapLine) {
        const section = line.replace(/ map:/g, "") as Section;
        currentSection = section;
        return acc;
      }

      if (currentSection === null) throw new Error("No current section");

      const [destinationRange, sourceRangeStart, rangeLength] = line.split(" ").map(Number);

      const conversion = {
        destinationRange,
        sourceRangeStart,
        rangeLength,
      };

      acc[sectionMap[currentSection]].push(conversion);

      return acc;
    },
    {
      seeds: [],
      seedToSoil: [],
      soilToFertilizer: [],
      fertilizerToWater: [],
      waterToLight: [],
      lightToTemperature: [],
      temperatureToHumidity: [],
      humidityToLocation: [],
    },
  );
};

const almanac = parseAlmanac(rawAlmanac);

console.log(almanac);

export const result = null;
