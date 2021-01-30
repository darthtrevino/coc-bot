import { Rollable } from './Rollable'

// TODO: Skill Branches:
//    art/craft
//    fighting
//    firearm
//    languages
//    science
//    piloting
//    survival
//
// TODO: Bonus Skills
// TODO: Initial Dodge = Half Dex
// TODO: Initial Language Own = EDU
// TODO: Other attributes: Movement Rate, BUild, DB
// TODO: Weapons, Inventory, Backstory, manias/phobias/etc...
import { CharacterSkills } from './CharacterSkills'
import { CharacterAttributes } from './CharacterAttributes'

/**
 * A character sheet for a character, containing their attributes, skills,
 * inventory, and personal descriptions
 */
export class CharacterSheet {
	private _attributes = new CharacterAttributes()
	private _skills = new CharacterSkills()
	private _sanity = new Rollable()
	private _luck = new Rollable()

	public get attributes(): CharacterAttributes {
		return this._attributes
	}

	public get skills(): CharacterSkills {
		return this._skills
	}

	public get sanity(): Rollable {
		return this._sanity
	}

	public get luck(): Rollable {
		return this._luck
	}
}
