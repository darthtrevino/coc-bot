import { DiceExpressionRollResult } from '@cocbot/core'

export function printDiceExpressionResult(
	{ value, rolls }: DiceExpressionRollResult,
	label?: string
): string {
	const forLabel = label ? ` for ${label}` : ''
	const rollsInfo = rolls.length > 1 ? ` (out of ${rolls.join(', ')})` : ''
	return `**You rolled ${value}${forLabel}**${rollsInfo}`
}
