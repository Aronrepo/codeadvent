import * as fs from 'fs';
import sumOfTheSets from './02';

jest.mock('fs');

describe('sumOfTheSets', () => {
    it('should calculate the sum correctly', () => {
        const mockedValue:string = 'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green\nGame 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue';
      const mockReadFileSync = jest.spyOn(fs, 'readFileSync').mockReturnValue(mockedValue);
  
      const result = sumOfTheSets('./mocked-file.txt');
  
      expect(result).toBe(3);
  
      mockReadFileSync.mockRestore();
    });
  
    it('should handle errors and log them', () => {
      const mockReadFileSync = jest.spyOn(fs, 'readFileSync').mockImplementation(() => {
        throw new Error('Test error');
      });
  
      const mockConsoleError = jest.spyOn(console, 'error').mockImplementation();
  
      const result = sumOfTheSets('./nonexistent-file.txt');
  
      expect(result).toBe(0);
      expect(mockConsoleError).toHaveBeenCalledWith('Error reading the file:', expect.any(Error));
  
      mockReadFileSync.mockRestore();
      mockConsoleError.mockRestore();
    });
  });