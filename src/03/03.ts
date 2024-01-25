import * as fs from "fs";

function sumOfAllParts(filePath: string): number {
  let fileContent: string | undefined;

  try {
    fileContent = fs.readFileSync(filePath, "utf-8");//read input file
  } catch (err) {
    console.error("Error reading the file:", err);
  }

  const lines = fileContent?.split(/\r?\n/);//split input file's lines into arrays

  let sum: number = 0;
  //Iterate over the lines
  lines?.forEach((line, lineIndex) => {
    let lineArr: string[] = line.split("");
    //check where character not like number or dot (.)
    lineArr.forEach((char, charIndex) => {
      if (!/[0-9.]/.test(char) && lineIndex > 0) {//since the first line has no special character
        sum += searchAround(lines, lineIndex, charIndex);//use searchAround function to sum sourounded numbers at that specific point
      }
    });
  });

  return sum;

}

  function searchAround(
    lines: string[] | undefined,
    lineIndex: number,
    charIndex: number
  ): number {
    let searchSum: number = 0;
    let searchedChars: string = "";



    if (lines) {//if there is any remaning line
      for (let i = 1; i <= 3; i++) {
        let actualLine = lines[lineIndex].split("");
        if (/[0-9]/.test(actualLine[charIndex - i])) {
          searchedChars = actualLine[charIndex - i] + searchedChars;//555* - check numbers on the left
        } else {
          break;
        }
      }
        

      if (searchedChars !== "") {
        searchSum += parseInt(searchedChars);
      }

      searchedChars = "";
      for (let i = 1; i <= 3; i++) {
        let actualLine = lines[lineIndex].split("");
        if (/[0-9]/.test(actualLine[charIndex + i])) {
          searchedChars = searchedChars + actualLine[charIndex + i];//*555 - check number on the right
        } else {
          break;
        }
      }

        
      
      if (searchedChars !== "") {
        searchSum += parseInt(searchedChars);
      }
      searchedChars = "";
      //check numbers above
      let previousLine = lines[lineIndex - 1].split("");
      
      if (
        /[0-9]/.test(previousLine[charIndex]) &&    //555
        /[0-9]/.test(previousLine[charIndex - 1]) &&//  *
        /[0-9]/.test(previousLine[charIndex + 1])
      ) {
        searchedChars =
          searchedChars +
          previousLine[charIndex - 1] +
          previousLine[charIndex] +
          previousLine[charIndex + 1];
      } else if (
        /[0-9]/.test(previousLine[charIndex]) &&//.5.
        previousLine[charIndex - 1] === "." &&  ///*
        previousLine[charIndex + 1] === "."
      ) {
        searchedChars = previousLine[charIndex];
      } else if (
        /[0-9]/.test(previousLine[charIndex]) &&//.55
        previousLine[charIndex - 1] === "." &&  ///*
        /[0-9]/.test(previousLine[charIndex + 1])
      ) {
        searchedChars = previousLine[charIndex] + previousLine[charIndex + 1];
        if (/[0-9]/.test(previousLine[charIndex + 2])) {//.555
          searchedChars += previousLine[charIndex + 2]; ///*
        }
      } else if (
        /[0-9]/.test(previousLine[charIndex]) &&//55.
        previousLine[charIndex + 1] === "." &&  ///*
        /[0-9]/.test(previousLine[charIndex - 1])
      ) {
        searchedChars = previousLine[charIndex - 1] + previousLine[charIndex];
        if (/[0-9]/.test(previousLine[charIndex - 2])) {                //555.
          searchedChars = previousLine[charIndex - 2] + searchedChars;  ////*
        }
      } else if (previousLine[charIndex + 1] === ".") {//xxx .
        let i: number = 1;                             /////*
        while (/[0-9]/.test(previousLine[charIndex - i]) && i <= 3) {
          searchedChars = previousLine[charIndex - i] + searchedChars;
          i++;
        }
        i = 1;
      } else if (previousLine[charIndex - 1] === ".") {////. xxx
        let i: number = 1;                             /////*
        while (/[0-9]/.test(previousLine[charIndex + i]) && i <= 3) {
          searchedChars = searchedChars + previousLine[charIndex + i];
          i++;
        }
        i = 1;
      }

      if (searchedChars !== "") {
        searchSum += parseInt(searchedChars);
      }

      if (
        previousLine[charIndex] === "." &&          //<-5.5->
        /[0-9]/.test(previousLine[charIndex - 1]) &&/////*
        /[0-9]/.test(previousLine[charIndex + 1])
      ) {
        let i: number = 1;

        while (/[0-9]/.test(previousLine[charIndex - i]) && i <= 3) {
          searchedChars = previousLine[charIndex - i] + searchedChars;
          i++;
        }
        if (searchedChars !== "") {
          searchSum += parseInt(searchedChars);
        }

        searchedChars = "";
        i = 1;
        while (/[0-9]/.test(previousLine[charIndex + i]) && i <= 3) {
          searchedChars = searchedChars + previousLine[charIndex + i];
          i++;
        }
        if (searchedChars !== "") {
          searchSum += parseInt(searchedChars);
        }
      }

      searchedChars = "";
      //same as previous line
      let nextLine = lines[lineIndex + 1].split("");
      
      if (
        /[0-9]/.test(nextLine[charIndex]) &&
        /[0-9]/.test(nextLine[charIndex - 1]) &&
        /[0-9]/.test(nextLine[charIndex + 1])
      ) {
        searchedChars =
          searchedChars +
          nextLine[charIndex - 1] +
          nextLine[charIndex] +
          nextLine[charIndex + 1];
      } else if (
        /[0-9]/.test(nextLine[charIndex]) &&
        nextLine[charIndex - 1] === "." &&
        nextLine[charIndex + 1] === "."
      ) {
        searchedChars = nextLine[charIndex];
      } else if (
        /[0-9]/.test(nextLine[charIndex]) &&
        nextLine[charIndex - 1] === "." &&
        /[0-9]/.test(nextLine[charIndex + 1])
      ) {
        searchedChars = nextLine[charIndex] + nextLine[charIndex + 1];
        if (/[0-9]/.test(nextLine[charIndex + 2])) {
          searchedChars += nextLine[charIndex + 2];
        }
      } else if (
        /[0-9]/.test(nextLine[charIndex]) &&
        nextLine[charIndex + 1] === "." &&
        /[0-9]/.test(nextLine[charIndex - 1])
      ) {
        searchedChars = nextLine[charIndex - 1] + nextLine[charIndex];
        if (/[0-9]/.test(nextLine[charIndex - 2])) {
          searchedChars = nextLine[charIndex - 2] + searchedChars;
        }
      } else if (nextLine[charIndex + 1] === ".") {
        let i: number = 1;
        while (/[0-9]/.test(nextLine[charIndex - i]) && i <= 3) {
          searchedChars = nextLine[charIndex - i] + searchedChars;
          i++;
        }
      } else if (nextLine[charIndex - 1] === ".") {
        let i: number = 1;
        while (/[0-9]/.test(nextLine[charIndex + i]) && i <= 3) {
          searchedChars = searchedChars + nextLine[charIndex + i];
          i++;
        }
      }

      if (searchedChars !== "") {
        searchSum += parseInt(searchedChars);
      }

      if (
        nextLine[charIndex] === "." &&
        /[0-9]/.test(nextLine[charIndex - 1]) &&
        /[0-9]/.test(nextLine[charIndex + 1])
      ) {
        let i: number = 1;

        while (/[0-9]/.test(nextLine[charIndex - i]) && i <= 3) {
          searchedChars = nextLine[charIndex - i] + searchedChars;
          i++;
        }
        if (searchedChars !== "") {
          searchSum += parseInt(searchedChars);
        }

        searchedChars = "";
        i = 1;
        while (/[0-9]/.test(nextLine[charIndex + i]) && i <= 3) {
          searchedChars = searchedChars + nextLine[charIndex + i];
          i++;
        }
        if (searchedChars !== "") {
          searchSum += parseInt(searchedChars);
        }
      }
    }

    return searchSum;
  }


console.log(sumOfAllParts("./input3.txt"));

export { sumOfAllParts, searchAround };
