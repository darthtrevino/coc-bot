import {
  CharacterAttribute,
  IllegalCharacterAttributeValueError,
} from "../CharacterSheet";

describe("A character attribute", () => {
  it("can get/set the value", () => {
    const attribute = new CharacterAttribute();
    expect(attribute.value).toEqual(0);
    attribute.value = 10;
    expect(attribute.value).toEqual(10);
  });

  it("throws if a negative attribute value is set", () => {
    const attribute = new CharacterAttribute();
    expect(() => (attribute.value = -1)).toThrow(
      IllegalCharacterAttributeValueError
    );
  });

  it("can get half/fifth values", () => {
    const attribute = new CharacterAttribute();
    attribute.value = 100;
    expect(attribute.halfValue).toEqual(50);
    expect(attribute.fifthValue).toEqual(20);

    attribute.value = 1;
    expect(attribute.halfValue).toEqual(0);
    expect(attribute.fifthValue).toEqual(0);

    attribute.value = 2;
    expect(attribute.halfValue).toEqual(1);
    expect(attribute.fifthValue).toEqual(0);

    attribute.value = 3;
    expect(attribute.halfValue).toEqual(1);
    expect(attribute.fifthValue).toEqual(0);

    attribute.value = 4;
    expect(attribute.halfValue).toEqual(2);
    expect(attribute.fifthValue).toEqual(0);

    attribute.value = 5;
    expect(attribute.halfValue).toEqual(2);
    expect(attribute.fifthValue).toEqual(1);
  });
});
