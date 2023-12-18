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

let sumPoints = lines?.length;


const cards:number[] = [];
cards.push(0);

const currentCard = cards.shift();

    lines?.forEach(line => {
        let winnerNumbersString:string = line.split("|")[0].split(':')[1].trim().replace(/\s+/g, ' ');
        let ownNumbersString:string = line.split("|")[1].trim().replace(/\s+/g, ' ');

        let currentNumberStringArr:string[] = line.split("|")[0].split(':')[0].split(' ');
        let currentNumber:number = parseInt(currentNumberStringArr[currentNumberStringArr.length - 1]);

        //console.log(currentNumber);

        //console.log(winnerNumbers.split(':')[1].trim());

        let winnerNumbers:string[] = winnerNumbersString.split(' ');
        let ownNumbers:string[] = ownNumbersString.split(' ');

        //console.log(winnerNumbers);
        //console.log(ownNumbers);

        let matches = ownNumbers.filter((item) => winnerNumbers.includes(item));

        //console.log(matches.length);

        let i:number;
        //console.log(currentCard);
        
        //console.log(matches.length);
        
        if(currentCard != undefined) {
            let numberOfCopies:number = currentCard + matches.length;
            for(i = currentCard; i < numberOfCopies; i++) {
                cards.push(currentNumber + i);
            }
        }
    }
    )

    //console.log(cards);
    

    

while(cards.length > 0) {
    if(sumPoints) {sumPoints++};
    let currentCard = cards.shift();
    
    //console.log(sumPoints);
    //console.log('asd');
    //if(currentCard == undefined) {currentCard = 0}

    let line: string | undefined;
    if (currentCard !== undefined) {
        line = lines?.[currentCard];
    }
   

    if(line) {
    
        let winnerNumbersString:string = line.split("|")[0].split(':')[1].trim().replace(/\s+/g, ' ');
        let ownNumbersString:string = line.split("|")[1].trim().replace(/\s+/g, ' ');

        //let currentNumberStringArr:string[] = line.split("|")[0].split(':')[0].split(' ');
        //let currentNumber:number = parseInt(currentNumberStringArr[currentNumberStringArr.length - 1]);

        let winnerNumbers:string[] = winnerNumbersString.split(' ');
        let ownNumbers:string[] = ownNumbersString.split(' ');


        let matches = ownNumbers.filter((item) => winnerNumbers.includes(item));


        let i:number;
        
        if(currentCard != undefined) {
            for(i = 1; i <= matches.length; i++) {
                cards.push(currentCard + i);
            }
        }
    }

        
        
    
}
console.log(sumPoints);


