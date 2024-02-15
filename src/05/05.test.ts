import * as fs from "fs";
import {
  lowestLocationNumber,
  getMappingFromString,
  getCorrespondNumber,
} from "./05";

jest.mock("fs");

describe("lowestLocationNumber function", () => {
  const mockFsReadFileSync = jest.spyOn(fs, "readFileSync");

  beforeEach(() => {
    mockFsReadFileSync.mockClear();
  });

  it("should return the lowest location number", () => {
    const fileContent: string = `seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4
`;
    const trimmedFileContent = fileContent
      .split("\n")
      .map((line) => line.trim())
      .join("\n");

    const mockReadFileSync = jest
      .spyOn(fs, "readFileSync")
      .mockReturnValue(trimmedFileContent);
    const seeds: number[] = [79, 14, 55, 13];
    const result = lowestLocationNumber("./mocked-file.txt", seeds);

    expect(result).toBe(35);

    mockReadFileSync.mockRestore();
  });
  it('should handle errors and log them', () => {
    const mockReadFileSync = jest.spyOn(fs, 'readFileSync').mockImplementation(() => {
      throw new Error('Test error');
    });

    const mockConsoleError = jest.spyOn(console, 'error').mockImplementation();
    const seeds: number[] = [79, 14, 55, 13];
    const result = lowestLocationNumber('./nonexistent-file.txt', seeds);

    expect(result).toBe(0);
    expect(mockConsoleError).toHaveBeenCalledWith('Error reading the file:', expect.any(Error));

    mockReadFileSync.mockRestore();
    mockConsoleError.mockRestore();
  });
});
