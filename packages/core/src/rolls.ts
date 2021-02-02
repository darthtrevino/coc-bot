import { rollD10 } from './dice'

export enum SuccessDegree {
	CriticalFailure = 'critical_failure',
	Failure = 'failure',
	Success = 'success',
	HardSuccess = 'hard_succes',
	ExtremeSuccess = 'extreme_success',
	CriticalSuccess = 'critical_success',
}
export interface AbilityRollResult {
	result: number
	rolls: number[]
	degree: SuccessDegree
	thresholds: Partial<Record<SuccessDegree, number>>
}

export function rollAbility(
	ability: number,
	bonus: number,
	penalty: number
): AbilityRollResult {
	const rollValue = (tens: number, ones: number) =>
		tens === 0 && ones === 0 ? 100 : tens * 10 + ones
	const tens = rollD10()
	const ones = rollD10()
	const rolls: number[] = [rollValue(tens, ones)]

	const numExtraRolls = bonus || penalty
	if (numExtraRolls) {
		for (let i = 0; i < numExtraRolls; ++i) {
			rolls.push(rollValue(rollD10(), ones))
		}
	}

	const result = bonus ? Math.min(...rolls) : Math.max(...rolls)
	const extremeThresheld = Math.floor(ability / 5)
	const hardThreshold = Math.floor(ability / 2)
	const success = getSuccessLevel(result, ability)

	return {
		degree: success,
		result,
		rolls,
		thresholds: {
			[SuccessDegree.Success]: ability,
			[SuccessDegree.HardSuccess]: hardThreshold,
			[SuccessDegree.ExtremeSuccess]: extremeThresheld,
		},
	}
}

function getSuccessLevel(result: number, ability: number): SuccessDegree {
	if (result === 100) {
		return SuccessDegree.CriticalFailure
	} else if (result === 1) {
		return SuccessDegree.CriticalSuccess
	} else if (result < ability / 5) {
		return SuccessDegree.ExtremeSuccess
	} else if (result < ability / 2) {
		return SuccessDegree.HardSuccess
	} else if (result < ability) {
		return SuccessDegree.Success
	} else {
		return SuccessDegree.Failure
	}
}
