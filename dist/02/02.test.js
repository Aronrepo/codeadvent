"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const _02_1 = __importDefault(require("./02"));
jest.mock('fs');
describe('sumOfTheSets', () => {
    it('should calculate the sum correctly', () => {
        const mockedValue = 'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green\nGame 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue';
        const mockReadFileSync = jest.spyOn(fs, 'readFileSync').mockReturnValue(mockedValue);
        const result = (0, _02_1.default)('./mocked-file.txt');
        expect(result).toBe(3);
        mockReadFileSync.mockRestore();
    });
    it('should handle errors and log them', () => {
        const mockReadFileSync = jest.spyOn(fs, 'readFileSync').mockImplementation(() => {
            throw new Error('Test error');
        });
        const mockConsoleError = jest.spyOn(console, 'error').mockImplementation();
        const result = (0, _02_1.default)('./nonexistent-file.txt');
        expect(result).toBe(0);
        expect(mockConsoleError).toHaveBeenCalledWith('Error reading the file:', expect.any(Error));
        mockReadFileSync.mockRestore();
        mockConsoleError.mockRestore();
    });
});
