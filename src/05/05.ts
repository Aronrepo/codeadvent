import * as fs from "fs";

function lowestLocationNumber(filePath: string, seeds: number[]): number {
  let fileContent: string | undefined;

  try {
    fileContent = fs.readFileSync(filePath, "utf-8");
  } catch (err) {
    console.error("Error reading the file:", err);
  }

  const lines = fileContent?.split(/\r?\n/);
  //console.log(lines);

  let seedToSoilNumberArr: number[][] = [];
  let soilToFertilizerNumberArr: number[][] = [];
  let fertilizerToWaterNumberArr: number[][] = [];
  let waterToLightNumberArr: number[][] = [];
  let lightToTemperatureNumberArr: number[][] = [];
  let temperatureToHumidityNumberArr: number[][] = [];
  let humidityToLocationNumberArr: number[][] = [];

  if (lines) {
    seedToSoilNumberArr = getMappingFromString(lines, "seed-to-soil map:");
    soilToFertilizerNumberArr = getMappingFromString(
      lines,
      "soil-to-fertilizer map:"
    );
    fertilizerToWaterNumberArr = getMappingFromString(
      lines,
      "fertilizer-to-water map:"
    );
    waterToLightNumberArr = getMappingFromString(lines, "water-to-light map:");
    lightToTemperatureNumberArr = getMappingFromString(
      lines,
      "light-to-temperature map:"
    );
    temperatureToHumidityNumberArr = getMappingFromString(
      lines,
      "temperature-to-humidity map:"
    );
    humidityToLocationNumberArr = getMappingFromString(
      lines,
      "humidity-to-location map:"
    );
  }

  let maps: number[][][] = [
    seedToSoilNumberArr,
    soilToFertilizerNumberArr,
    fertilizerToWaterNumberArr,
    waterToLightNumberArr,
    lightToTemperatureNumberArr,
    temperatureToHumidityNumberArr,
    humidityToLocationNumberArr,
  ];

  return getLowestLocationFromSeed(maps, seeds);
}
console.log(lowestLocationNumber("./input5.txt", [2041142901, 113138307, 302673608, 467797997, 1787644422, 208119536, 143576771, 99841043, 4088720102, 111819874, 946418697, 13450451, 3459931852, 262303791, 2913410855, 533641609, 2178733435, 26814354, 1058342395, 175406592]));

function getMappingFromString(lines: String[], typeOfMap: String): number[][] {
  let searchedIndex: number = lines
    ? lines?.findIndex((item) => item === typeOfMap)
    : 0;
  let searchSpaceIndex: number =
    (lines
      ? lines.slice(searchedIndex + 1).findIndex((item) => item === "")
      : 0) +
    searchedIndex +
    1;
  let mappingStringArr = lines
    ? lines.slice(searchedIndex + 1, searchSpaceIndex)
    : [];

  const result: number[][] = [];
  mappingStringArr.forEach((mapItem) => {
    let currentArray: number[] = mapItem
      .split(" ")
      .map((item) => parseInt(item));
    result.push(currentArray);
  });
  return result;
}

function getLowestLocationFromSeed(
  maps: number[][][],
  seeds: number[]
): number {

  let lowestNumber: number = Number.POSITIVE_INFINITY;
  for (const seed of seeds) {
    let locationNumber: number = seed;
    for (const actualMap of maps) {
      locationNumber = getCorrespondNumber(actualMap, locationNumber);
    }
    if(locationNumber < lowestNumber) {
      lowestNumber = locationNumber;
    }
  }
  return lowestNumber;
}

function getCorrespondNumber(actualMap: number[][], seed: number): number {
  for (const map of actualMap) {
    if (seed >= map[1] && seed <= map[1] + map[2]) {
      return map[0] + seed - map[1];
    }
  }
  return seed;
}

export default {lowestLocationNumber, getMappingFromString, getCorrespondNumber};
