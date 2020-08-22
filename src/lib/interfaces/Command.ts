import Discord from "discord.js";

export default interface Command {
  name: string;
  aliases: string[];
  permissions: CommandPermissions;
  execute(
    message: Discord.Message,
    client: Discord.Client,
    args: string[]
  ): void;
}

interface CommandPermissions {
  bot: string[];
  user: string[];
}
