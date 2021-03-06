import { Game, Resolvers } from '@cocbot/schema/lib/provider-types'
import { GraphQLResolveInfo } from './graphql'

export const resolvers: Resolvers = {
	Query: {
		Games: (): // parent: unknown,
		// args: unknown,
		// context: unknown,
		// info: GraphQLResolveInfo
		Game[] => {
			return [
				{
					id: '1',
					title: 'Game 1',
					description: 'Game 1 Description',
					pcs: [],
					npcs: [],
					schedule: {
						time_zone: 'UTC-8',
					},
				},
				{
					id: '2',
					title: 'Game 2',
					description: 'Game 2 Description',
					pcs: [],
					npcs: [],
					schedule: {
						time_zone: 'UTC-8',
					},
				},
			]
		},
	},
}
