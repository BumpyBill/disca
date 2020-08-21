import Discord from "discord.js";
import Command from "../interfaces/Command";

export default class CommandHandler {
  private client: Discord.Client;
  public commands: any;
  constructor(client: Discord.Client) {
    this.client = client;
    this.commands = new Discord.Collection();
  }

  RegisterCommand(command: Command): void {
    this.commands.set(command.name, command);
  }
}
