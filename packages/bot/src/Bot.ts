import * as Discord from 'discord.js'
import { Game } from '@cocbot/schema/lib/client-types'
import {
	Command,
	HelpCommand,
	RollCommand,
	CommandType,
	parseCommand,
} from '@cocbot/parser'
import { DataStore } from './DataStore'
import { rollD10 } from './roller'

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

			const commandText = peel(msg.content, CC)
			let command: Command
			try {
				command = parseCommand(commandText)
			} catch (err) {
				msg.reply("Oops, I didn't understand that command.")
				return
			}
			console.log('command:', command)

			if (command.type === CommandType.Help) {
				this._executeHelpCommand(command as HelpCommand, msg)
				return
			} else if (command.type === CommandType.Roll) {
				this._executeRollCommand(command as RollCommand, msg)
				return
			} else {
				msg.reply("Oops, I didn't understand that command.")
			}
		}
	}

	private _executeHelpCommand(command: HelpCommand, msg: Discord.Message) {
		msg.reply(`\n
__**CthulhuBot Available Commands**__

\`/cc help\`                                           _Print Usage_
\`/cc roll <number>\`                                  _Roll an ability value_
\`/cc roll <number> with bonus die\`                   _Roll with a bonus die_
\`/cc roll <number> with penalty die\`                 _Roll with a penalty die_
\`/cc roll <number> with <numBonus> bonus dice\`       _Roll with a bonus dice_
\`/cc roll <number> with <numPenalty> penalty dice\`   _Roll with penalty dice_
\`/cc roll <number> for "label"\`                      _Label a roll_
\`/cc roll <number> with bonus die for "label"\`       _Label a roll_
`)
	}

	private _executeRollCommand(command: RollCommand, msg: Discord.Message) {
		if (typeof command.ability === 'string') {
			msg.reply(
				`I can't handle ability names just yet. Try rolling against your ability value (e.g. roll against 75)`
			)
		} else {
			const abilityValue = command.ability as number
			const rollValue = (tens: number, ones: number) =>
				tens === 0 && ones === 0 ? 100 : tens * 10 + ones
			let tens = rollD10()
			const ones = rollD10()
			let rolls: number[] = [rollValue(tens, ones)]

			const numExtraRolls = command.bonusDice || command.penaltyDice
			if (numExtraRolls) {
				for (let i = 0; i < numExtraRolls; ++i) {
					rolls.push(rollValue(rollD10(), ones))
				}
			}

			const result = command.bonusDice ? Math.min(...rolls) : Math.max(...rolls)
			const bonusInfo = rolls.length > 1 ? ` (out of ${rolls.join(', ')})` : ''
			let successLevel = 'Failure'
			const extremeThresheld = Math.floor(abilityValue * 0.2)
			const hardThreshold = Math.floor(abilityValue * 0.5)
			if (result === 100) {
				successLevel = 'Critical Failure'
			} else if (result < extremeThresheld) {
				successLevel = 'Extreme Success'
			} else if (result < hardThreshold) {
				successLevel = 'Hard Success'
			} else if (result < abilityValue) {
				successLevel = 'Success'
			}
			const forLabel = command.label ? ` for ${command.label}` : ''
			msg.reply(
				`You rolled **${result}**${bonusInfo}, **${successLevel}**${forLabel}.
	Success: ${abilityValue}
	Hard Success: ${hardThreshold}
	Extreme Success: ${extremeThresheld}`
			)
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
