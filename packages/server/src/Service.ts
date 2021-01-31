import { ApolloServer } from 'apollo-server'
import { Configuration } from './Configuration'
import { DocumentNode } from 'graphql'
import { Database } from './Database'
import { resolvers } from './resolvers'

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
			resolvers: resolvers as any,
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
