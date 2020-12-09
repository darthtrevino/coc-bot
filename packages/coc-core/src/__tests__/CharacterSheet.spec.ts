import { CharacterSheet } from "../CharacterSheet";

describe("The Character Sheet", () => {
  it("can be instantiated", () => {
    let sheet = new CharacterSheet();
    expect(sheet.sanity.value).toEqual(0);
    expect(sheet.luck.value).toEqual(0);

    // Default Attribute Values
    expect(sheet.attributes).toBeDefined();
    expect(sheet.attributes.strength.value).toEqual(0);
    expect(sheet.attributes.dexterity.value).toEqual(0);
    expect(sheet.attributes.intelligence.value).toEqual(0);
    expect(sheet.attributes.constitution.value).toEqual(0);
    expect(sheet.attributes.appearance.value).toEqual(0);
    expect(sheet.attributes.power.value).toEqual(0);
    expect(sheet.attributes.size.value).toEqual(0);
    expect(sheet.attributes.education.value).toEqual(0);

    // Defau/t Skill Values
    expect(sheet.skills.accounting.value).toEqual(5);
    expect(sheet.skills.anthropology.value).toEqual(1);
    expect(sheet.skills.appraise.value).toEqual(5);
    expect(sheet.skills.charm.value).toEqual(15);
    expect(sheet.skills.climb.value).toEqual(20);
    expect(sheet.skills.creditRating.value).toEqual(0);
    expect(sheet.skills.cthulhuMythos.value).toEqual(0);
    expect(sheet.skills.disguise.value).toEqual(5);
    expect(sheet.skills.dodge.value).toEqual(0);
    expect(sheet.skills.driveAuto.value).toEqual(20);
    expect(sheet.skills.electricalRepair.value).toEqual(10);
    expect(sheet.skills.fastTalk.value).toEqual(5);
    expect(sheet.skills.fightingBrawl.value).toEqual(25);
    expect(sheet.skills.firearmsHandgun.value).toEqual(20);
    expect(sheet.skills.firearmsRifleShotgun.value).toEqual(25);
    expect(sheet.skills.firstAid.value).toEqual(30);
    expect(sheet.skills.history.value).toEqual(5);
    expect(sheet.skills.intimidate.value).toEqual(15);
    expect(sheet.skills.jump.value).toEqual(20);
    expect(sheet.skills.languageOwn.value).toEqual(0);
    expect(sheet.skills.law.value).toEqual(5);
    expect(sheet.skills.libraryUse.value).toEqual(20);
    expect(sheet.skills.listen.value).toEqual(20);
    expect(sheet.skills.locksmith.value).toEqual(1);
    expect(sheet.skills.mechanicalRepair.value).toEqual(10);
    expect(sheet.skills.medicine.value).toEqual(1);
    expect(sheet.skills.naturalWorld.value).toEqual(10);
    expect(sheet.skills.navigate.value).toEqual(10);
    expect(sheet.skills.occult.value).toEqual(5);
    expect(sheet.skills.operateHeavyMachinery.value).toEqual(1);
    expect(sheet.skills.persuade.value).toEqual(10);
    expect(sheet.skills.psychology.value).toEqual(10);
    expect(sheet.skills.psychoanalysis.value).toEqual(1);
    expect(sheet.skills.ride.value).toEqual(5);
    expect(sheet.skills.sleightOfHand.value).toEqual(10);
    expect(sheet.skills.spotHidden.value).toEqual(25);
    expect(sheet.skills.stealth.value).toEqual(20);
    expect(sheet.skills.swim.value).toEqual(20);
    expect(sheet.skills.throw.value).toEqual(20);
    expect(sheet.skills.track.value).toEqual(10);
  });
});
