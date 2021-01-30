/**
 * A single character attribute
 */
export class Rollable {
	private _value = 0

	public get value(): number {
		return this._value
	}

	public set value(update: number) {
		if (update < 0) {
			throw new IllegalRollableValueError()
		}
		this._value = update
	}

	public get halfValue(): number {
		return Math.floor(this.value * 0.5)
	}

	public get fifthValue(): number {
		return Math.floor(this.value * 0.2)
	}
}

export class IllegalRollableValueError extends Error {}
