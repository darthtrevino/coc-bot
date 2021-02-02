import { rollAbility, SuccessDegree } from '@cocbot/core'

export interface DiscordOption {
	name: string
	value: number | string
}
export interface DiscordCommand {
	name: string
	options: Array<DiscordCommand | DiscordOption>
}

export function handleDiscordCommand(
	command: DiscordCommand & { id: string }
): string {
	if (command.name === 'coc') {
		const subcommand = command.options[0]
		if (subcommand.name === 'roll') {
			return handleDiscordRollCommand(command.options[0] as DiscordCommand)
		}
	} else {
		return "Ooops, I wasn't able to handle that command"
	}
}

function handleDiscordRollCommand(command: DiscordCommand): string {
	const skill = (command.options.find(
		(t) => t.name === 'skill'
	) as DiscordOption).value as number
	const bonusDie =
		((command.options.find((t) => t.name === 'bonus') as DiscordOption)
			?.value as number) || 0
	const penaltyDie =
		((command.options.find((t) => t.name === 'penalty') as DiscordOption)
			?.value as number) || 0

	const result = rollAbility(skill, bonusDie, penaltyDie)

	const bonusInfo =
		result.rolls.length > 1 ? ` (out of ${result.rolls.join(', ')})` : ''
	const successLevel = printSuccessDegree(result.degree)
	const forLabel = ''
	return `You rolled **${
		result.result
	}**${bonusInfo}, **${successLevel}**${forLabel}.
  Success: ${skill}
  Hard Success: ${result.thresholds[SuccessDegree.HardSuccess]}
  Extreme Success: ${result.thresholds[SuccessDegree.ExtremeSuccess]}
`
}

function printSuccessDegree(deg: SuccessDegree) {
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
