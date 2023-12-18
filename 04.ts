import * as fs from 'fs';

let fileContent: string | undefined; 

const filePath = './input.txt';

try {
  const filePath = './input.txt';

  fileContent = fs.readFileSync(filePath, 'utf-8');

} catch (err) {
  console.error('Error reading the file:', err);
}

const lines = fileContent?.split(/\r?\n/);

let sumPoints = 0;

lines?.forEach(line => {
    let winnerNumbersString:string = line.split("|")[0].split(':')[1].trim().replace(/\s+/g, ' ');
    let ownNumbersString:string = line.split("|")[1].trim().replace(/\s+/g, ' ');

    //console.log(winnerNumbers.split(':')[1].trim());

    let winnerNumbers:string[] = winnerNumbersString.split(' ');
    let ownNumbers:string[] = ownNumbersString.split(' ');

    //console.log(winnerNumbers);
    //console.log(ownNumbers);

    let matches = ownNumbers.filter((item) => winnerNumbers.includes(item));
    if (matches.length !== 0) {
        sumPoints += Math.pow(2, matches.length - 1);
        
    }
    
})

console.log(sumPoints);


