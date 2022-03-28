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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv").config();
var UsersController = /** @class */ (function () {
    function UsersController(usersService) {
        var _this = this;
        this.usersService = usersService;
        this.getUsers = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.usersService
                        .getUsers()
                        .then(function (user) {
                        return res.status(200).json({ user: user });
                    })
                        .catch(function (err) {
                        return res.status(500).json({ error: err });
                    })];
            });
        }); };
        this.createUsers = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                req.body.UploadFileName = (_a = req.file) === null || _a === void 0 ? void 0 : _a.originalname;
                req.body.FilePath = (_b = req.file) === null || _b === void 0 ? void 0 : _b.path;
                return [2 /*return*/, this.usersService
                        .createUsers(req.body)
                        .then(function (user) {
                        return res.status(200).json({ user: user });
                    })
                        .catch(function (err) {
                        console.log(err);
                        return res.status(500).json({ error: err });
                    })];
            });
        }); };
        this.getUserById = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.usersService
                        .getUserById(+req.params.id)
                        .then(function (user) {
                        if (user)
                            return res.status(200).json({ user: user });
                        return res.status(404).json({ error: "User with this UserId not found." });
                    })
                        .catch(function (err) {
                        return res.status(500).json({ error: err });
                    })];
            });
        }); };
        this.authenticate = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var token;
            var _this = this;
            return __generator(this, function (_a) {
                token = req.headers.authorization || req.header('auth');
                return [2 /*return*/, this.usersService
                        .getUserByEmail(req.body.Email)
                        .then(function (user) {
                        if (user) {
                            if (token)
                                jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, function (error, user) {
                                    if (error)
                                        return res.status(303).json({ message: "JWT verification failed. Invalid Credentials." });
                                    else
                                        return _this.usersService
                                            .getUserByEmail(user.userEmail)
                                            .then(function (user) {
                                            if (user === null)
                                                return res.status(401).json({ message: "user not found" });
                                            req.body.CreatedBy = user.UserId;
                                            next();
                                        })
                                            .catch(function (err) {
                                            return res.status(500).json({ error: err });
                                        });
                                });
                            else
                                return res.status(401).json({ message: "You are registered user. Login and then Contact Us" });
                        }
                        else
                            next();
                    })
                        .catch(function (err) {
                        return res.status(500).json({ error: err });
                    })];
            });
        }); };
        this.usersService = usersService;
    }
    return UsersController;
}());
exports.UsersController = UsersController;
