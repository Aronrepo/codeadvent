"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
let fileContent;
const filePath = './dist/input5.txt';
try {
    const filePath = './dist/input5.txt';
    fileContent = fs.readFileSync(filePath, 'utf-8');
}
catch (err) {
    console.error('Error reading the file:', err);
}
const lines = fileContent === null || fileContent === void 0 ? void 0 : fileContent.split(/\r?\n/);
let seedToSoilStringArr;
let soilToFertilizerStringArr;
let fertilizerToWaterStringArr;
let waterToLightStringArr;
let lightToTemperatureStringArr;
let temperatureToHumidityStringArr;
let humidityToLocationStringArr;
let searchedIndex = lines ? lines === null || lines === void 0 ? void 0 : lines.findIndex(item => item === 'seed-to-soil map:') : 0;
let searchSpaceIndex = lines ? lines === null || lines === void 0 ? void 0 : lines.findIndex(item => item === '') : 0;
seedToSoilStringArr = lines ? lines.slice(searchedIndex + 1, searchSpaceIndex) : [];
let seedToSoilNumberArr = [];
seedToSoilStringArr.forEach(mapItem => {
    let currentArray = mapItem.split(' ').map(item => parseInt(item));
    seedToSoilNumberArr.push(currentArray);
});
const secondSpaceIndex = (lines ? lines.slice(searchSpaceIndex + 1).findIndex(item => item === '') : 0) + searchSpaceIndex + 1;
searchedIndex = lines ? lines === null || lines === void 0 ? void 0 : lines.findIndex(item => item === 'soil-to-fertilizer map:') : 0;
soilToFertilizerStringArr = lines ? lines.slice(searchedIndex + 1, secondSpaceIndex) : [];
let soilToFertilizerNumberArr = [];
soilToFertilizerStringArr.forEach(mapItem => {
    let currentArray = mapItem.split(' ').map(item => parseInt(item));
    soilToFertilizerNumberArr.push(currentArray);
});
const thirdSpaceIndex = (lines ? lines.slice(secondSpaceIndex + 1).findIndex(item => item === '') : 0) + secondSpaceIndex + 1;
searchedIndex = lines ? lines === null || lines === void 0 ? void 0 : lines.findIndex(item => item === 'fertilizer-to-water map:') : 0;
fertilizerToWaterStringArr = lines ? lines.slice(searchedIndex + 1, thirdSpaceIndex) : [];
let fertilizerToWaterNumberArr = [];
fertilizerToWaterStringArr.forEach(mapItem => {
    let currentArray = mapItem.split(' ').map(item => parseInt(item));
    fertilizerToWaterNumberArr.push(currentArray);
});
const fourthSpaceIndex = (lines ? lines.slice(thirdSpaceIndex + 1).findIndex(item => item === '') : 0) + thirdSpaceIndex + 1;
searchedIndex = lines ? lines === null || lines === void 0 ? void 0 : lines.findIndex(item => item === 'water-to-light map:') : 0;
waterToLightStringArr = lines ? lines.slice(searchedIndex + 1, fourthSpaceIndex) : [];
let waterToLightNumberArr = [];
waterToLightStringArr.forEach(mapItem => {
    let currentArray = mapItem.split(' ').map(item => parseInt(item));
    waterToLightNumberArr.push(currentArray);
});
const fifthSpaceIndex = (lines ? lines.slice(fourthSpaceIndex + 1).findIndex(item => item === '') : 0) + fourthSpaceIndex + 1;
searchedIndex = lines ? lines === null || lines === void 0 ? void 0 : lines.findIndex(item => item === 'light-to-temperature map:') : 0;
lightToTemperatureStringArr = lines ? lines.slice(searchedIndex + 1, fifthSpaceIndex) : [];
let lightToTemperatureNumberArr = [];
lightToTemperatureStringArr.forEach(mapItem => {
    let currentArray = mapItem.split(' ').map(item => parseInt(item));
    lightToTemperatureNumberArr.push(currentArray);
});
const sixthSpaceIndex = (lines ? lines.slice(fifthSpaceIndex + 1).findIndex(item => item === '') : 0) + fifthSpaceIndex + 1;
searchedIndex = lines ? lines === null || lines === void 0 ? void 0 : lines.findIndex(item => item === 'temperature-to-humidity map:') : 0;
temperatureToHumidityStringArr = lines ? lines.slice(searchedIndex + 1, sixthSpaceIndex) : [];
let temperatureToHumidityNumberArr = [];
temperatureToHumidityStringArr.forEach(mapItem => {
    let currentArray = mapItem.split(' ').map(item => parseInt(item));
    temperatureToHumidityNumberArr.push(currentArray);
});
const seventhSpaceIndex = (lines ? lines.slice(sixthSpaceIndex + 1).findIndex(item => item === '') : 0) + sixthSpaceIndex + 1;
searchedIndex = lines ? lines === null || lines === void 0 ? void 0 : lines.findIndex(item => item === 'humidity-to-location map:') : 0;
humidityToLocationStringArr = lines ? lines.slice(searchedIndex + 1, lines.length) : [];
let humidityToLocationNumberArr = [];
humidityToLocationStringArr.forEach(mapItem => {
    let currentArray = mapItem.split(' ').map(item => parseInt(item));
    humidityToLocationNumberArr.push(currentArray);
});
function processItem(mapping, actualNumber) {
    let output = actualNumber;
    mapping.forEach(mapItem => {
        let source = mapItem[1];
        let destination = mapItem[0];
        let range = mapItem[2];
        if (actualNumber >= source && actualNumber < (source + range)) {
            output = destination + actualNumber - source;
        }
        return output;
    });
    return output;
}
let inputNumbers = [2041142901, 113138307, 302673608, 467797997, 1787644422, 208119536, 143576771, 99841043, 4088720102, 111819874, 946418697, 13450451, 3459931852, 262303791, 2913410855, 533641609, 2178733435, 26814354, 1058342395, 175406592];
let min = Number.POSITIVE_INFINITY;
inputNumbers.forEach((actualNumber, index) => {
    if (index % 2 === 0) {
        for (let i = actualNumber; i < actualNumber + inputNumbers[index + 1]; i++) {
            let checkedNumber = getLocation(i);
            if (checkedNumber < min) {
                min = checkedNumber;
            }
        }
    }
});
console.log(min);
function getLocation(sourceNumber) {
    let seedToSoil = processItem(seedToSoilNumberArr, sourceNumber);
    let soilToFertilizer = processItem(soilToFertilizerNumberArr, seedToSoil);
    let fertilizerToWater = processItem(fertilizerToWaterNumberArr, soilToFertilizer);
    let waterToLight = processItem(waterToLightNumberArr, fertilizerToWater);
    let lightToTemperature = processItem(lightToTemperatureNumberArr, waterToLight);
    let temperatureToHumidity = processItem(temperatureToHumidityNumberArr, lightToTemperature);
    let humidityToLocation = processItem(humidityToLocationNumberArr, temperatureToHumidity);
    return humidityToLocation;
}
