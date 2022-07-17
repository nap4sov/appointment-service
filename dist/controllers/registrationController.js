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
var _this = this;
var User = require('../models/User');
var Doctor = require('../models/Doctor');
// API endpoint: /register
// request body: { name: '', email: '', phone: '', type: 'user' | 'doc' }
// method: POST
var handleRegistration = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var _a, email, phone, name, type, existingEmail, doctor, savedDoctor, existingEmail, user, savedUser, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, phone = _a.phone, name = _a.name, type = _a.type;
                if (!email || !phone || !name || !type) {
                    return [2 /*return*/, res.status(400).send('All the fields must be filled')];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 8, , 9]);
                if (!(type === 'doc')) return [3 /*break*/, 4];
                return [4 /*yield*/, Doctor.findOne({ email: email })];
            case 2:
                existingEmail = _b.sent();
                if (existingEmail) {
                    console.log('A doctor with this email already exists');
                    return [2 /*return*/, res.status(400).send('A doctor with this email already exists')];
                }
                doctor = new Doctor({
                    email: email,
                    phone: phone,
                    name: name,
                    type: type,
                });
                return [4 /*yield*/, doctor.save()];
            case 3:
                savedDoctor = _b.sent();
                console.log("Successfully registered doctor ".concat(doctor.name));
                res.json(savedDoctor);
                return [3 /*break*/, 7];
            case 4: return [4 /*yield*/, User.findOne({ email: email })];
            case 5:
                existingEmail = _b.sent();
                if (existingEmail) {
                    console.log('A user with this email already exists');
                    return [2 /*return*/, res.status(400).send('A user with this email already exists')];
                }
                user = new User({
                    email: email,
                    phone: phone,
                    name: name,
                    type: type,
                });
                return [4 /*yield*/, user.save()];
            case 6:
                savedUser = _b.sent();
                console.log("Successfully registered user ".concat(user.name));
                res.json(savedUser);
                _b.label = 7;
            case 7: return [3 /*break*/, 9];
            case 8:
                error_1 = _b.sent();
                res.send(error_1.message);
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); };
module.exports = handleRegistration;
