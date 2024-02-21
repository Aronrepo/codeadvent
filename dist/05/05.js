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
exports.getCorrespondNumber = exports.getLowestLocationFromSeed = exports.getMappingFromString = exports.lowestLocationNumber = void 0;
const fs = __importStar(require("fs"));
function lowestLocationNumber(filePath, seeds) {
    let fileContent;
    try {
        fileContent = fs.readFileSync(filePath, "utf-8");
    }
    catch (err) {
        console.error("Error reading the file:", err);
        return 0;
    }
    const lines = fileContent === null || fileContent === void 0 ? void 0 : fileContent.split(/\r?\n/);
    if (!lines) {
        console.error("Error splitting file content into lines");
        return 0;
    }
    const maps = getMappingFromString(lines);
    return getLowestLocationFromSeed(maps, seeds);
}
exports.lowestLocationNumber = lowestLocationNumber;
console.log(lowestLocationNumber("./input5.txt", [2041142901, 113138307, 302673608, 467797997, 1787644422, 208119536, 143576771,
    99841043, 4088720102, 111819874, 946418697, 13450451, 3459931852, 262303791, 2913410855, 533641609, 2178733435,
    26814354, 1058342395, 175406592]));
function getMappingFromString(lines) {
    let result = [];
    for (let i = 0; i < lines.length; i++) {
        let pattern1 = /^[a-zA-Z]/;
        let pattern2 = /^$/;
        let pattern3 = /^\d/;
        let mapLine = [];
        let mapLineIndex = 0;
        if (pattern1.test(lines[i])) {
            while (!pattern2.test(lines[mapLineIndex + i])) {
                let actualNumberArr = [];
                if (pattern3.test(lines[mapLineIndex + i])) {
                    actualNumberArr = lines[mapLineIndex + i].split(' ').map((item) => parseInt(item));
                    mapLine.push(actualNumberArr);
                }
                mapLineIndex++;
            }
            result.push(mapLine);
        }
    }
    return result;
}
exports.getMappingFromString = getMappingFromString;
function getLowestLocationFromSeed(maps, seeds) {
    let lowestNumber = Number.POSITIVE_INFINITY;
    for (const seed of seeds) {
        let locationNumber = seed;
        for (const actualMap of maps) {
            locationNumber = getCorrespondNumber(actualMap, locationNumber);
        }
        if (locationNumber < lowestNumber) {
            lowestNumber = locationNumber;
        }
    }
    return lowestNumber;
}
exports.getLowestLocationFromSeed = getLowestLocationFromSeed;
function getCorrespondNumber(actualMap, seed) {
    for (const map of actualMap) {
        if (seed >= map[1] && seed <= map[1] + map[2]) {
            return map[0] + seed - map[1];
        }
    }
    return seed;
}
exports.getCorrespondNumber = getCorrespondNumber;
