import * as fs from "fs";

function sumOfTheSets(filePath: string): number {
  let fileContent: string | undefined;

  try {
    fileContent = fs.readFileSync(filePath, "utf-8"); //read input file
  } catch (err) {
    console.error("Error reading the file:", err);
  }

  
  const lines = fileContent?.split(/\r?\n/); //split input file's lines into arrays

  let counter: number = 0;
  //Iterate over the lines
  lines?.forEach((line) => {
    let possible: boolean = true;
    let actualGameNumber: number = parseInt(line.split(":")[0].split(" ")[1]);

    let actualColors: string = line.split(":")[1].trim();
    //split the lines into sets of colors
    let sets: string[] = actualColors.split(";");
    //iterate over the sets
    sets.forEach((oneSet) => {
      let setArr: String[] = oneSet.split(",").map((a) => a.trim());//split one set into distinct colors
      //Iterate over a set and check if none of its elements exceed the number of available colors
      setArr.forEach((cube) => {
        if (cube.split(" ")[1] === "red" &&
            parseInt(cube.split(" ")[0]) > 12
        ) {
          possible = false;
        }
        if (
          cube.split(" ")[1] === "green" &&
          parseInt(cube.split(" ")[0]) > 13
        ) {
          possible = false;
        }
        if (
          cube.split(" ")[1] === "blue" &&
          parseInt(cube.split(" ")[0]) > 14
        ) {
          possible = false;
        }
      });
    });
    if (possible) {
      counter += actualGameNumber;
    }
  });
  return counter;
}
console.log(sumOfTheSets("./input2.txt"));

export default sumOfTheSets;
