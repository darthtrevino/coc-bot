import * as Discord from 'discord.js'
import { Game } from '@cocbot/schema/lib/client-types'
import { rollBrpAbility, SuccessDegree, rollDiceExpression } from '@cocbot/core'
import {
	Command,
	HelpCommand,
	RollCommand,
	CommandType,
	parseCommand,
} from '@cocbot/parser'
import { DataStore } from './DataStore'
import { HELP_MESSAGE_BOT, printSuccessDegree } from '@cocbot/messages'

const CC = '/cc'
type DiscordResponse = string | Discord.MessageEmbed

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

	public get uptime(): number | null {
		return this.client.uptime
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
			} else if (command.type === CommandType.Roll) {
				this._executeRollCommand(command as RollCommand, msg)
			} else {
				msg.reply("Oops, I didn't understand that command.")
			}
		}
	}

	private _executeHelpCommand(command: HelpCommand, msg: Discord.Message) {
		msg.reply(HELP_MESSAGE_BOT)
	}

	private async _executeRollCommand(
		command: RollCommand,
		msg: Discord.Message
	): Promise<void> {
		let response: DiscordResponse = "Oops, I didn't understand that command."
		if (command.ability != null) {
			response = this._executeCocRoll(command)
		} else if (command.expr != null) {
			response = this._executeDieExpressionRoll(command)
		}
		await msg.reply(response)
	}

	private _executeCocRoll(command: RollCommand): DiscordResponse {
		if (typeof command.ability === 'string') {
			return `I can't handle ability names just yet. Try rolling against your ability value (e.g. roll against 75)`
		} else {
			const abilityValue = command.ability as number
			const { rolls, result, degree } = rollBrpAbility(
				abilityValue,
				command.bonusDice || 0,
				command.penaltyDice || 0
			)
			const bonusInfo = rolls.length > 1 ? ` (out of ${rolls.join(', ')})` : ''
			const title = printSuccessDegree(degree)
			const extremeThresheld = Math.floor(abilityValue / 5)
			const hardThreshold = Math.floor(abilityValue / 2)
			const forLabel = command.label ? ` for ${command.label}` : ''
			let response = `**You rolled ${result}, ${title}**${forLabel}. ${bonusInfo}`
			if (degree < SuccessDegree.Success) {
				const diff = result - abilityValue
				response += `\n  Success: **${abilityValue}**, *burn ${diff}*`
			}
			if (degree < SuccessDegree.HardSuccess) {
				const diff = result - hardThreshold
				response += `\n  Hard Success: **${hardThreshold}**, *burn ${diff}*`
			}
			if (degree < SuccessDegree.ExtremeSuccess) {
				const diff = result - extremeThresheld
				response += `\n  Extreme Success: **${extremeThresheld}**, *burn ${diff}*`
			}
			return response
		}
	}

	private _executeDieExpressionRoll(command: RollCommand): string {
		if (command.expr == null) {
			throw new Error('roll expression is not defined')
		}
		const { value, rolls } = rollDiceExpression(command.expr)
		const forLabel = command.label ? ` for ${command.label}` : ''
		return `rolled [${rolls.map((r) => r).join(', ')}] => ${value}${forLabel}
		`
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
