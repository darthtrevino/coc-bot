import { SuccessDegree } from '@cocbot/core'

/**
 * Prints out the success degree
 * @param deg The success degree to print
 */
export function printSuccessDegree(deg: SuccessDegree): string {
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
