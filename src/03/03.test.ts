import * as fs from 'fs';
import { sumOfAllParts, searchAround } from './03';

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

    const result = sumOfAllParts('./mocked-file.txt');

    expect(result).toBe(4361); 

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

    expect(result).toBe(502);
  });
  it('should handle errors and log them', () => {
    const mockReadFileSync = jest.spyOn(fs, 'readFileSync').mockImplementation(() => {
      throw new Error('Test error');
    });

    const mockConsoleError = jest.spyOn(console, 'error').mockImplementation();

    const result = sumOfAllParts('./nonexistent-file.txt');

    expect(result).toBe(0);
    expect(mockConsoleError).toHaveBeenCalledWith('Error reading the file:', expect.any(Error));

    mockReadFileSync.mockRestore();
    mockConsoleError.mockRestore();
  });
});