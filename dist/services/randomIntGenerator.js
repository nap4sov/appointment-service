"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomIntFromInterval = void 0;
var randomIntFromInterval = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};
exports.randomIntFromInterval = randomIntFromInterval;
