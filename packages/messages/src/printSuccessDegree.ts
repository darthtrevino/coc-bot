import { SuccessDegree } from '@cocbot/core'

export function printSuccessDegree(deg: SuccessDegree) {
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
