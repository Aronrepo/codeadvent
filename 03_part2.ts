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

let sum : number = 0;

lines?.forEach((line, lineIndex) => {

    let lineArr : string[] = line.split('');
    lineArr.forEach((char, charIndex) => {
        if(char === '*' && lineIndex > 0) {
            
            sum += searchAround(lines, lineIndex, charIndex)
            
        }
        
    })

})

console.log(sum);


function searchAround(lines: string[] | undefined, lineIndex : number, charIndex : number) : number {
    let searchSum : number = 1;
    let searchedChars : string = '';
    let numberOfGears : number = 0;

    if(lines) {
        
        for(let i = 1; i <=3; i++) {
            let actualLine = lines[lineIndex].split('');
            if (/[0-9]/.test(actualLine[charIndex - i])) {
                searchedChars = actualLine[charIndex - i] + searchedChars
                
            } else {
                break;
            }
            
        }

        if(searchedChars !== '') {
            searchSum *= parseInt(searchedChars);
            numberOfGears ++;
        }
        console.log(searchedChars);
        

        searchedChars = '';

        for(let i = 1; i <=3; i++) {
            let actualLine = lines[lineIndex].split('');
            if (/[0-9]/.test(actualLine[charIndex + i])) {
                searchedChars = searchedChars + actualLine[charIndex + i];
                
            } else {
                break;
            }
            
        }

        if(searchedChars !== '') {
            searchSum *= parseInt(searchedChars);
            numberOfGears ++;
        } 
        console.log(searchedChars);
        searchedChars = '';

        let previousLine = lines[lineIndex - 1].split('');

        if(/[0-9]/.test(previousLine[charIndex]) && /[0-9]/.test(previousLine[charIndex - 1]) && /[0-9]/.test(previousLine[charIndex + 1])) {
            searchedChars = searchedChars + previousLine[charIndex - 1] + previousLine[charIndex] + previousLine[charIndex + 1];
        } else if (/[0-9]/.test(previousLine[charIndex]) && previousLine[charIndex - 1] === '.' && previousLine[charIndex + 1] === '.') {
            searchedChars = previousLine[charIndex];
        } else if (/[0-9]/.test(previousLine[charIndex]) && previousLine[charIndex - 1] === '.' && /[0-9]/.test(previousLine[charIndex + 1])) {
            searchedChars = previousLine[charIndex] + previousLine[charIndex + 1];
            if(/[0-9]/.test(previousLine[charIndex + 2])) {searchedChars += previousLine[charIndex + 2]}
        } else if (/[0-9]/.test(previousLine[charIndex]) && previousLine[charIndex + 1] === '.' && /[0-9]/.test(previousLine[charIndex - 1])) {
            searchedChars = previousLine[charIndex - 1] + previousLine[charIndex];
            if(/[0-9]/.test(previousLine[charIndex - 2])) {searchedChars = previousLine[charIndex - 2] + searchedChars}
        } else if (previousLine[charIndex + 1] === '.'){
            let i:number = 1;
            while(/[0-9]/.test(previousLine[charIndex - i]) && i <= 3) {
                searchedChars = previousLine[charIndex - i] + searchedChars;
            i++;
            }
            i = 1;
            while(/[0-9]/.test(previousLine[charIndex + i]) && i <= 3) {
                searchedChars = searchedChars + previousLine[charIndex + i];
            i++;
            }

        } else if (previousLine[charIndex - 1] === '.'){
            let i:number = 1;
            while(/[0-9]/.test(previousLine[charIndex + i]) && i <= 3) {
                searchedChars = searchedChars + previousLine[charIndex + i];
            i++;
            }
            i = 1;
            while(/[0-9]/.test(previousLine[charIndex - i]) && i <= 3) {
                searchedChars = previousLine[charIndex - i] + searchedChars;
            i++;
            }
        }

        if(searchedChars !== '') {
            searchSum *= parseInt(searchedChars);
            numberOfGears ++;
        } 

        if(previousLine[charIndex] === '.' && /[0-9]/.test(previousLine[charIndex - 1]) && /[0-9]/.test(previousLine[charIndex + 1]) ) {
            
            let i:number = 1;

            while(/[0-9]/.test(previousLine[charIndex - i]) && i <= 3) {
                searchedChars = previousLine[charIndex - i] + searchedChars;
            i++;
            }
            if(searchedChars !== '') {
                searchSum *= parseInt(searchedChars);
                numberOfGears ++;
            } 
            console.log(searchedChars);
            
            searchedChars = ''
            i = 1;
            while(/[0-9]/.test(previousLine[charIndex + i]) && i <= 3) {
                searchedChars = searchedChars + previousLine[charIndex + i];
            i++;
            }
            if(searchedChars !== '') {
                searchSum *= parseInt(searchedChars);
                numberOfGears ++;
            } 
            console.log(searchedChars);
            
        }


        searchedChars = ''
        
        let nextLine = lines[lineIndex + 1].split('');

        if(/[0-9]/.test(nextLine[charIndex]) && /[0-9]/.test(nextLine[charIndex - 1]) && /[0-9]/.test(nextLine[charIndex + 1])) {
            searchedChars = searchedChars + nextLine[charIndex - 1] + nextLine[charIndex] + nextLine[charIndex + 1];
        } else if (/[0-9]/.test(nextLine[charIndex]) && nextLine[charIndex - 1] === '.' && nextLine[charIndex + 1] === '.') {
            searchedChars = nextLine[charIndex];
        } else if (/[0-9]/.test(nextLine[charIndex]) && nextLine[charIndex - 1] === '.' && /[0-9]/.test(nextLine[charIndex + 1])) {
            searchedChars = nextLine[charIndex] + nextLine[charIndex + 1];
            if(/[0-9]/.test(nextLine[charIndex + 2])) {searchedChars += nextLine[charIndex + 2]}
        } else if (/[0-9]/.test(nextLine[charIndex]) && nextLine[charIndex + 1] === '.' && /[0-9]/.test(nextLine[charIndex - 1])) {
            searchedChars = nextLine[charIndex - 1] + nextLine[charIndex];
            if(/[0-9]/.test(nextLine[charIndex - 2])) {searchedChars = nextLine[charIndex - 2] + searchedChars}
        } else if (nextLine[charIndex + 1] === '.'){
            let i:number = 1;
            while(/[0-9]/.test(nextLine[charIndex - i]) && i <= 3) {
                searchedChars = nextLine[charIndex - i] + searchedChars;
            i++;
            }
            i = 1;
            while(/[0-9]/.test(nextLine[charIndex + i]) && i <= 3) {
                searchedChars = searchedChars + nextLine[charIndex + i];
            i++;
            }

        } else if (nextLine[charIndex - 1] === '.'){
            let i:number = 1;
            while(/[0-9]/.test(nextLine[charIndex + i]) && i <= 3) {
                searchedChars = searchedChars + nextLine[charIndex + i];
            i++;
            }
            i = 1;
            while(/[0-9]/.test(nextLine[charIndex - i]) && i <= 3) {
                searchedChars = nextLine[charIndex - i] + searchedChars;
            i++;
            }
        }

        if(searchedChars !== '') {
            searchSum *= parseInt(searchedChars);
            numberOfGears ++;
        } 
        
        if(nextLine[charIndex] === '.' && /[0-9]/.test(nextLine[charIndex - 1]) && /[0-9]/.test(nextLine[charIndex + 1]) ) {
            
            let i:number = 1;

            while(/[0-9]/.test(nextLine[charIndex - i]) && i <= 3) {
                searchedChars = nextLine[charIndex - i] + searchedChars;
            i++;
            }
            if(searchedChars !== '') {
                searchSum *= parseInt(searchedChars);
                numberOfGears ++;
            } 
            console.log(searchedChars);
            
            searchedChars = ''
            i = 1;
            while(/[0-9]/.test(nextLine[charIndex + i]) && i <= 3) {
                searchedChars = searchedChars + nextLine[charIndex + i];
            i++;
            }
            if(searchedChars !== '') {
                searchSum *= parseInt(searchedChars);
                numberOfGears ++;
            } 
            console.log(searchedChars);
            
        }



        
    }
    if (numberOfGears === 2) {
        return searchSum;
    }
    return 0;
}
