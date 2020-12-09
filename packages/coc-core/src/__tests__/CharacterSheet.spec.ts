import { CharacterSheet } from "../CharacterSheet";

describe("The Character Sheet", () => {
  it("can be instantiated", () => {
    let sheet = new CharacterSheet();
    expect(sheet).toBeDefined();
    expect(sheet.attributes).toBeDefined();
    expect(sheet.attributes.strength.value).toEqual(0);
    expect(sheet.attributes.dexterity.value).toEqual(0);
    expect(sheet.attributes.intelligence.value).toEqual(0);
    expect(sheet.attributes.constitution.value).toEqual(0);
    expect(sheet.attributes.appearance.value).toEqual(0);
    expect(sheet.attributes.power.value).toEqual(0);
    expect(sheet.attributes.size.value).toEqual(0);
    expect(sheet.attributes.education.value).toEqual(0);
  });
});
