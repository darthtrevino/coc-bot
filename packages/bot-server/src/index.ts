import { Bot } from "./Bot";
import { Configuration } from "./Configuration";

async function bootstrap(): Promise<void> {
  try {
    const { config: configDotEnv } = require("dotenv");
    configDotEnv({ debug: true });
    const nodeConfig = require("config");
    const configuration = new Configuration(nodeConfig);

    startBot(configuration);
  } catch (err) {
    console.error("error launching CthulhuBot", err);
  }
}

async function startBot(config: Configuration): Promise<void> {
  const bot = new Bot();
  const identityToken = config.discordIdentityToken;
  if (identityToken == null) {
    throw new Error("Discord identity token is not defined");
  }
  await bot.connect(identityToken);
}

bootstrap();
