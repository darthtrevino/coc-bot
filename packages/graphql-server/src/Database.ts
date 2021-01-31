import { CosmosClient, Database as CosmosDatabase } from '@azure/cosmos'
import { Configuration } from './Configuration'

export class Database {
	private config: Configuration
	private client: CosmosClient
	private db: CosmosDatabase | undefined
	private connectionPromise: Promise<void>

	public constructor(config: Configuration) {
		this.config = config
		if (!config.dbEndpoint) {
			throw new Error('config.dbEndpoint is not defined')
		}
		if (!config.dbKey) {
			throw new Error('config.dbKey is not defined')
		}
		console.log(
			`connecting to database; dbName=[${config.dbDatabaseName}], endpoint=[${config.dbEndpoint}]...`
		)
		this.client = new CosmosClient({
			endpoint: config.dbEndpoint,
			key: config.dbKey,
		})
		this.connectionPromise = this.client.databases
			.createIfNotExists({
				id: config.dbDatabaseName,
			})
			.then((result) => {
				console.log('database connected!')
				this.db = result.database
			})
			.catch((err) => {
				console.error('error connecting to database', err)
			})
	}

	public connect(): Promise<void> {
		return this.connectionPromise
	}
}
