import {
	RollExpression,
	RollValueExpresionClause,
	RollExpressionOp,
	RollExpressionClause,
	RollExpressionOpType,
} from '@cocbot/parser'
import { rollD10, rollDN } from './dice'

/**
 * The success degree of a d100 roll in BRP
 */
export enum SuccessDegree {
	CriticalFailure,
	Failure,
	Success,
	HardSuccess,
	ExtremeSuccess,
	CriticalSuccess,
}

/**
 * The result of roll in BRP
 */
export interface AbilityRollResult {
	/**
	 * The resultant value
	 */
	result: number

	/**
	 * The degree of success achieved
	 */
	degree: SuccessDegree

	/**
	 * The rolls that were executed. This includes any penalty or bonus die rolls
	 */
	rolls: number[]

	/**
	 * The die thresholds for success degrees that require calculation (e.g regular, hard & extreme successes)
	 */
	thresholds: Partial<Record<SuccessDegree, number>>

	/**
	 * Whether this ability roll can burn luck.
	 * You cannot burn luck on:
	 * 	- Pushed rolls
	 *  - Luck Rolls
	 *  - Dmg Rolls
	 *  - Sanity Rolls
	 *  - Critical Failures
	 */
	canBurnLuck: boolean
}

export function rollBrpAbility(
	ability: number,
	bonus: number,
	penalty: number,
	preventLuckBurn?: boolean
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
	const degree = getSuccessLevel(result, ability)
	const canBurnLuck = !preventLuckBurn && degree > SuccessDegree.CriticalFailure

	return {
		degree,
		result,
		rolls,
		canBurnLuck,
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

export interface DiceExpressionRollResult {
	value: number
	rolls: number[]
}
export function rollDiceExpression(
	expr: RollExpression
): DiceExpressionRollResult {
	if ((expr as RollValueExpresionClause).value != null) {
		const valueExpression = expr as RollValueExpresionClause
		return { value: valueExpression.value, rolls: [] }
	} else if ((expr as RollExpressionOp).operation != null) {
		const opExpression = expr as RollExpressionOp
		const children = opExpression.operands.map((o) => rollDiceExpression(o))
		const { value: val1, rolls: rolls1 } = children[0]
		const { value: val2, rolls: rolls2 } = children[1]
		const childRolls = [...rolls1, ...rolls2]
		let numericResult = 0

		if (opExpression.operation === RollExpressionOpType.Subtract) {
			numericResult = val1 - val2
		} else if (opExpression.operation === RollExpressionOpType.Add) {
			numericResult = val1 + val2
		} else {
			throw new Error(`unhandled operation ${opExpression.operation}`)
		}

		return { value: numericResult, rolls: childRolls }
	} else if ((expr as RollExpressionClause).die != null) {
		const { die, count, keepHighest, keepLowest } = expr as RollExpressionClause
		if (count > 100) {
			throw new Error(`cannot role > 100 dice`)
		}
		const rolls = []
		for (let i = 0; i < count; ++i) {
			rolls.push(rollDN(die))
		}
		const sum = (vals: number[]) => vals.reduce((p, c) => p + c, 0)

		let value = 0
		if (keepHighest != null) {
			const sorted = rolls.sort((a, b) => b - a)
			const slice = sorted.slice(0, keepHighest)
			value = sum(slice)
		} else if (keepLowest != null) {
			const sorted = rolls.sort((a, b) => a - b)
			const slice = sorted.slice(0, keepLowest)
			value = sum(slice)
		} else {
			value = sum(rolls)
		}
		return { value, rolls }
	} else {
		throw new Error(`unknown clause type: ${JSON.stringify(expr, null, 4)}`)
	}
}
