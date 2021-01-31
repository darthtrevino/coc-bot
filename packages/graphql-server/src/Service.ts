import { ApolloServer } from 'apollo-server'
import { Configuration } from './Configuration'
import { DocumentNode } from 'graphql'

const resolvers = {}

export class Service {
	private config: Configuration
	private server: ApolloServer

	public constructor(config: Configuration, schema: DocumentNode) {
		this.config = config
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
