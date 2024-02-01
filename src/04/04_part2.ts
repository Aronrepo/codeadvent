import * as fs from 'fs';

function sumOfTotalScratchcards(filePath: string): number {

let fileContent: string | undefined; 


try {

  fileContent = fs.readFileSync(filePath, 'utf-8');//read input file

} catch (err) {
  console.error('Error reading the file:', err);
}

const lines = fileContent?.split(/\r?\n/);//split input file's lines into arrays

let cardMathes = new Map();

let sumPoints:number = 0;

sumPoints = lines?.length ?? 0; //at least the number of initial cards will be added to the total sum


const cards:number[] = [];//this array will be populated the additional cards which are created if there is a winner
cards.push(0);

const currentCard = cards.shift();//this variable stores the card which has to be examined. In this case this shift will be used once
//iterate through the initial array of lines
    lines?.forEach((line, index) => {
        let winnerNumbersString:string = line.split("|")[0].split(':')[1].trim().replace(/\s+/g, ' ');
        let ownNumbersString:string = line.split("|")[1].trim().replace(/\s+/g, ' ');

        let currentNumberStringArr:string[] = line.split("|")[0].split(':')[0].split(' ');
        let currentNumber:number = parseInt(currentNumberStringArr[currentNumberStringArr.length - 1]);


        let winnerNumbers:string[] = winnerNumbersString.split(' ');
        let ownNumbers:string[] = ownNumbersString.split(' ');


        let matches = ownNumbers.filter((item) => winnerNumbers.includes(item));//get matches

        cardMathes.set(index, matches.length);


        let i:number;
        
        if(currentCard != undefined) {//populate additional cards based on the number of matches
            let numberOfCopies:number = currentCard + matches.length;
            for(i = currentCard; i < numberOfCopies; i++) {
                cards.push(currentNumber + i);
            }
        }
    }
    )

let currentCardIndex:number = 0;
//loop through the additional cards
while(cards.length > currentCardIndex) {
    if(sumPoints) {sumPoints++};
    let currentCard = cards[currentCardIndex];
    
    let line: string | undefined;
    if (currentCard !== undefined) {
        line = lines?.[currentCard];
    }
   

    if(line) {
    
        let i:number;
        
        if(currentCard != undefined) {//populate additional cards based on the number of matches
            for(i = 1; i <= cardMathes.get(currentCard); i++) {
                cards.push(currentCard + i);
            }
        }
    }
    currentCardIndex++;
}
return sumPoints;
}
console.log(sumOfTotalScratchcards("./input4.txt"));


