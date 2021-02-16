import { rollBrpAbility } from '@cocbot/core'
import {
	printAbilityRoll,
	NOT_IMPL,
	DID_NOT_UNDERSTAND_MESSAGE,
} from '@cocbot/messages'

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
			return handleDiscordTerseRollCommand()
		}
	} else {
		return DID_NOT_UNDERSTAND_MESSAGE
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
	return `<@${member.user.id}> rolled ${printAbilityRoll(rollResult, label)}`
}

function handleDiscordTerseRollCommand(): string {
	return NOT_IMPL
}

function getOption<T>(
	command: DiscordCommand,
	name: string,
	defaultValue: T
): T {
	const found = command.options.find((t) => t.name === name) as DiscordOption
	return (found?.value as T) || defaultValue
}
