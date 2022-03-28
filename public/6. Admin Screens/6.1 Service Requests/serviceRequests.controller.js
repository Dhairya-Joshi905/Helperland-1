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
exports.ServiceRequestController = void 0;
var mailgun_js_1 = __importDefault(require("mailgun-js"));
require("dotenv").config();
var mg = (0, mailgun_js_1.default)({
    apiKey: process.env.MAILGUN_API,
    domain: process.env.MAILGUN_DOMAIN,
});
var ServiceRequestController = /** @class */ (function () {
    function ServiceRequestController(srService) {
        var _this = this;
        this.srService = srService;
        this.getAllSR = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (req.body.userTypeId === 2 && req.body.userId)
                    return [2 /*return*/, this.srService
                            .getAllSR()
                            .then(function (srArray) {
                            if (srArray && srArray.length > 0)
                                return res.status(200).json(srArray);
                            else
                                return res.status(404).json({ message: "service requests not found" });
                        })
                            .catch(function (err) {
                            console.log(err);
                            return res.status(500).json({ error: err });
                        })];
                else
                    return [2 /*return*/, res.status(401).json({ message: "unauthorised user" })];
                return [2 /*return*/];
            });
        }); };
        this.filteredSR = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var filters;
            var _this = this;
            return __generator(this, function (_a) {
                filters = req.body;
                if (req.body.userTypeId === 2)
                    return [2 /*return*/, this.srService
                            .getAllSR()
                            .then(function (srArray) { return __awaiter(_this, void 0, void 0, function () {
                            var filteredArray;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!(srArray && srArray.length > 0)) return [3 /*break*/, 2];
                                        return [4 /*yield*/, this.srService.filterData(srArray, filters)];
                                    case 1:
                                        filteredArray = _a.sent();
                                        return [2 /*return*/, res.status(200).json(filteredArray)];
                                    case 2: return [2 /*return*/, res.status(404).json({ message: "service requests not found" })];
                                }
                            });
                        }); })
                            .catch(function (err) {
                            console.log(err);
                            return res.status(500).json({ error: err });
                        })];
                else
                    return [2 /*return*/, res.status(401).json({ message: "Unauthorised User" })];
                return [2 /*return*/];
            });
        }); };
        this.cancelSR = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (req.body.userTypeId === 2) {
                    if (req.params.requestId)
                        return [2 /*return*/, this.srService
                                .getSRById(req.params.requestId)
                                .then(function (serviceRequest) { return __awaiter(_this, void 0, void 0, function () {
                                var _this = this;
                                return __generator(this, function (_a) {
                                    if (serviceRequest) {
                                        if (serviceRequest.Status === 3)
                                            return [2 /*return*/, res.status(401).json({ message: "completed service request can not cancel." })];
                                        else if (serviceRequest.Status === 4)
                                            return [2 /*return*/, res.status(401).json({ message: "service request already cancelled." })];
                                        else if (serviceRequest.Status === 5)
                                            return [2 /*return*/, res.status(401).json({ message: "service request already refunded." })];
                                        else
                                            return [2 /*return*/, this.srService
                                                    .updateSR(req.params.requestId, req.body.userId)
                                                    .then(function (updatedSRArray) { return __awaiter(_this, void 0, void 0, function () {
                                                    var emailArray, e, email;
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0:
                                                                if (!(updatedSRArray[0] === 1)) return [3 /*break*/, 2];
                                                                return [4 /*yield*/, this.srService.getCustAndSPEmail(serviceRequest)];
                                                            case 1:
                                                                emailArray = _a.sent();
                                                                // console.log(email);
                                                                for (e in emailArray) {
                                                                    email = this.srService.createEmailForCancelSR(emailArray[e], serviceRequest.ServiceRequestId);
                                                                    mg.messages().send(email, function (err) {
                                                                        if (err)
                                                                            return res.json({ error: err.message });
                                                                    });
                                                                }
                                                                return [2 /*return*/, res.status(200).json({ message: "service request cancelled successfully." })];
                                                            case 2: return [2 /*return*/, res.status(422).json({ message: "errr in cancelling request." })];
                                                        }
                                                    });
                                                }); })
                                                    .catch(function (err) {
                                                    console.log(err);
                                                    return res.status(500).json({ error: err });
                                                })];
                                    }
                                    else
                                        return [2 /*return*/, res.status(200).json({ message: "service request not found" })];
                                    return [2 /*return*/];
                                });
                            }); })
                                .catch(function (err) {
                                console.log(err);
                                return res.status(500).json({ error: err });
                            })];
                    else
                        return [2 /*return*/, res.status(422).json({ message: "ServiceRequestId not found in request" })];
                }
                else
                    return [2 /*return*/, res.status(401).json({ message: "Unauthorised User" })];
                return [2 /*return*/];
            });
        }); };
        this.editSR = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (req.body.userTypeId === 2) {
                    if (req.body.ServiceRequestId)
                        return [2 /*return*/, this.srService
                                .getSRById(req.body.ServiceRequestId)
                                .then(function (serviceRequest) { return __awaiter(_this, void 0, void 0, function () {
                                var _this = this;
                                return __generator(this, function (_a) {
                                    if (serviceRequest) {
                                        req.body.serviceRequest = serviceRequest;
                                        if (serviceRequest.Status === 1 || serviceRequest.Status === 2) {
                                            return [2 /*return*/, this.srService
                                                    .updateSRAddress(req.body)
                                                    .then(function (updatedRequest) { return __awaiter(_this, void 0, void 0, function () {
                                                    return __generator(this, function (_a) {
                                                        if (updatedRequest) {
                                                            if (updatedRequest[0] === 1) {
                                                                req.body.updatedAddress = true;
                                                                next();
                                                            }
                                                            else
                                                                return [2 /*return*/, res.status(422).json({ message: "error in updating address" })];
                                                        }
                                                        else {
                                                            req.body.updatedAddress = false;
                                                            next();
                                                        }
                                                        return [2 /*return*/];
                                                    });
                                                }); })
                                                    .catch(function (err) {
                                                    console.log(err);
                                                    return res.status(500).json({ error: err });
                                                })];
                                        }
                                        else
                                            return [2 /*return*/, res.status(401).json({ message: "completed or cancelled service request can not edit or reschedule." })];
                                    }
                                    else
                                        return [2 /*return*/, res.status(200).json({ message: "service request not found" })];
                                    return [2 /*return*/];
                                });
                            }); })
                                .catch(function (err) {
                                console.log(err);
                                return res.status(500).json({ error: err });
                            })];
                    else
                        return [2 /*return*/, res.status(422).json({ message: "ServiceRequestId not found" })];
                }
                else
                    return [2 /*return*/, res.status(401).json({ message: "Unauthorised User" })];
                return [2 /*return*/];
            });
        }); };
        this.rescheduleSR = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var isSame, isGreater, emailArray, e, email;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.srService.checkIfRescheduledDateIsSame(req.body)];
                    case 1:
                        isSame = _a.sent();
                        if (!(isSame === false)) return [3 /*break*/, 2];
                        isGreater = this.srService.compareDateWithCurrentDate(req.body.ServiceStartDate);
                        if (isGreater)
                            return [2 /*return*/, this.srService
                                    .rescheduleSR(req.body, req.body.userId)
                                    .then(function (rescheduledServiceRequest) { return __awaiter(_this, void 0, void 0, function () {
                                    var emailArray, e, email, e, email;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                if (!(rescheduledServiceRequest[0] === 1)) return [3 /*break*/, 2];
                                                return [4 /*yield*/, this.srService.getCustAndSPEmail(req.body.serviceRequest)];
                                            case 1:
                                                emailArray = _a.sent();
                                                if (req.body.updatedAddress)
                                                    for (e in emailArray) {
                                                        email = this.srService.createEmailForUpdatedSR(emailArray[e], req.body);
                                                        mg.messages().send(email, function (err) {
                                                            if (err)
                                                                return res.json({ error: err.message });
                                                        });
                                                    }
                                                else
                                                    for (e in emailArray) {
                                                        email = this.srService.createEmailForRescheduleSR(emailArray[e], req.body);
                                                        mg.messages().send(email, function (err) {
                                                            if (err)
                                                                return res.json({ error: err.message });
                                                        });
                                                    }
                                                return [2 /*return*/, res.status(200).json({ message: 'service request updated successfully.' })];
                                            case 2: return [2 /*return*/, res.status(422).json({ message: "error in rescheduling service request" })];
                                        }
                                    });
                                }); })
                                    .catch(function (err) {
                                    console.log(err);
                                    return res.status(500).json({ error: err });
                                })];
                        else
                            return [2 /*return*/, res.status(400).json({ message: "Enter future date for reschedule service request" })];
                        return [3 /*break*/, 5];
                    case 2:
                        if (!req.body.updatedAddress) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.srService.getCustAndSPEmail(req.body.serviceRequest)];
                    case 3:
                        emailArray = _a.sent();
                        for (e in emailArray) {
                            email = this.srService.createEmailForUpdatedAddress(emailArray[e], req.body);
                            mg.messages().send(email, function (err) {
                                if (err)
                                    return res.json({ error: err.message });
                            });
                        }
                        return [2 /*return*/, res.status(200).json({ message: 'service request address updated successfully.' })];
                    case 4: return [2 /*return*/, res.status(201).json({ message: 'no change in service request.' })];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.srService = srService;
    }
    return ServiceRequestController;
}());
exports.ServiceRequestController = ServiceRequestController;
