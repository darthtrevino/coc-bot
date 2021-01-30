import * as Discord from "discord.js";

const CMD_PREFIX = "/cc";

export class Bot {
  private client = new Discord.Client();

  public constructor() {
    this.client.on("ready", this._handleReady);
    this.client.on("message", this._handleMessage);
  }

  public async connect(token: string): Promise<string> {
    return await this.client.login(token);
  }

  private _handleReady = (): void => {
    console.log(`Logged in as ${this.client.user?.tag}!`);
  };

  private _handleMessage = (msg: Discord.Message): void => {
    if (msg.content.startsWith(CMD_PREFIX)) {
      console.log("command message received");
      const command = msg.content.substr(CMD_PREFIX.length);
      console.log("command=", command);
      msg.reply("Pong: " + command);
    }
  };
}
