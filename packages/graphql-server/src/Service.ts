import { ApolloServer } from 'apollo-server'
import { Configuration } from './Configuration'
import { DocumentNode } from 'graphql'
import { Database } from './Database1'

const resolvers = {}

export class Service {
	private config: Configuration
	private server: ApolloServer
	private database: Database

	public constructor(
		config: Configuration,
		schema: DocumentNode,
		database: Database
	) {
		this.config = config
		this.database = database
		this.server = new ApolloServer({
			typeDefs: schema,
			resolvers,
			introspection: true,
			playground: this.config.serverPlaygroundEnabled,
		})
	}

	public start(): Promise<void> {
		return this.server
			.listen({
				port: this.config.serverPort,
			})
			.then(({ url }) => {
				console.log(`🚀  apollo server ready at ${url}`)
			})
	}
}
