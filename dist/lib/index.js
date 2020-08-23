"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandler = exports.Client = void 0;
const Client_1 = __importDefault(require("./classes/Client"));
exports.Client = Client_1.default;
const CommandHandler_1 = __importDefault(require("./classes/CommandHandler"));
exports.CommandHandler = CommandHandler_1.default;
