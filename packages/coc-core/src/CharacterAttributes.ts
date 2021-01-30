import { Rollable } from './Rollable'

/**
 * A character's core attributes
 */
export class CharacterAttributes {
	private _strength = new Rollable()
	private _dexterity = new Rollable()
	private _intelligence = new Rollable()
	private _constitution = new Rollable()
	private _appearance = new Rollable()
	private _power = new Rollable()
	private _size = new Rollable()
	private _education = new Rollable()

	public get strength(): Rollable {
		return this._strength
	}

	public get dexterity(): Rollable {
		return this._dexterity
	}

	public get intelligence(): Rollable {
		return this._intelligence
	}

	public get constitution(): Rollable {
		return this._constitution
	}

	public get appearance(): Rollable {
		return this._appearance
	}

	public get power(): Rollable {
		return this._power
	}

	public get size(): Rollable {
		return this._size
	}

	public get education(): Rollable {
		return this._education
	}
}
