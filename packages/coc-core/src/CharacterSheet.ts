/**
 * A character sheet for a character, containing their attributes, skills,
 * inventory, and personal descriptions
 */
export class CharacterSheet {
  private _attributes = new CharacterAttributes();

  public get attributes(): CharacterAttributes {
    return this._attributes;
  }
}

export class CharacterAttributes {
  private _strength = new CharacterAttribute();
  private _dexterity = new CharacterAttribute();
  private _intelligence = new CharacterAttribute();
  private _constitution = new CharacterAttribute();
  private _appearance = new CharacterAttribute();
  private _power = new CharacterAttribute();
  private _size = new CharacterAttribute();
  private _education = new CharacterAttribute();

  public get strength(): CharacterAttribute {
    return this._strength;
  }

  public get dexterity(): CharacterAttribute {
    return this._dexterity;
  }

  public get intelligence(): CharacterAttribute {
    return this._intelligence;
  }

  public get constitution(): CharacterAttribute {
    return this._constitution;
  }

  public get appearance(): CharacterAttribute {
    return this._appearance;
  }

  public get power(): CharacterAttribute {
    return this._power;
  }

  public get size(): CharacterAttribute {
    return this._size;
  }

  public get education(): CharacterAttribute {
    return this._education;
  }
}

export class CharacterAttribute {
  private _value: number = 0;

  public get value(): number {
    return this._value;
  }

  public set value(update: number) {
    this._value = update;
  }
}
