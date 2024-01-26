import * as fs from 'fs';
import { sumOfAllGears, searchAround } from './03_part2';

jest.mock('fs');

describe('sumOfAllParts function', () => {
    it('should calculate the sum correctly', () => {
      const fileContent:string = `467..114..
        ...*......
        ..35..633.
        ......#...
        617*......
        .....+.58.
        ..592.....
        ......755.
        ...$.*....
        .664.598..`;
  
        
  
      const trimmedFileContent = fileContent
        .split('\n')
        .map((line) => line.trim())
        .join('\n');
  
      const mockReadFileSync = jest.spyOn(fs, 'readFileSync').mockReturnValue(trimmedFileContent);
  
      const result = sumOfAllGears('./mocked-file.txt');
  
      expect(result).toBe(467835); 
  
      mockReadFileSync.mockRestore();
    });
  });

  describe('searchAround function', () => {
    it('should search around and calculate the sum correctly', () => {
      const lines = [
        '467..114..',
        '...*......',
        '..35..633.',
        '......#...',
        '617*......',
        '.....+.58.',
        '..592.....',
        '......755.',
        '...$.*....',
        '.664.598..',
      ];
  
      const result = searchAround(lines, 1, 3);
  
      expect(result).toBe(16345); 
    });
  });

  describe('searchAround function', () => {
    it('should search around and calculate the sum correctly if the gear is only adjacent to one part number', () => {
      const lines = [
        '467..114..',
        '...*......',
        '..35..633.',
        '......#...',
        '617*......',
        '.....+.58.',
        '..592.....',
        '......755.',
        '...$.*....',
        '.664.598..',
      ];
  
      const result = searchAround(lines, 4, 3);
  
      expect(result).toBe(0); 
    });
  });