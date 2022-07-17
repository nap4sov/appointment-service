"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
var appRoot = require('app-root-path');
var writeFile = require('fs').writeFile;
var moment = require("moment");
var Appointment = require('../models/Appointment');
var Doctor = require('../models/Doctor');
var User = require('../models/User');
var logger;
(function (logger) {
    var _this = this;
    // logs to a file if active appointment is 23-25 hours ahead
    var dailyReminder = function () { return __awaiter(_this, void 0, void 0, function () {
        var currentDate, startDate, endDate, error_1;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    currentDate = moment().format('MMMM Do YYYY, HH:mm');
                    startDate = (Date.now() + 80000000).toString();
                    endDate = (Date.now() + 90000000).toString();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, Appointment.find({ date: { $gte: startDate, $lte: endDate }, active: true }).then(function (result) {
                            if (!result) {
                                return;
                            }
                            result.map(function (_a) {
                                var date = _a.date, doctor = _a.doctor, user = _a.user;
                                return __awaiter(_this, void 0, void 0, function () {
                                    var doctorSpec, userName, appointmentTime, appointmentDate, message;
                                    return __generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0: return [4 /*yield*/, Doctor.findById({ _id: doctor }).then(function (res) { return res.spec; })];
                                            case 1:
                                                doctorSpec = _b.sent();
                                                return [4 /*yield*/, User.findById({ _id: user }).then(function (res) { return res.name; })];
                                            case 2:
                                                userName = _b.sent();
                                                appointmentTime = moment(Number(date)).format('HH:mm');
                                                appointmentDate = moment(Number(date)).format('MMM_Do_HH:mm');
                                                message = "".concat(currentDate, " | \u041F\u0440\u0438\u0432\u0435\u0442 ").concat(userName, "! \u041D\u0430\u043F\u043E\u043C\u0438\u043D\u0430\u0435\u043C \u0447\u0442\u043E \u0432\u044B \u0437\u0430\u043F\u0438\u0441\u0430\u043D\u044B \u043A ").concat(doctorSpec, " \u0437\u0430\u0432\u0442\u0440\u0430 \u0432 ").concat(appointmentTime, "!");
                                                return [4 /*yield*/, writeFile(appRoot + "/logs/".concat(appointmentDate, "_").concat(userName, ".log"), message, function (err) {
                                                        if (err) {
                                                            throw err;
                                                        }
                                                    })];
                                            case 3:
                                                _b.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                });
                            });
                        })];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.log(error_1.message);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    // logs to a file if active appointment is 117-123 minutes ahead
    var hourlyReminder = function () { return __awaiter(_this, void 0, void 0, function () {
        var currentDate, startDate, endDate, error_2;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    currentDate = moment().format('MMMM Do YYYY, HH:mm');
                    startDate = (Date.now() + 7000000).toString();
                    endDate = (Date.now() + 7400000).toString();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, Appointment.find({ date: { $gte: startDate, $lte: endDate }, active: true }).then(function (result) {
                            if (!result) {
                                return;
                            }
                            result.map(function (_a) {
                                var date = _a.date, doctor = _a.doctor, user = _a.user;
                                return __awaiter(_this, void 0, void 0, function () {
                                    var doctorSpec, userName, appointmentTime, appointmentDate, message;
                                    return __generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0: return [4 /*yield*/, Doctor.findById({ _id: doctor }).then(function (res) { return res.spec; })];
                                            case 1:
                                                doctorSpec = _b.sent();
                                                return [4 /*yield*/, User.findById({ _id: user }).then(function (res) { return res.name; })];
                                            case 2:
                                                userName = _b.sent();
                                                appointmentTime = moment(Number(date)).format('HH:mm');
                                                appointmentDate = moment(Number(date)).format('MMM_Do_HH:mm');
                                                message = "".concat(currentDate, " | \u041F\u0440\u0438\u0432\u0435\u0442 ").concat(userName, "! \u0412\u0430\u043C \u0447\u0435\u0440\u0435\u0437 2 \u0447\u0430\u0441\u0430 \u043A ").concat(doctorSpec, " \u0432 ").concat(appointmentTime, "!");
                                                return [4 /*yield*/, writeFile(appRoot + "/logs/".concat(appointmentDate, "_").concat(userName, ".log"), message, function (err) {
                                                        if (err) {
                                                            throw err;
                                                        }
                                                    })];
                                            case 3:
                                                _b.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                });
                            });
                        })];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.log(error_2.message);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
})(logger = exports.logger || (exports.logger = {}));
