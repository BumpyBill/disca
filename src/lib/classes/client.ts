import Discord from "discord.js";
import ClientConfig from "../interfaces/ClientConfig";

export default class Client extends Discord.Client {
  public config: ClientConfig;
  constructor(config: ClientConfig = {}) {
    super();
    this.config = config;
  }
}
