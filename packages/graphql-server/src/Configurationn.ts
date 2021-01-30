import { IConfig } from 'config'

export class Configuration {
	private config: IConfig

	public constructor(config: IConfig) {
		this.config = config
	}

	public get serverPort(): number {
		return this.config.get<number>('server.port') || 7071
	}

	public get debug(): boolean {
		return process.env.DEBUG != null && process.env.DEBUG !== 'false'
	}
}
