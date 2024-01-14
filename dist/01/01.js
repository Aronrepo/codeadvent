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
const fs = __importStar(require("fs"));
let fileContent;
const filePath = './input1.txt';
try {
    const filePath = './input1.txt';
    fileContent = fs.readFileSync(filePath, 'utf-8');
}
catch (err) {
    console.error('Error reading the file:', err);
}
const lines = fileContent === null || fileContent === void 0 ? void 0 : fileContent.split('\n');
let sumOfLine = 0;
lines === null || lines === void 0 ? void 0 : lines.forEach((line, index) => {
    let actualLine = line;
    let arr = actualLine.split('');
    let firstNumber;
    let lastNumber;
    for (const word of arr) {
        const parsedNumber = parseInt(word);
        if (!isNaN(parsedNumber)) {
            firstNumber = parsedNumber;
            break;
        }
    }
    for (var i = arr.length - 1; i >= 0; i--) {
        const parsedNumber = parseInt(arr[i]);
        if (!isNaN(parsedNumber)) {
            lastNumber = parsedNumber;
            break;
        }
    }
    const firstNumberStr = (firstNumber === null || firstNumber === void 0 ? void 0 : firstNumber.toString()) || '';
    const lastNumberStr = (lastNumber === null || lastNumber === void 0 ? void 0 : lastNumber.toString()) || '';
    const concatenatedString = firstNumberStr + lastNumberStr;
    sumOfLine += parseInt(concatenatedString);
});
console.log(sumOfLine);
