import * as fs from 'fs';
import sumOfAllOfTheCalibrationValue from './01'; 

jest.mock('fs');

describe('sumOfAllOfTheCalibrationValue', () => {
  it('should calculate the sum correctly', () => {
    const mockReadFileSync = jest.spyOn(fs, 'readFileSync').mockReturnValue('123abc\n456def\n789ghi');
    // Replace the argument with the actual file content you want to test

    const result = sumOfAllOfTheCalibrationValue('./mocked-file.txt');

    expect(result).toBe(13 + 46 + 79);

    mockReadFileSync.mockRestore();
  });

  it('should handle errors and log them', () => {
    const mockReadFileSync = jest.spyOn(fs, 'readFileSync').mockImplementation(() => {
      throw new Error('Test error');
    });

    const mockConsoleError = jest.spyOn(console, 'error').mockImplementation();

    const result = sumOfAllOfTheCalibrationValue('./nonexistent-file.txt');

    expect(result).toBe(0);
    expect(mockConsoleError).toHaveBeenCalledWith('Error reading the file:', expect.any(Error));

    mockReadFileSync.mockRestore();
    mockConsoleError.mockRestore();
  });
});
