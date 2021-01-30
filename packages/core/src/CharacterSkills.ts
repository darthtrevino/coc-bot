import { Rollable } from './Rollable'

export class CharacterSkills {
	private _accounting = new Rollable()
	private _anthropology = new Rollable()
	private _appraise = new Rollable()
	private _charm = new Rollable()
	private _climb = new Rollable()
	private _creditRating = new Rollable()
	private _cthulhuMythos = new Rollable()
	private _disguise = new Rollable()
	private _dodge = new Rollable()
	private _driveAuto = new Rollable()
	private _electricalRepair = new Rollable()
	private _fastTalk = new Rollable()
	private _fightingBrawl = new Rollable()
	private _firearmsHandgun = new Rollable()
	private _firearmsRifleShotgun = new Rollable()
	private _firstAid = new Rollable()
	private _history = new Rollable()
	private _intimidate = new Rollable()
	private _jump = new Rollable()
	private _languageOwn = new Rollable()
	private _law = new Rollable()
	private _libraryUse = new Rollable()
	private _listen = new Rollable()
	private _locksmith = new Rollable()
	private _mechanicalRepair = new Rollable()
	private _medicine = new Rollable()
	private _naturalWorld = new Rollable()
	private _navigate = new Rollable()
	private _occult = new Rollable()
	private _operateHeavyMachinery = new Rollable()
	private _persuade = new Rollable()
	private _psychology = new Rollable()
	private _psychoanalysis = new Rollable()
	private _ride = new Rollable()
	private _sleightOfHand = new Rollable()
	private _spotHidden = new Rollable()
	private _stealth = new Rollable()
	private _swim = new Rollable()
	private _throw = new Rollable()
	private _track = new Rollable()

	public constructor() {
		this._accounting.value = 5
		this._anthropology.value = 1
		this._appraise.value = 5
		this._charm.value = 15
		this._climb.value = 20
		this._disguise.value = 5
		this._driveAuto.value = 20
		this._electricalRepair.value = 10
		this._fastTalk.value = 5
		this._fightingBrawl.value = 25
		this._firearmsHandgun.value = 20
		this._firearmsRifleShotgun.value = 25
		this._firstAid.value = 30
		this._history.value = 5
		this._intimidate.value = 15
		this._jump.value = 20
		this._law.value = 5
		this._libraryUse.value = 20
		this._listen.value = 20
		this._locksmith.value = 1
		this._mechanicalRepair.value = 10
		this._medicine.value = 1
		this._naturalWorld.value = 10
		this._navigate.value = 10
		this._occult.value = 5
		this._operateHeavyMachinery.value = 1
		this._persuade.value = 10
		this._psychology.value = 10
		this._psychoanalysis.value = 1
		this._ride.value = 5
		this._sleightOfHand.value = 10
		this._spotHidden.value = 25
		this._stealth.value = 20
		this._swim.value = 20
		this._throw.value = 20
		this._track.value = 10
	}

	public get accounting(): Rollable {
		return this._accounting
	}

	public get anthropology(): Rollable {
		return this._anthropology
	}

	public get appraise(): Rollable {
		return this._appraise
	}

	public get charm(): Rollable {
		return this._charm
	}

	public get climb(): Rollable {
		return this._climb
	}

	public get creditRating(): Rollable {
		return this._creditRating
	}

	public get cthulhuMythos(): Rollable {
		return this._cthulhuMythos
	}

	public get disguise(): Rollable {
		return this._disguise
	}

	public get dodge(): Rollable {
		return this._dodge
	}

	public get driveAuto(): Rollable {
		return this._driveAuto
	}

	public get electricalRepair(): Rollable {
		return this._electricalRepair
	}

	public get fastTalk(): Rollable {
		return this._fastTalk
	}

	public get fightingBrawl(): Rollable {
		return this._fightingBrawl
	}

	public get firearmsHandgun(): Rollable {
		return this._firearmsHandgun
	}

	public get firearmsRifleShotgun(): Rollable {
		return this._firearmsRifleShotgun
	}

	public get firstAid(): Rollable {
		return this._firstAid
	}

	public get history(): Rollable {
		return this._history
	}

	public get intimidate(): Rollable {
		return this._intimidate
	}

	public get jump(): Rollable {
		return this._jump
	}

	public get languageOwn(): Rollable {
		return this._languageOwn
	}

	public get law(): Rollable {
		return this._law
	}

	public get libraryUse(): Rollable {
		return this._libraryUse
	}

	public get listen(): Rollable {
		return this._listen
	}

	public get locksmith(): Rollable {
		return this._locksmith
	}

	public get mechanicalRepair(): Rollable {
		return this._mechanicalRepair
	}

	public get medicine(): Rollable {
		return this._medicine
	}

	public get naturalWorld(): Rollable {
		return this._naturalWorld
	}

	public get navigate(): Rollable {
		return this._navigate
	}

	public get occult(): Rollable {
		return this._occult
	}

	public get operateHeavyMachinery(): Rollable {
		return this._operateHeavyMachinery
	}

	public get persuade(): Rollable {
		return this._persuade
	}

	public get psychology(): Rollable {
		return this._psychology
	}

	public get psychoanalysis(): Rollable {
		return this._psychoanalysis
	}

	public get ride(): Rollable {
		return this._ride
	}

	public get sleightOfHand(): Rollable {
		return this._sleightOfHand
	}

	public get spotHidden(): Rollable {
		return this._spotHidden
	}

	public get stealth(): Rollable {
		return this._stealth
	}

	public get swim(): Rollable {
		return this._swim
	}

	public get throw(): Rollable {
		return this._throw
	}

	public get track(): Rollable {
		return this._track
	}
}
