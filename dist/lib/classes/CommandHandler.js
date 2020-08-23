"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = __importDefault(require("discord.js"));
const chalk_1 = __importDefault(require("chalk"));
class CommandHandler {
    constructor(client, logger = false) {
        this.client = client;
        this.commands = new discord_js_1.default.Collection();
        var log = console.log;
        const warning = chalk_1.default.keyword("orange");
        const good = chalk_1.default.greenBright;
        client.on("message", (message) => {
            if (!this.client.config.prefix) {
                log(warning("(Client > Config > Prefix) Not Set"));
                return;
            }
            if (!(message.content.startsWith(this.client.config.prefix) ||
                message.content.startsWith(`<@${this.client.user?.id}>`)))
                return;
            const args = message.content
                .slice(message.content.startsWith(`<@!${client.user?.id}> `)
                ? `<@!${client.user?.id}> `.length
                : this.client.config.prefix.length, message.content.length)
                .split(/ +/);
            const command = args.shift()?.toLowerCase();
            const checkcmd = this.commands.get(command) ||
                this.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(command));
            if (!checkcmd)
                return;
            if (!message.member?.hasPermission(checkcmd.permissions.user)) {
                message.channel.send("Insufficient Permissions");
                return;
            }
            if (!message.guild?.me?.hasPermission(checkcmd.permissions.user)) {
                message.channel.send("Insufficient Permissions For Bot");
                return;
            }
            log(good(`Command > ${command} > Args > ${args}`));
            try {
                checkcmd.execute(message, client, args);
            }
            catch (error) {
                message.channel.send(`\`\`\`js\n${error}\n\`\`\``);
            }
        });
    }
    RegisterCommand(command) {
        this.commands.set(command.name, command);
    }
}
exports.default = CommandHandler;
