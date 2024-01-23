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
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchAround = exports.sumOfAllParts = void 0;
const fs = __importStar(require("fs"));
function sumOfAllParts(filePath) {
    let fileContent;
    try {
        fileContent = fs.readFileSync(filePath, "utf-8");
    }
    catch (err) {
        console.error("Error reading the file:", err);
    }
    const lines = fileContent === null || fileContent === void 0 ? void 0 : fileContent.split(/\r?\n/);
    let sum = 0;
    lines === null || lines === void 0 ? void 0 : lines.forEach((line, lineIndex) => {
        let lineArr = line.split("");
        lineArr.forEach((char, charIndex) => {
            if (!/[0-9.]/.test(char) && lineIndex > 0) {
                sum += searchAround(lines, lineIndex, charIndex);
            }
        });
    });
    return sum;
}
exports.sumOfAllParts = sumOfAllParts;
function searchAround(lines, lineIndex, charIndex) {
    let searchSum = 0;
    let searchedChars = "";
    if (lines) {
        for (let i = 1; i <= 3; i++) {
            let actualLine = lines[lineIndex].split("");
            if (/[0-9]/.test(actualLine[charIndex - i])) {
                searchedChars = actualLine[charIndex - i] + searchedChars;
            }
            else {
                break;
            }
        }
        if (searchedChars !== "") {
            searchSum += parseInt(searchedChars);
        }
        searchedChars = "";
        for (let i = 1; i <= 3; i++) {
            let actualLine = lines[lineIndex].split("");
            if (/[0-9]/.test(actualLine[charIndex + i])) {
                searchedChars = searchedChars + actualLine[charIndex + i];
            }
            else {
                break;
            }
        }
        if (searchedChars !== "") {
            searchSum += parseInt(searchedChars);
        }
        searchedChars = "";
        let previousLine = lines[lineIndex - 1].split("");
        if (/[0-9]/.test(previousLine[charIndex]) &&
            /[0-9]/.test(previousLine[charIndex - 1]) &&
            /[0-9]/.test(previousLine[charIndex + 1])) {
            searchedChars =
                searchedChars +
                    previousLine[charIndex - 1] +
                    previousLine[charIndex] +
                    previousLine[charIndex + 1];
        }
        else if (/[0-9]/.test(previousLine[charIndex]) &&
            previousLine[charIndex - 1] === "." &&
            previousLine[charIndex + 1] === ".") {
            searchedChars = previousLine[charIndex];
        }
        else if (/[0-9]/.test(previousLine[charIndex]) &&
            previousLine[charIndex - 1] === "." &&
            /[0-9]/.test(previousLine[charIndex + 1])) {
            searchedChars = previousLine[charIndex] + previousLine[charIndex + 1];
            if (/[0-9]/.test(previousLine[charIndex + 2])) {
                searchedChars += previousLine[charIndex + 2];
            }
        }
        else if (/[0-9]/.test(previousLine[charIndex]) &&
            previousLine[charIndex + 1] === "." &&
            /[0-9]/.test(previousLine[charIndex - 1])) {
            searchedChars = previousLine[charIndex - 1] + previousLine[charIndex];
            if (/[0-9]/.test(previousLine[charIndex - 2])) {
                searchedChars = previousLine[charIndex - 2] + searchedChars;
            }
        }
        else if (previousLine[charIndex + 1] === ".") {
            let i = 1;
            while (/[0-9]/.test(previousLine[charIndex - i]) && i <= 3) {
                searchedChars = previousLine[charIndex - i] + searchedChars;
                i++;
            }
            i = 1;
            while (/[0-9]/.test(previousLine[charIndex + i]) && i <= 3) {
                searchedChars = searchedChars + previousLine[charIndex + i];
                i++;
            }
        }
        else if (previousLine[charIndex - 1] === ".") {
            let i = 1;
            while (/[0-9]/.test(previousLine[charIndex + i]) && i <= 3) {
                searchedChars = searchedChars + previousLine[charIndex + i];
                i++;
            }
            i = 1;
            while (/[0-9]/.test(previousLine[charIndex - i]) && i <= 3) {
                searchedChars = previousLine[charIndex - i] + searchedChars;
                i++;
            }
        }
        if (searchedChars !== "") {
            searchSum += parseInt(searchedChars);
        }
        if (previousLine[charIndex] === "." &&
            /[0-9]/.test(previousLine[charIndex - 1]) &&
            /[0-9]/.test(previousLine[charIndex + 1])) {
            let i = 1;
            while (/[0-9]/.test(previousLine[charIndex - i]) && i <= 3) {
                searchedChars = previousLine[charIndex - i] + searchedChars;
                i++;
            }
            if (searchedChars !== "") {
                searchSum += parseInt(searchedChars);
            }
            searchedChars = "";
            i = 1;
            while (/[0-9]/.test(previousLine[charIndex + i]) && i <= 3) {
                searchedChars = searchedChars + previousLine[charIndex + i];
                i++;
            }
            if (searchedChars !== "") {
                searchSum += parseInt(searchedChars);
            }
        }
        searchedChars = "";
        let nextLine = lines[lineIndex + 1].split("");
        if (/[0-9]/.test(nextLine[charIndex]) &&
            /[0-9]/.test(nextLine[charIndex - 1]) &&
            /[0-9]/.test(nextLine[charIndex + 1])) {
            searchedChars =
                searchedChars +
                    nextLine[charIndex - 1] +
                    nextLine[charIndex] +
                    nextLine[charIndex + 1];
        }
        else if (/[0-9]/.test(nextLine[charIndex]) &&
            nextLine[charIndex - 1] === "." &&
            nextLine[charIndex + 1] === ".") {
            searchedChars = nextLine[charIndex];
        }
        else if (/[0-9]/.test(nextLine[charIndex]) &&
            nextLine[charIndex - 1] === "." &&
            /[0-9]/.test(nextLine[charIndex + 1])) {
            searchedChars = nextLine[charIndex] + nextLine[charIndex + 1];
            if (/[0-9]/.test(nextLine[charIndex + 2])) {
                searchedChars += nextLine[charIndex + 2];
            }
        }
        else if (/[0-9]/.test(nextLine[charIndex]) &&
            nextLine[charIndex + 1] === "." &&
            /[0-9]/.test(nextLine[charIndex - 1])) {
            searchedChars = nextLine[charIndex - 1] + nextLine[charIndex];
            if (/[0-9]/.test(nextLine[charIndex - 2])) {
                searchedChars = nextLine[charIndex - 2] + searchedChars;
            }
        }
        else if (nextLine[charIndex + 1] === ".") {
            let i = 1;
            while (/[0-9]/.test(nextLine[charIndex - i]) && i <= 3) {
                searchedChars = nextLine[charIndex - i] + searchedChars;
                i++;
            }
            i = 1;
            while (/[0-9]/.test(nextLine[charIndex + i]) && i <= 3) {
                searchedChars = searchedChars + nextLine[charIndex + i];
                i++;
            }
        }
        else if (nextLine[charIndex - 1] === ".") {
            let i = 1;
            while (/[0-9]/.test(nextLine[charIndex + i]) && i <= 3) {
                searchedChars = searchedChars + nextLine[charIndex + i];
                i++;
            }
            i = 1;
            while (/[0-9]/.test(nextLine[charIndex - i]) && i <= 3) {
                searchedChars = nextLine[charIndex - i] + searchedChars;
                i++;
            }
        }
        if (searchedChars !== "") {
            searchSum += parseInt(searchedChars);
        }
        if (nextLine[charIndex] === "." &&
            /[0-9]/.test(nextLine[charIndex - 1]) &&
            /[0-9]/.test(nextLine[charIndex + 1])) {
            let i = 1;
            while (/[0-9]/.test(nextLine[charIndex - i]) && i <= 3) {
                searchedChars = nextLine[charIndex - i] + searchedChars;
                i++;
            }
            if (searchedChars !== "") {
                searchSum += parseInt(searchedChars);
            }
            searchedChars = "";
            i = 1;
            while (/[0-9]/.test(nextLine[charIndex + i]) && i <= 3) {
                searchedChars = searchedChars + nextLine[charIndex + i];
                i++;
            }
            if (searchedChars !== "") {
                searchSum += parseInt(searchedChars);
            }
        }
    }
    return searchSum;
}
exports.searchAround = searchAround;
console.log(sumOfAllParts("./input3.txt"));
