import Client from "./Client";
import Command from "../Interfaces/Command";
import Discord from "discord.js";
export default class CommandHandler {
  client: Client;
  name: string;
  constructor(client: Client, name: string) {
    this.client = client;
    this.name = name;

    this.client.commands[this.name] = new Discord.Collection();

    client.on("message", (message: any | Discord.Message) => {
      if (!message.content.startsWith(this.client.config.prefix)) return;

      const args = message.content
        .slice(
          message.content.startsWith(`<@!${client.user.id}> `)
            ? `<@!${client.user.id}> `.length
            : this.client.config.prefix.length,
          message.content.length
        )
        .split(/ +/);
      const command = args.shift().toLowerCase();

      const checkcmd =
        client.commands.get(command) ||
        client.commands.find(
          (cmd: any) => cmd.aliases && cmd.aliases.includes(command)
        );

      if (!checkcmd) return;

      if (
        !message.channel
          .permissionsFor(message.member)
          .has(checkcmd.permissions.user)
      )
        return message.channel.send("User has no permissions");

      if (
        !message.channel
          .permissionsFor(message.guild.me)
          .has(checkcmd.permissions.client)
      )
        return message.channel.send("Client has no permissions");

      try {
        checkcmd.execute(message, client, args);
      } catch (error) {
        message.channel.send(
          `\`\`\`ts\n${error.title}\n${error.message}\n${error.stack}\n\`\`\``
        );
      }
    });
  }

  RegisterCommand(command: Command) {
    this.client.commands[this.name].set(command.name, command);
  }
}
