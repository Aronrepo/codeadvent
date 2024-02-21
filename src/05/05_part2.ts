import * as fs from "fs";

function lowestLocationNumber(filePath: string, seeds: number[]): number {
  let fileContent: string | undefined;

  try {
    fileContent = fs.readFileSync(filePath, "utf-8"); //read input file
  } catch (err) {
    console.error("Error reading the file:", err);
    return 0;
  }

  const lines = fileContent?.split(/\r?\n/); //split input file's lines into arrays
  if (!lines) {
    console.error("Error splitting file content into lines");
    return 0;
  }

  const maps: number[][][] = getMappingFromString(lines);

  return getLowestLocationFromSeed(maps, seeds);
}
console.log(lowestLocationNumber("./input5.txt", [2041142901, 113138307, 302673608, 467797997, 1787644422, 208119536, 143576771,
     99841043, 4088720102, 111819874, 946418697, 13450451, 3459931852, 262303791, 2913410855, 533641609, 2178733435,
      26814354, 1058342395, 175406592])); //call main function with input seeds

function getMappingFromString(lines: string[]): number[][][] {//place map into 3d array 
  let result:number[][][] = [];
  for (let i = 0; i < lines.length; i++) {
    let pattern1 = /^[a-zA-Z]/;
    let pattern2 = /^$/;
    let pattern3 = /^\d/;
    let mapLine:number[][] =[];
    let mapLineIndex:number = 0;
    if(pattern1.test(lines[i])) {
      while(!pattern2.test(lines[mapLineIndex + i])) {
        let actualNumberArr:number[] = [];
        if(pattern3.test(lines[mapLineIndex + i])) {
          actualNumberArr = lines[mapLineIndex + i].split(' ').map((item) => parseInt(item));
          mapLine.push(actualNumberArr);

        }
        mapLineIndex++;
      }
      result.push(mapLine);
      
    }
  }
  
  return result;
}

function getLowestLocationFromSeed(
  maps: number[][][],
  seeds: number[]
): number {

  let lowestNumber: number = Number.POSITIVE_INFINITY;
  seeds.forEach((seed, index) => {
    console.log(index);
    
    if(index % 2 === 0) {//the first value is the start of the range and the second value is the length
        for(let i:number = seed; i < seed + seeds[index + 1]; i++) {
            
            let locationNumber: number = i;
            for (const actualMap of maps) {
              locationNumber = getCorrespondNumber(actualMap, locationNumber);
              
            }
            if(locationNumber < lowestNumber) {
              lowestNumber = locationNumber;
            }
        }
      
        
    }
})
return lowestNumber;
  
}

function getCorrespondNumber(actualMap: number[][], seed: number): number {
  for (const map of actualMap) {
    if (seed >= map[1] && seed < map[1] + map[2]) {
      return map[0] + seed - map[1];
    }
  }
  return seed;
}



export {lowestLocationNumber, getMappingFromString, getLowestLocationFromSeed,  getCorrespondNumber};
