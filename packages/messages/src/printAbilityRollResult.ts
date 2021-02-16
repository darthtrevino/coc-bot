import { AbilityRollResult, SuccessDegree } from '@cocbot/core'
import { printSuccessDegree } from './printSuccessDegree'

export function printAbilityRollResult(
	roll: AbilityRollResult,
	label?: string
): string {
	const { rolls, result, degree, canBurnLuck, thresholds } = roll
	const rollsInfo = rolls.length > 1 ? ` (out of ${rolls.join(', ')})` : ''
	const title = `**You rolled ${result}, ${printSuccessDegree(degree)}**`
	const forLabel = label ? ` for ${label}` : ''

	let response = `${title}${forLabel}. ${rollsInfo}`
	if (degree < SuccessDegree.Success) {
		response += printThreshold(SuccessDegree.Success)
	}
	if (degree < SuccessDegree.HardSuccess) {
		response += printThreshold(SuccessDegree.HardSuccess)
	}
	if (degree < SuccessDegree.ExtremeSuccess) {
		response += printThreshold(SuccessDegree.ExtremeSuccess)
	}
	return response

	function printThreshold(degree: SuccessDegree): string {
		const name = printSuccessDegree(degree)
		const threshold = thresholds[degree] as number
		const diff = result - threshold
		const burn = canBurnLuck ? `, *burn ${diff}*` : ", *can't burn*"
		return `\n  ${name}: **${threshold}**${burn}`
	}
}
