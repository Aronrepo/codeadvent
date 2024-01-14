import * as fs from 'fs';

let fileContent: string | undefined; 

const filePath = './input1.txt';

try {
  const filePath = './input1.txt';

  fileContent = fs.readFileSync(filePath, 'utf-8');//read input file

} catch (err) {
  console.error('Error reading the file:', err);
}



const lines = fileContent?.split('\n');//split input files into arrays of 
let sumOfLine : number = 0;
lines?.forEach((line, index) => {//Iterate over the lines
  let actualLine = line;
  let arr = actualLine.split('');//split actual line into a chars of arrays
  let firstNumber : number | undefined; 
  let lastNumber : number | undefined;
  //iterate over the line from the begining and find first number
  for(const word of arr) {
    const parsedNumber = parseInt(word);
  if (!isNaN(parsedNumber)) {
    firstNumber = parsedNumber;
      break;
    }
  }
  //iterate from the end and find the last number
  for (var i = arr.length - 1; i >= 0; i--) {

    const parsedNumber = parseInt(arr[i]);
    if(!isNaN(parsedNumber)) {
      lastNumber = parsedNumber;
      break;
    }
}

//create a valid number from the two numbers
const firstNumberStr = firstNumber?.toString() || '';

const lastNumberStr = lastNumber?.toString() || '';

const concatenatedString = firstNumberStr + lastNumberStr;

//add valid nubmer to the accumulator variable
sumOfLine += parseInt(concatenatedString);


});

console.log(sumOfLine);


