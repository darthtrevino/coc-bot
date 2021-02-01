import { CommandType, HelpCommand, parseCommand, RollCommand } from '../parser'

describe('The Command Parser', () => {
	it('can handle a malformed command', () => {
		expect(() => parseCommand('derp herp')).toThrow()
	})

	describe('roll commands', () => {
		it('can handle a roll command on a numeric skill value', () => {
			const command = 'roll 100'
			const result = parseCommand<RollCommand>(command)
			expect(result.type).toEqual(CommandType.Roll)
			expect(result.ability).toEqual(100)
		})

		it('can handle roll labels', () => {
			const command = 'roll 20 for "stealth"'
			const result = parseCommand<RollCommand>(command)

			expect(result.type).toEqual(CommandType.Roll)
			expect(result.label).toEqual('stealth')
		})

		it('can handle short-form syntax', () => {
			let result = parseCommand<RollCommand>('roll 20 b2 "shotgun"')
			expect(result.bonusDice).toEqual(2)
			expect(result.label).toEqual('shotgun')

			result = parseCommand<RollCommand>('roll 20 b1')
			expect(result.bonusDice).toEqual(1)

			result = parseCommand<RollCommand>('roll 20 b')
			expect(result.bonusDice).toEqual(1)

			result = parseCommand<RollCommand>('roll 20 p2')
			expect(result.penaltyDice).toEqual(2)

			result = parseCommand<RollCommand>('roll 20 p1')
			expect(result.penaltyDice).toEqual(1)

			result = parseCommand<RollCommand>('roll 20 p')
			expect(result.penaltyDice).toEqual(1)
		})
	})

	describe('Help Command', () => {
		it('can process a help command', () => {
			const result = parseCommand<HelpCommand>('help')
			expect(result.type).toEqual(CommandType.Help)
		})
	})
})
