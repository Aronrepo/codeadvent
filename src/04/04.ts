import * as fs from 'fs';

let fileContent: string | undefined; 

const filePath = './input4.txt';

try {
  const filePath = './input4.txt';

  fileContent = fs.readFileSync(filePath, 'utf-8');//read input file

} catch (err) {
  console.error('Error reading the file:', err);
}

const lines = fileContent?.split(/\r?\n/);//split input file's lines into arrays

let sumPoints = 0;
//Iterate over the lines
lines?.forEach(line => {
    let winnerNumbersString:string = line.split("|")[0].split(':')[1].trim().replace(/\s+/g, ' ');//get winner numbers as string 
    let ownNumbersString:string = line.split("|")[1].trim().replace(/\s+/g, ' ');//get own numbers as String

    let winnerNumbers:string[] = winnerNumbersString.split(' ');//put winner numbers into array
    let ownNumbers:string[] = ownNumbersString.split(' ');//put own numbers into array

    let matches = ownNumbers.filter((item) => winnerNumbers.includes(item)); //get matches
    if (matches.length !== 0) {
        sumPoints += Math.pow(2, matches.length - 1);//double the point for every match
        
    }
    
})

console.log(sumPoints);


