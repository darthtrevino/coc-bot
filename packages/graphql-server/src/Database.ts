import { CosmosClient } from '@azure/cosmos'

export class Database {
	private client: CosmosClient

	public constructor(connectionString: string) {
		this.client = new CosmosClient(connectionString)
		this.client.databases.createIfNotExists({
			id: databaseName,
		})
	}
}
