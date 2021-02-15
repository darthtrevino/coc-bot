import { IConfig } from 'config'

export class Configuration {
	private config: IConfig

	public constructor(config: IConfig) {
		this.config = config
	}

	public get discordIdentityToken(): string {
		return this.config.get<string>('discord.identity.token')
	}

	public get serviceUrl(): string {
		return this.config.get<string>('service.url')
	}

	public get botServicePort(): number {
		return this.config.get<number>('botService.port')
	}

	public get debug(): boolean {
		return process.env.DEBUG != null && process.env.DEBUG !== 'false'
	}
}
