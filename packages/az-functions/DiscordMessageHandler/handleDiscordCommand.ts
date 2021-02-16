import { AbilityRollResult, rollBrpAbility, SuccessDegree } from '@cocbot/core'
import { printSuccessDegree } from '@cocbot/messages'

export interface DiscordOption {
	name: string
	value: unknown
}
export interface DiscordCommand {
	name: string
	options: Array<DiscordCommand | DiscordOption>
}

interface MemberInfo {
	nick: string
	user: {
		avatar: string
		discriminator: string
		id: string
		// eslint-disable-next-line
		public_flags: number
		username: string
	}
}
export interface Body {
	data: DiscordCommand & { id: string }
	member: MemberInfo
}

export function handleDiscordCommand({ data: command, member }: Body): string {
	if (command.name === 'coc') {
		const subcommand = command.options[0]
		if (subcommand.name === 'roll') {
			return handleDiscordRollCommand(
				command.options[0] as DiscordCommand,
				member
			)
		} else if (subcommand.name === 'r') {
			return handleDiscordTerseRollCommand(
				command.options[0] as DiscordCommand,
				member
			)
		}
	} else {
		return "Ooops, I wasn't able to handle that command"
	}
}

function handleDiscordRollCommand(
	command: DiscordCommand,
	member: MemberInfo
): string {
	const skill = (command.options.find(
		(t) => t.name === 'skill' || t.name === 'target'
	) as DiscordOption).value as number
	const bonusDie = getOption(command, 'bonus', 0)
	const penaltyDie = getOption(command, 'penalty', 0)
	const label = getOption(command, 'label', '')

	const rollResult = rollBrpAbility(skill, bonusDie, penaltyDie)
	return `<@${member.user.id}> rolled ${printRollResult(rollResult, label)}`
}

function handleDiscordTerseRollCommand(
	command: DiscordCommand,
	member: MemberInfo
): string {
	return 'TBD'
}

function getOption<T>(
	command: DiscordCommand,
	name: string,
	defaultValue: T
): T {
	const found = command.options.find((t) => t.name === name) as DiscordOption
	return (found?.value as T) || defaultValue
}

function printRollResult(
	{ rolls, degree, result, thresholds }: AbilityRollResult,
	label: string
): string {
	const bonusInfo = rolls.length > 1 ? ` (out of ${rolls.join(', ')})` : ''
	const successLevel = printSuccessDegree(degree)
	const forLabel = label ? ` for ${label}` : ''
	return `**${result}**${bonusInfo}, **${successLevel}**${forLabel}.
\tSuccess: ${thresholds[SuccessDegree.Success]}
\tHard Success: ${thresholds[SuccessDegree.HardSuccess]}
\tExtreme Success: ${thresholds[SuccessDegree.ExtremeSuccess]}
`
}
