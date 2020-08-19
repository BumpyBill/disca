import Discord from "discord.js";
import ClientConfig from "../Interfaces/ClientConfig";
export default class Client extends Discord.Client {
  config: ClientConfig;
  commands: any;

  constructor(prefix: string) {
    super();
    this.config = {
      prefix: prefix,
    };
    this.commands = new Discord.Collection();
  }
}
