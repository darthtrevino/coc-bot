import { IConfig } from "config";

export class Configuration {
  public constructor(private config: IConfig) {}

  public get discordIdentityToken(): string {
    return this.config.get<string>("discord.identity.token");
  }

  public get debug(): boolean {
    return process.env.DEBUG != null && process.env.DEBUG !== "false";
  }
}
