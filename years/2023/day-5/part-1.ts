const path = `${import.meta.dir}/input.txt`;
const file = Bun.file(path);
const input = await file.text();

// PART 1

const sectionMap = {
  "seed-to-soil": "seedToSoil",
  "soil-to-fertilizer": "soilToFertilizer",
  "fertilizer-to-water": "fertilizerToWater",
  "water-to-light": "waterToLight",
  "light-to-temperature": "lightToTemperature",
  "temperature-to-humidity": "temperatureToHumidity",
  "humidity-to-location": "humidityToLocation",
} as const;
type Section = keyof typeof sectionMap;

const rawAlmanac = input.split("\n").filter(Boolean);

interface Conversion {
  destinationRange: number;
  sourceRangeStart: number;
  rangeLength: number;
}

type Almanac = {
  [K in keyof typeof sectionMap as (typeof sectionMap)[K]]: Conversion[];
} & {
  seeds: number[];
};

const parseAlmanac = (input: string[]): Almanac => {
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

const executeAlmanac = (almanac: Almanac): Almanac => {
  return almanac;
};

console.log(executeAlmanac(almanac));

export const result = null;
