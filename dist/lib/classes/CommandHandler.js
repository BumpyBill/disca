"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = __importDefault(require("discord.js"));
class CommandHandler {
    constructor(client) {
        this.client = client;
        this.commands = new discord_js_1.default.Collection();
    }
    RegisterCommand(command) {
        this.commands.set(command.name, command);
    }
}
exports.default = CommandHandler;