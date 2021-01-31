import { Game } from '@cocbot/schema/lib/client-types'
import { GraphQLClient, gql } from 'graphql-request'
import { Configuration } from './Configuration'

export class DataStore {
	private client: GraphQLClient

	public constructor(config: Configuration) {
		this.client = new GraphQLClient(config.serviceUrl)
	}

	public async getGames(): Promise<Game[]> {
		const data = await this.client.request(gql`
			query {
				Games {
					title
					description
				}
			}
		`)
		console.log('got data', data)
		return data.Games as Game[]
	}
}
