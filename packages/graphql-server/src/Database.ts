import { CosmosClient, Database as CosmosDatabase } from '@azure/cosmos'
import { Configuration } from './Configuration'

export class Database {
	private config: Configuration
	private client: CosmosClient
	private db: CosmosDatabase | undefined
	private connectionPromise: Promise<void>

	public constructor(config: Configuration) {
		this.config = config
		this.client = new CosmosClient(config.dbConnectionString)
		this.connectionPromise = this.client.databases
			.createIfNotExists({
				id: config.dbDatabaseName,
			})
			.then((result) => {
				this.db = result.database
			})
	}

	public connect(): Promise<void> {
		return this.connectionPromise
	}
}
