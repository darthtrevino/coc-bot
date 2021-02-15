import * as Discord from 'discord.js'
import { Game } from '@cocbot/schema/lib/client-types'
import { rollCocAbility, SuccessDegree, rollDiceExpression } from '@cocbot/core'
import {
	Command,
	HelpCommand,
	RollCommand,
	CommandType,
	parseCommand,
} from '@cocbot/parser'
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
		msg.reply(`\n
__**CthulhuBot Available Commands**__

**Rolling** 
General Form: \`/cc roll <attribute> <bonusOrPenalty> <label>\`

\`/cc help\`

# General Die Rolling
\`/cc roll d6\`
\`/cc roll 2d8\`
\`/cc roll d6+2d8 #label\`
\`/cc roll 2d20kh1 #attack-with-advantage\`
\`/cc roll 2d20kl1 #attack-with-disadvantage\`

# Call of Cthulhu Die Rolling
\`/cc roll <attributeScore>\`
\`/cc roll <attributeScore>b<numBonus>\`
\`/cc roll <attributeScore>p<numPenalty>\`
\`/cc roll <attributeScore> #label\`

e.g. \`/cc roll 25b2 "handgun"\` rolls against a skill with a value of 25 labeled "handgun" with 2 bonus dice
`)
	}

	private async _executeRollCommand(
		command: RollCommand,
		msg: Discord.Message
	): Promise<void> {
		let resultMessage = "Oops, I didn't understand that command."
		if (command.ability != null) {
			resultMessage = this._executeCocRoll(command)
		} else if (command.expr != null) {
			resultMessage = this._executeDieExpressionRoll(command)
		}
		await msg.reply(resultMessage)
	}

	private _executeCocRoll(command: RollCommand): string {
		if (typeof command.ability === 'string') {
			return `I can't handle ability names just yet. Try rolling against your ability value (e.g. roll against 75)`
		} else {
			const abilityValue = command.ability as number
			const { rolls, result, degree } = rollCocAbility(
				abilityValue,
				command.bonusDice || 0,
				command.penaltyDice || 0
			)
			const bonusInfo = rolls.length > 1 ? ` (out of ${rolls.join(', ')})` : ''
			const successLevel = printSuccessDegree(degree)
			const extremeThresheld = Math.floor(abilityValue / 5)
			const hardThreshold = Math.floor(abilityValue / 2)
			const forLabel = command.label ? ` for ${command.label}` : ''
			return `You rolled **${result}**${bonusInfo}, **${successLevel}**${forLabel}.
	Success: ${abilityValue}
	Hard Success: ${hardThreshold}
	Extreme Success: ${extremeThresheld}
`
		}
	}

	private _executeDieExpressionRoll(command: RollCommand): string {
		if (command.expr == null) {
			throw new Error('roll expression is not defined')
		}
		const [value, rolls] = rollDiceExpression(command.expr)
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

function printSuccessDegree(deg: SuccessDegree): string {
	switch (deg) {
		case SuccessDegree.CriticalFailure:
			return 'Critical Failure'
		case SuccessDegree.CriticalSuccess:
			return 'Critical Success'
		case SuccessDegree.ExtremeSuccess:
			return 'Extreme Success'
		case SuccessDegree.Failure:
			return 'Failure'
		case SuccessDegree.HardSuccess:
			return 'Hard Success'
		case SuccessDegree.Success:
			return 'Success'
	}
}
