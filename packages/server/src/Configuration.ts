import { IConfig } from 'config'

export class Configuration {
	private config: IConfig

	public constructor(config: IConfig) {
		this.config = config
	}

	public get serverPort(): number {
		return this.config.get<number>('server.port') || 7071
	}

	public get serverPlaygroundEnabled(): boolean {
		return this.config.get<boolean>('server.playground.enabled') || false
	}

	public get debug(): boolean {
		return process.env.DEBUG != null && process.env.DEBUG !== 'false'
	}

	public get dbEndpoint(): string {
		return this.config.get('database.endpoint')
	}

	public get dbKey(): string {
		return this.config.get('database.key')
	}

	public get dbDatabaseName(): string {
		return this.config.get('database.databaseName')
	}
}
