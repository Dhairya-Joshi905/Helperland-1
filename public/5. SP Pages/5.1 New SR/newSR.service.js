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
exports.SRService = void 0;
var SRService = /** @class */ (function () {
    function SRService(SRRepository) {
        this.SRRepository = SRRepository;
        this.SRRepository = SRRepository;
    }
    SRService.prototype.getSPDetailbyId = function (SPId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.SRRepository.getSPDetailById(parseInt(SPId))];
            });
        });
    };
    SRService.prototype.getSRDetailById = function (SRId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.SRRepository.getSRDetailById(parseInt(SRId))];
            });
        });
    };
    SRService.prototype.getAllSROfSP = function (SPId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.SRRepository.getAllSROfSP(parseInt(SPId))];
            });
        });
    };
    SRService.prototype.getSPByZipCode = function (zipCode) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.SRRepository.getSPByZipCode(zipCode)];
            });
        });
    };
    SRService.prototype.acceptNewSR = function (serviceId, SPId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.SRRepository.acceptNewSR(parseInt(serviceId), parseInt(SPId))];
            });
        });
    };
    ;
    SRService.prototype.getAllPendingSRByZipcode = function (zipCode, helperId) {
        return __awaiter(this, void 0, void 0, function () {
            var SRArray, serviceRequest, blockedCustomer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        SRArray = [];
                        return [4 /*yield*/, this.SRRepository.getAllPendingSRByZipcode(zipCode)];
                    case 1:
                        serviceRequest = _a.sent();
                        return [4 /*yield*/, this.SRRepository.getBlockedCustomerOfSP(parseInt(helperId))];
                    case 2:
                        blockedCustomer = _a.sent();
                        if (serviceRequest)
                            if (blockedCustomer) {
                                SRArray = serviceRequest.filter(function (sr) {
                                    return !blockedCustomer.find(function (rm) { return (rm.TargetUserId === sr.UserId); });
                                });
                            }
                        return [2 /*return*/, SRArray];
                }
            });
        });
    };
    // Local Services
    SRService.prototype.petFilter = function (includePets, serviceRequests) {
        return __awaiter(this, void 0, void 0, function () {
            var sRequests, sr;
            return __generator(this, function (_a) {
                sRequests = [];
                if (includePets === false)
                    for (sr in serviceRequests)
                        if (serviceRequests[sr].HasPets === false)
                            sRequests.push(serviceRequests[sr]);
                        else
                            return [2 /*return*/, serviceRequests];
                return [2 /*return*/, sRequests];
            });
        });
    };
    SRService.prototype.getSRDetail = function (srequest) {
        return __awaiter(this, void 0, void 0, function () {
            var requestDetail, _a, _b, _i, sr, user, requestAddress, startTimeArray, endTimeInt;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        requestDetail = [];
                        _a = [];
                        for (_b in srequest)
                            _a.push(_b);
                        _i = 0;
                        _c.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                        sr = _a[_i];
                        return [4 /*yield*/, this.SRRepository.getUserDetailById(srequest[sr].UserId)];
                    case 2:
                        user = _c.sent();
                        return [4 /*yield*/, this.SRRepository.getSRAddress(srequest[sr].ServiceRequestId)];
                    case 3:
                        requestAddress = _c.sent();
                        startTimeArray = srequest[sr].ServiceStartTime.toString().split(":");
                        endTimeInt = (parseFloat(startTimeArray[0]) + parseFloat(startTimeArray[1]) / 60 +
                            srequest[sr].ServiceHours + srequest[sr].ExtraHours).toString().split(".");
                        if (endTimeInt[1])
                            endTimeInt[1] = (parseInt(endTimeInt[1]) * 6).toString();
                        else
                            endTimeInt[1] = "00";
                        if (user)
                            if (requestAddress)
                                requestDetail.push({
                                    ServiceId: srequest[sr].ServiceRequestId,
                                    ServiceDate: srequest[sr].ServiceStartDate.toString().split("-").reverse().join("-"),
                                    Time: startTimeArray[0] + ":" + startTimeArray[1] + "-" + endTimeInt[0] + ":" + endTimeInt[1],
                                    Customer: user.FirstName + " " + user.LastName,
                                    Address: {
                                        Street: requestAddress.Addressline1,
                                        HouseNumber: requestAddress.Addressline2,
                                        City: requestAddress.City,
                                        PostalCode: requestAddress.PostalCode,
                                    },
                                    Payment: srequest[sr].TotalCost + " €"
                                });
                        _c.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 1];
                    case 5: return [2 /*return*/, requestDetail];
                }
            });
        });
    };
    SRService.prototype.checkSPAvailability = function (date, serviceRequest, acceptTotalHour, time) {
        var srId;
        var matched = false;
        for (var sr in serviceRequest) {
            if (serviceRequest[sr].ServiceStartDate === date) {
                var acceptTime = time.toString().split(":");
                if (acceptTime[1] === "30")
                    acceptTime[1] = "0.5";
                var acceptStartTime = parseFloat(acceptTime[0]) + parseFloat(acceptTime[1]);
                var availableTime = serviceRequest[sr].ServiceStartTime.toString().split(":");
                if (availableTime[1] === "30")
                    availableTime[1] = "0.5";
                var availableStartTime = parseFloat(availableTime[0]) + parseFloat(availableTime[1]);
                var availableTotalHour = serviceRequest[sr].ServiceHours + serviceRequest[sr].ExtraHours;
                var totalAcceptTime = acceptStartTime + acceptTotalHour + 1;
                var totalAvailableTime = availableStartTime + availableTotalHour + 1;
                if (availableStartTime >= totalAcceptTime || acceptStartTime >= totalAvailableTime)
                    matched = false;
                else {
                    srId = serviceRequest[sr].ServiceRequestId;
                    matched = true;
                    break;
                }
            }
            else
                matched = false;
        }
        return { matched: matched, srId: srId };
    };
    SRService.prototype.createEmailData = function (userEmail, srId) {
        var data = {
            from: 'team_helperland@gmail.com',
            to: userEmail,
            subject: 'About assigned service request',
            html: "<h3>A service request ".concat(srId, " has already been accepted by someone and is no more available to you.</h3>")
        };
        return data;
    };
    return SRService;
}());
exports.SRService = SRService;
