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
function sumOfTheSets(filePath) {
    let fileContent;
    try {
        fileContent = fs.readFileSync(filePath, "utf-8");
    }
    catch (err) {
        console.error("Error reading the file:", err);
    }
    const lines = fileContent === null || fileContent === void 0 ? void 0 : fileContent.split(/\r?\n/);
    let counter = 0;
    lines === null || lines === void 0 ? void 0 : lines.forEach((line) => {
        let possible = true;
        let actualGameNumber = parseInt(line.split(":")[0].split(" ")[1]);
        let actualColors = line.split(":")[1].trim();
        let sets = actualColors.split(";");
        sets.forEach((oneSet) => {
            let setArr = oneSet.split(",").map((a) => a.trim());
            setArr.forEach((cube) => {
                if (cube.split(" ")[1] === "red" &&
                    parseInt(cube.split(" ")[0]) > 12) {
                    possible = false;
                }
                if (cube.split(" ")[1] === "green" &&
                    parseInt(cube.split(" ")[0]) > 13) {
                    possible = false;
                }
                if (cube.split(" ")[1] === "blue" &&
                    parseInt(cube.split(" ")[0]) > 14) {
                    possible = false;
                }
            });
        });
        if (possible) {
            counter += actualGameNumber;
        }
    });
    return counter;
}
console.log(sumOfTheSets("./input2.txt"));
exports.default = sumOfTheSets;
