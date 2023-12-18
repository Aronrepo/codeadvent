import * as fs from 'fs';

let fileContent: string | undefined; 

const filePath = './dist/input.txt';

try {
  const filePath = './dist/input.txt';

  fileContent = fs.readFileSync(filePath, 'utf-8');

} catch (err) {
  console.error('Error reading the file:', err);
}

const lines = fileContent?.split(/\r?\n/);
//console.log(lines);
let seedToSoilStringArr : string[];
let soilToFertilizerStringArr : string[];
let fertilizerToWaterStringArr : string[];
let waterToLightStringArr : string[];
let lightToTemperatureStringArr : string[];
let temperatureToHumidityStringArr : string[];
let humidityToLocationStringArr : string[];

let searchedIndex : number = lines ? lines?.findIndex(item => item ==='seed-to-soil map:') : 0;
let searchSpaceIndex: number = lines ? lines?.findIndex(item => item === '') : 0;

seedToSoilStringArr = lines ? lines.slice(searchedIndex + 1, searchSpaceIndex) : [];
let seedToSoilNumberArr :number [][] = [];

seedToSoilStringArr.forEach(mapItem => {
    let currentArray : number[] = mapItem.split(' ').map(item => parseInt(item));
    seedToSoilNumberArr.push(currentArray);
    
})

const secondSpaceIndex: number = (lines ? lines.slice(searchSpaceIndex + 1).findIndex(item => item === '') : 0) + searchSpaceIndex + 1;

searchedIndex = lines ? lines?.findIndex(item => item ==='soil-to-fertilizer map:') : 0;
soilToFertilizerStringArr = lines ? lines.slice(searchedIndex + 1, secondSpaceIndex) : [];

let soilToFertilizerNumberArr :number [][] = [];

soilToFertilizerStringArr.forEach(mapItem => {
    let currentArray : number[] = mapItem.split(' ').map(item => parseInt(item));
    soilToFertilizerNumberArr.push(currentArray);
    
})

const thirdSpaceIndex: number = (lines ? lines.slice(secondSpaceIndex + 1).findIndex(item => item === '') : 0) + secondSpaceIndex + 1;

searchedIndex = lines ? lines?.findIndex(item => item ==='fertilizer-to-water map:') : 0;
fertilizerToWaterStringArr = lines ? lines.slice(searchedIndex + 1, thirdSpaceIndex) : [];

let fertilizerToWaterNumberArr :number [][] = [];

fertilizerToWaterStringArr.forEach(mapItem => {
    let currentArray : number[] = mapItem.split(' ').map(item => parseInt(item));
    fertilizerToWaterNumberArr.push(currentArray);
    
})

const fourthSpaceIndex: number = (lines ? lines.slice(thirdSpaceIndex + 1).findIndex(item => item === '') : 0) + thirdSpaceIndex + 1;

searchedIndex = lines ? lines?.findIndex(item => item ==='water-to-light map:') : 0;
waterToLightStringArr = lines ? lines.slice(searchedIndex + 1, fourthSpaceIndex) : [];

let waterToLightNumberArr :number [][] = [];

waterToLightStringArr.forEach(mapItem => {
    let currentArray : number[] = mapItem.split(' ').map(item => parseInt(item));
    waterToLightNumberArr.push(currentArray);
    
})

const fifthSpaceIndex: number = (lines ? lines.slice(fourthSpaceIndex + 1).findIndex(item => item === '') : 0) + fourthSpaceIndex + 1;

searchedIndex = lines ? lines?.findIndex(item => item ==='light-to-temperature map:') : 0;
lightToTemperatureStringArr = lines ? lines.slice(searchedIndex + 1, fifthSpaceIndex) : [];

let lightToTemperatureNumberArr :number [][] = [];

lightToTemperatureStringArr.forEach(mapItem => {
    let currentArray : number[] = mapItem.split(' ').map(item => parseInt(item));
    lightToTemperatureNumberArr.push(currentArray);
    
})

const sixthSpaceIndex: number = (lines ? lines.slice(fifthSpaceIndex + 1).findIndex(item => item === '') : 0) + fifthSpaceIndex + 1;

searchedIndex = lines ? lines?.findIndex(item => item ==='temperature-to-humidity map:') : 0;
temperatureToHumidityStringArr = lines ? lines.slice(searchedIndex + 1, sixthSpaceIndex) : [];

let temperatureToHumidityNumberArr :number [][] = [];

temperatureToHumidityStringArr.forEach(mapItem => {
    let currentArray : number[] = mapItem.split(' ').map(item => parseInt(item));
    temperatureToHumidityNumberArr.push(currentArray);
    
})

const seventhSpaceIndex: number = (lines ? lines.slice(sixthSpaceIndex + 1).findIndex(item => item === '') : 0) + sixthSpaceIndex + 1;

searchedIndex = lines ? lines?.findIndex(item => item ==='humidity-to-location map:') : 0;
humidityToLocationStringArr = lines ? lines.slice(searchedIndex + 1, lines.length) : [];

let humidityToLocationNumberArr :number [][] = [];

humidityToLocationStringArr.forEach(mapItem => {
    let currentArray : number[] = mapItem.split(' ').map(item => parseInt(item));
    humidityToLocationNumberArr.push(currentArray);
    
})



//console.log(seedToSoilStringArr);

function processItem(mapping : number[][], actualNumber: number):number {
    let output : number = actualNumber;
    mapping.forEach(mapItem => {
        let source: number = mapItem[1];
        let destination: number = mapItem[0];
        let range: number = mapItem[2];
        if(actualNumber >= source && actualNumber < (source + range)) {
            output = destination + actualNumber - source;
        }
        return output;
    })
    return output;
}

//79 14 55 13

let inputNumbers : number[] = [2041142901, 113138307, 302673608, 467797997, 1787644422, 208119536, 143576771, 99841043, 4088720102, 111819874, 946418697, 13450451, 3459931852, 262303791, 2913410855, 533641609, 2178733435, 26814354, 1058342395, 175406592];

let min : number = Number.POSITIVE_INFINITY;

inputNumbers.forEach((actualNumber, index) => {
    if(index % 2 === 0) {
        for(let i:number = actualNumber; i < actualNumber + inputNumbers[index + 1]; i++) {
            let checkedNumber = getLocation(i);
            if(checkedNumber < min) {
                min = checkedNumber;
            }
        }
    }
})

console.log(min);

function getLocation(sourceNumber :number): number {
    let seedToSoil : number = processItem(seedToSoilNumberArr, sourceNumber);
    let soilToFertilizer : number = processItem(soilToFertilizerNumberArr, seedToSoil);
    let fertilizerToWater : number = processItem(fertilizerToWaterNumberArr, soilToFertilizer);
    let waterToLight : number = processItem(waterToLightNumberArr, fertilizerToWater);
    let lightToTemperature : number = processItem(lightToTemperatureNumberArr, waterToLight);
    let temperatureToHumidity : number = processItem(temperatureToHumidityNumberArr, lightToTemperature);
    let humidityToLocation : number = processItem(humidityToLocationNumberArr, temperatureToHumidity);
    return humidityToLocation;
}






