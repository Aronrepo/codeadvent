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
function sumOfTotalScratchcards(filePath) {
    var _a;
    let fileContent;
    try {
        fileContent = fs.readFileSync(filePath, "utf-8");
    }
    catch (err) {
        console.error("Error reading the file:", err);
    }
    const lines = fileContent === null || fileContent === void 0 ? void 0 : fileContent.split(/\r?\n/);
    let cardMathes = new Map();
    let sumPoints = 0;
    sumPoints = (_a = lines === null || lines === void 0 ? void 0 : lines.length) !== null && _a !== void 0 ? _a : 0;
    const cards = [];
    cards.push(0);
    const currentCard = cards.shift();
    lines === null || lines === void 0 ? void 0 : lines.forEach((line, index) => {
        let winnerNumbersString = line
            .split("|")[0]
            .split(":")[1]
            .trim()
            .replace(/\s+/g, " ");
        let ownNumbersString = line
            .split("|")[1]
            .trim()
            .replace(/\s+/g, " ");
        let currentNumberStringArr = line
            .split("|")[0]
            .split(":")[0]
            .split(" ");
        let currentNumber = parseInt(currentNumberStringArr[currentNumberStringArr.length - 1]);
        let winnerNumbers = winnerNumbersString.split(" ");
        let ownNumbers = ownNumbersString.split(" ");
        let matches = ownNumbers.filter((item) => winnerNumbers.includes(item));
        cardMathes.set(index, matches.length);
        let i;
        if (currentCard != undefined) {
            let numberOfCopies = currentCard + matches.length;
            for (i = currentCard; i < numberOfCopies; i++) {
                cards.push(currentNumber + i);
            }
        }
    });
    let currentCardIndex = 0;
    while (cards.length > currentCardIndex) {
        if (sumPoints) {
            sumPoints++;
        }
        let currentCard = cards[currentCardIndex];
        let line;
        if (currentCard !== undefined) {
            line = lines === null || lines === void 0 ? void 0 : lines[currentCard];
        }
        if (line) {
            let i;
            if (currentCard != undefined) {
                for (i = 1; i <= cardMathes.get(currentCard); i++) {
                    cards.push(currentCard + i);
                }
            }
        }
        currentCardIndex++;
    }
    return sumPoints;
}
exports.default = sumOfTotalScratchcards;
console.log(sumOfTotalScratchcards("./input4.txt"));
