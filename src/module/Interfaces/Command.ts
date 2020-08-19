export default interface Command {
  name: string;
  aliases: string[];
  permissions: CommandPermissions;
  execute: Function;
}
interface CommandPermissions {
  user: string[];
  bot: string[];
}
