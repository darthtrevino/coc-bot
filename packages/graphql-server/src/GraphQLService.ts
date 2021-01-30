import { ApolloServer } from 'apollo-server'
import { Configuration } from './Configurationn'
import { DocumentNode } from 'graphql'

const resolvers = {}

export class GraphQLService {
	private config: Configuration
	private server: ApolloServer

	public constructor(config: Configuration, schema: DocumentNode) {
		this.config = config
		this.server = new ApolloServer({
			typeDefs: schema,
			resolvers,
		})
	}

	public start(): Promise<void> {
		return this.server.listen().then(({ url }) => {
			console.log(`🚀  apollo server ready at ${url}`)
		})
	}
}
