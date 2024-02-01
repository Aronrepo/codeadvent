import * as fs from 'fs';
import sumOfTotalScratchcards from './04_part2';

jest.mock('fs');

describe('sumOfTotalScratchcards function', () => {
    it('should calculate the total points correctly', () => {
      const fileContent:string = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
      Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
      Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
      Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
      Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
      Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;
  
        
  
      const trimmedFileContent = fileContent
        .split('\n')
        .map((line) => line.trim())
        .join('\n');
  
      const mockReadFileSync = jest.spyOn(fs, 'readFileSync').mockReturnValue(trimmedFileContent);
  
      const result = sumOfTotalScratchcards('./mocked-file.txt');
  
      expect(result).toBe(30); 
  
      mockReadFileSync.mockRestore();
    });
    it('should handle errors and log them', () => {
        const mockReadFileSync = jest.spyOn(fs, 'readFileSync').mockImplementation(() => {
          throw new Error('Test error');
        });
    
        const mockConsoleError = jest.spyOn(console, 'error').mockImplementation();
    
        const result = sumOfTotalScratchcards('./nonexistent-file.txt');
    
        expect(result).toBe(0);
        expect(mockConsoleError).toHaveBeenCalledWith('Error reading the file:', expect.any(Error));
    
        mockReadFileSync.mockRestore();
        mockConsoleError.mockRestore();
      });
  });