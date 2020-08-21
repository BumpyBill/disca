export default interface Command {
  name: string;
  aliases: string[];
  permissions: CommandPermissions;
}

interface CommandPermissions {
  bot: string[];
  user: string[];
}
