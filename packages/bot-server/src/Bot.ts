import * as Discord from 'discord.js'
import { DataStore } from './DataStore'

const CMD_PREFIX = '/cc'

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
		if (msg.content.startsWith(CMD_PREFIX)) {
			console.log('command message received')
			const command = peel(msg.content, CMD_PREFIX)
			console.log('command=', command)

			if (command.startsWith('game')) {
				this._handleGameCommand(peel(command, 'game'), msg)
			} else {
				msg.reply('Pong: ' + command)
			}
		}
	}

	private async _handleGameCommand(command: string, msg: Discord.Message) {
		if (command === 'list') {
			this._handleListGames(command, msg)
		}
	}

	private async _handleListGames(command: string, msg: Discord.Message) {
		const games = await this.dataStore.getGames()
		msg.reply(
			'The following games are being run:\n\n' +
				games
					.map(({ title, description }) => `\t**${title}**: _${description}_`)
					.join('\n\n')
		)
	}
}

function peel(command: string, value: string) {
	return command.substring(value.length).trim()
}
