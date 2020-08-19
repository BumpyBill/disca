import Client from "./Client";
import Command from "../Interfaces/Command";
import Discord from "discord.js";
export class CommandHandler {
  client: Client;
  constructor(client: Client) {
    this.client = client;

    client.on("message", (message: Discord.Message) => {
      const args = message.content
        .slice(
          message.content.startsWith(`<@!${client.user.id}> `)
            ? `<@!${client.user.id}> `.length
            : this.client.config.prefix.length,
          message.content.length
        )
        .split(/ +/);
    });
  }
  RegisterCommand(command: Command) {
    this.client.commands.set(command.name, command);
  }
}
