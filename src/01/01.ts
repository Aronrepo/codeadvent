import * as fs from 'fs';

let fileContent: string | undefined; 

const filePath = './input1.txt';

try {
  const filePath = './input1.txt';

  fileContent = fs.readFileSync(filePath, 'utf-8');

} catch (err) {
  console.error('Error reading the file:', err);
}



const lines = fileContent?.split('\n');
let sumOfLine : number = 0;
lines?.forEach((line, index) => {
  let actualLine = line;
  let arr = actualLine.split('');
  
  let firstNumber : number | undefined;
  let lastNumber : number | undefined;
  for(const word of arr) {
    const parsedNumber = parseInt(word);
  if (!isNaN(parsedNumber)) {
    firstNumber = parsedNumber;
      break;
    }
  }

  for (var i = arr.length - 1; i >= 0; i--) {

    const parsedNumber = parseInt(arr[i]);
    if(!isNaN(parsedNumber)) {
      lastNumber = parsedNumber;
      break;
    }
}
const firstNumberStr = firstNumber?.toString() || '';

const lastNumberStr = lastNumber?.toString() || '';

const concatenatedString = firstNumberStr + lastNumberStr;
sumOfLine += parseInt(concatenatedString);
//console.log(firstNumber);
//console.log(lastNumber);


});

console.log(sumOfLine);


