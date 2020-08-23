import Discord from "discord.js";

interface Command {
  /**
   * Command
   * @param name: {string}
   * @param aliases: {string[]}
   * @param permissions: {CommandPermissions}
   * @param execute: {function(message, client, args)}
   */
  name: string;
  aliases: string[];
  permissions: CommandPermissions;
  execute(
    message: Discord.Message,
    client: Discord.Client | Client,
    args: string[]
  ): void;
}

interface CommandPermissions {
  /**
   * CommandPermissions
   * @param bot: {string[]}
   * @param user: {string[]}
   */
  bot: string[];
  user: string[];
}

export class CommandHandler {
  /**
   * CommandHandler
   * @param client: {Client}
   */
  private client: Discord.Client;
  public commands: any;
  constructor(client: Discord.Client);

  RegisterCommand(command: Command): void;
}

export class Client extends Discord.Client {
  /**
   * Client
   * @param config?: {ClientConfig}
   */
  public config: ClientConfig;
  constructor(config?: ClientConfig);
}

export interface ClientConfig {
  /**
   * ClientConfig
   * @param prefix?: {string}
   */
  prefix?: string;
}
