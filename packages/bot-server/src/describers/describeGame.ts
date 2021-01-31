import { Game } from '@cocbot/graphql-schema/lib/client-types'

export function describeGame(game: Game): string {
	const { title, description } = game
	return `**${title}**: _${description}_`
}
