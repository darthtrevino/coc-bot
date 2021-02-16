import * as Discord from 'discord.js'
import { rollBrpAbility, rollDiceExpression } from '@cocbot/core'
import {
	Command,
	HelpCommand,
	RollCommand,
	CommandType,
	parseCommand,
} from '@cocbot/parser'
import { DataStore } from './DataStore'
import {
	HELP_MESSAGE_BOT,
	DID_NOT_UNDERSTAND_MESSAGE,
	ABILITY_STRINGS_NOT_IMPL,
	printAbilityRollResult,
	printDiceExpressionResult,
} from '@cocbot/messages'

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
				msg.reply(DID_NOT_UNDERSTAND_MESSAGE)
				return
			}
			console.log('command:', command)
			if (command.type === CommandType.Help) {
				this._executeHelpCommand(command as HelpCommand, msg)
			} else if (command.type === CommandType.Roll) {
				this._executeRollCommand(command as RollCommand, msg)
			} else {
				msg.reply(DID_NOT_UNDERSTAND_MESSAGE)
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
		let response: DiscordResponse = DID_NOT_UNDERSTAND_MESSAGE
		if (command.ability != null) {
			response = this._executeCocRoll(command)
		} else if (command.expr != null) {
			response = this._executeDieExpressionRoll(command)
		}
		await msg.reply(response)
	}

	private _executeCocRoll(command: RollCommand): DiscordResponse {
		if (typeof command.ability === 'string') {
			return ABILITY_STRINGS_NOT_IMPL
		} else {
			const abilityValue = command.ability as number
			const rollResult = rollBrpAbility(
				abilityValue,
				command.bonusDice || 0,
				command.penaltyDice || 0
			)
			return printAbilityRollResult(rollResult, command.label)
		}
	}

	private _executeDieExpressionRoll(command: RollCommand): string {
		if (command.expr == null) {
			throw new Error('roll expression is not defined')
		}
		const rollResult = rollDiceExpression(command.expr)
		return printDiceExpressionResult(rollResult, command.label)
	}
}

function peel(command: string, value: string) {
	return command.substring(value.length).trim()
}
