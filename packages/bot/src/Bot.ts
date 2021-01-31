import * as Discord from 'discord.js'
import { Game } from '@cocbot/schema/lib/client-types'
import { DataStore } from './DataStore'

const CC = '/cc'

export class Bot {
	private client = new Discord.Client()
	private dataStore: DataStore

	public constructor(dataStore: DataStore) {
		this.dataStore = dataStore
		this.client.on('ready', this._handleReady)
		this.client.on('message', this._handleMessage)
	}

	public async connect(token: string): Promise<string> {
		return await this.client.login(token)
	}

	private _handleReady = (): void => {
		console.log(`Logged in as ${this.client.user?.tag}!`)
	}

	private _handleMessage = (msg: Discord.Message): void => {
		if (msg.content.startsWith(CC)) {
			console.log(
				`command message received. channelId=${msg.reference?.channelID}, guild=${msg.guild?.id}, user=${msg.member?.user.id}`
			)
			if (msg.content.startsWith(CC)) {
				let command = peel(msg.content, CC)
				console.log(`command: ${command}`)

				if (command.startsWith('game')) {
					command = peel(command, 'game')
					if (command === 'list') {
						this._handleListGames(peel(command, 'list'), msg)
						return
					}
				}
			}
			msg.reply("Oops, I didn't understand that command.")
		}
	}

	private _handleListGames = async (command: string, msg: Discord.Message) => {
		const games = await this.dataStore.getGames()
		msg.reply(
			'The following games are being run:\n\n' +
				games.map((game) => `\t${describeGame(game)}`).join('\n')
		)
	}
}

function peel(command: string, value: string) {
	return command.substring(value.length).trim()
}

function describeGame(game: Game): string {
	const { title, description } = game
	return `**Title**: _${title}_
	**Description**: _${description}_
	**Code**: _TBD_
	`
}
