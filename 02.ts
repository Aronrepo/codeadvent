import * as fs from 'fs';

let fileContent: string | undefined; 

const filePath = './input.txt';

try {
  const filePath = './input.txt';

  fileContent = fs.readFileSync(filePath, 'utf-8');

} catch (err) {
  console.error('Error reading the file:', err);
}

//only 12 red cubes, 13 green cubes, and 14 blue cubes
const lines = fileContent?.split(/\r?\n/);


let counter : number = 0;

lines?.forEach((line) => {
    let possible : boolean = true;
    let actualGameNumber : number = parseInt(line.split(':')[0].split(' ')[1]);

    let actualColors : string = line.split(':')[1].trim();
    
    let sets : string[] = actualColors.split(';');
    
    sets.forEach((oneSet) =>  {

        let setArr : String[] = oneSet.split(',').map(a => a.trim());
        setArr.forEach((cube) => {
            if (cube.split(' ')[1] === 'red' && parseInt(cube.split(' ')[0]) > 12)
            {
                possible = false;
            }
            if (cube.split(' ')[1] === 'green' && parseInt(cube.split(' ')[0]) > 13)
            {
                possible = false;
            }
            if (cube.split(' ')[1] === 'blue' && parseInt(cube.split(' ')[0]) > 14)
            {
                possible = false;
            }
        })
        
    })
    if (possible) {
        counter += actualGameNumber;
    }
})

console.log(counter);





