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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _this = this;
var Appointment = require('../models/Appointment');
var User = require('../models/User');
var Doctor = require('../models/Doctor');
var moment = require('moment');
// API endpoint: /appointments
// method: GET
var getAppointments = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var appointments, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Appointment.find()];
            case 1:
                appointments = _a.sent();
                res.json(appointments);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                res.send(error_1.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// ----- create new appointment -----
// API endpoint: /userId?id=doctorId
// method: PATCH
var createAppointment = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var doctorId, userId, appointment, doctorToAppoint, message_1, appointmentDate, message, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                doctorId = req.query.id;
                userId = req.params.userId;
                appointment = new Appointment({
                    user: userId,
                    doctor: doctorId,
                });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Doctor.findById({ _id: doctorId })];
            case 2:
                doctorToAppoint = _a.sent();
                if (!doctorToAppoint.free) {
                    message_1 = "".concat(doctorToAppoint.name, " cannot accept any more appointments");
                    console.log(message_1);
                    throw new Error(message_1);
                }
                appointment.save();
                appointmentDate = moment(Number(appointment.date)).format('MMMM Do YYYY, HH:mm');
                message = "Appointment scheduled at ".concat(appointmentDate, ", wait for your doctor to approve it");
                console.log(message);
                res.send(message);
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                res.send(error_2.message);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
// ----- approve or decline appointment -----
// API endpoint: /doctorId?id=appointmentId
// request body: { appointments: {active: boolean} }
// method: PATCH
var updateAppointment = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var appointmentId, doctorId, isActive, appointmentToUpdate, appointmentToAdd, currentDoctor, doctorToUpdate, userId, userToUpdate, message, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                appointmentId = req.query.id;
                doctorId = req.params.doctorId;
                isActive = req.body.active;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 12, , 13]);
                return [4 /*yield*/, Appointment.findById({ _id: appointmentId })];
            case 2:
                appointmentToUpdate = _a.sent();
                if (!isActive) {
                    appointmentToUpdate.deleteOne({ _id: appointmentId });
                }
                return [4 /*yield*/, Appointment.updateOne({ _id: appointmentId }, { $set: { active: isActive } })];
            case 3:
                _a.sent();
                return [4 /*yield*/, Appointment.findById({ _id: appointmentId })];
            case 4:
                appointmentToAdd = _a.sent();
                return [4 /*yield*/, Doctor.findById({ _id: doctorId })];
            case 5:
                currentDoctor = _a.sent();
                return [4 /*yield*/, Doctor.updateOne({ _id: doctorId }, {
                        $set: {
                            appointments_accepted: __spreadArray(__spreadArray([], currentDoctor.appointments_accepted, true), [
                                appointmentToAdd,
                            ], false),
                        },
                    })];
            case 6:
                _a.sent();
                return [4 /*yield*/, Doctor.findById({ _id: doctorId })];
            case 7:
                doctorToUpdate = _a.sent();
                if (!(doctorToUpdate.appointments_accepted.length >= 3)) return [3 /*break*/, 9];
                return [4 /*yield*/, Doctor.updateOne({ _id: doctorId }, { $set: { free: false } })];
            case 8:
                _a.sent();
                _a.label = 9;
            case 9:
                userId = appointmentToAdd.user;
                return [4 /*yield*/, User.findById({ _id: userId })];
            case 10:
                userToUpdate = _a.sent();
                return [4 /*yield*/, User.updateOne({ _id: userId }, {
                        $set: {
                            appointments: __spreadArray(__spreadArray([], userToUpdate.appointments, true), [appointmentToAdd], false),
                        },
                    })];
            case 11:
                _a.sent();
                message = "Appointment with id ".concat(appointmentId, " is accepted by doctor");
                console.log(message);
                res.send(message);
                return [3 /*break*/, 13];
            case 12:
                error_3 = _a.sent();
                res.send(error_3.message);
                return [3 /*break*/, 13];
            case 13: return [2 /*return*/];
        }
    });
}); };
// ----- delete appointment by id (from appointments collection only)-----
// API endpoint: /appointmentId
// method: DELETE
var deleteAppointment = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var appointmentId, message, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                appointmentId = req.params.appointmentId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Appointment.deleteOne({ _id: appointmentId })];
            case 2:
                _a.sent();
                message = "Appointment with id ".concat(appointmentId, " is deleted");
                console.log(message);
                res.send(message);
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                res.send(error_4.message);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
module.exports = { getAppointments: getAppointments, createAppointment: createAppointment, updateAppointment: updateAppointment, deleteAppointment: deleteAppointment };
