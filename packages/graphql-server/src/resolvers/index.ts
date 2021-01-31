import { Game, Resolvers } from '@cocbot/graphql-schema/lib/provider-types'

export const resolvers: Resolvers = {
	Query: {
		Games: (): Game[] => {
			return [
				{
					title: 'Game 1',
					description: 'Game 1 Description',
					pcs: [],
					npcs: [],
					schedule: {
						time_zone: 'UTC-8',
					},
				},
				{
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
