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
function sumOfTotalPoints(filePath) {
    let fileContent;
    try {
        fileContent = fs.readFileSync(filePath, "utf-8");
    }
    catch (err) {
        console.error("Error reading the file:", err);
    }
    const lines = fileContent === null || fileContent === void 0 ? void 0 : fileContent.split(/\r?\n/);
    let sumPoints = 0;
    lines === null || lines === void 0 ? void 0 : lines.forEach((line) => {
        let winnerNumbersString = line
            .split("|")[0]
            .split(":")[1]
            .trim()
            .replace(/\s+/g, " ");
        let ownNumbersString = line
            .split("|")[1]
            .trim()
            .replace(/\s+/g, " ");
        let winnerNumbers = winnerNumbersString.split(" ");
        let ownNumbers = ownNumbersString.split(" ");
        let matches = ownNumbers.filter((item) => winnerNumbers.includes(item));
        if (matches.length !== 0) {
            sumPoints += Math.pow(2, matches.length - 1);
        }
    });
    return sumPoints;
}
console.log(sumOfTotalPoints("./input4.txt"));
exports.default = sumOfTotalPoints;
