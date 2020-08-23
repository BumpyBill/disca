import Discord from "discord.js";
import Command from "../interfaces/Command";
import Client from "./Client";
import chalk from "chalk";

export default class CommandHandler {
  private client: Client;
  public commands: any;
  constructor(client: Client) {
    this.client = client;
    this.commands = new Discord.Collection();

    var log = console.log;
    const warning = chalk.keyword("orange");

    client.on("message", (message) => {
      if (!this.client.config.prefix) {
        log(warning("(Client > Config > Prefix) Not Set"));
        return;
      }

      if (
        !(
          message.content.startsWith(this.client.config.prefix) ||
          message.content.startsWith(`<@${this.client.user?.id}>`)
        )
      )
        return;

      const args = message.content
        .slice(
          message.content.startsWith(`<@!${client.user?.id}> `)
            ? `<@!${client.user?.id}> `.length
            : this.client.config.prefix.length,
          message.content.length
        )
        .split(/ +/);
      const command = args.shift()?.toLowerCase();

      const checkcmd =
        this.commands.get(command) ||
        this.commands.find(
          (cmd: any) => cmd.aliases && cmd.aliases.includes(command)
        );

      if (!checkcmd) return;

      if (!message.member?.hasPermission(checkcmd.permissions.user)) {
        message.channel.send("Insufficient Permissions");
        return;
      }
      if (!message.guild?.me?.hasPermission(checkcmd.permissions.user)) {
        message.channel.send("Insufficient Permissions For Bot");
        return;
      }

      try {
        checkcmd.execute(message, client, args);
      } catch (error) {
        message.channel.send(`\`\`\`js\n${error}\n\`\`\``);
      }
    });
  }

  RegisterCommand(command: Command): void {
    this.commands.set(command.name, command);
  }
}
