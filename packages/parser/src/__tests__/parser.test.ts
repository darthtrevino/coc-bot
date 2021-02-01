import { CommandType, HelpCommand, parseCommand, RollCommand } from '../parser'

describe('The Command Parser', () => {
	describe('roll commands', () => {
		it('can handle a roll command on a numeric skill value', () => {
			const command = 'roll 100'
			const result = parseCommand<RollCommand>(command)
			expect(result.type).toEqual(CommandType.Roll)
			expect(result.ability).toEqual(100)
		})

		it('can handle a roll command on a numeric skill value with bonus dice', () => {
			let command = 'roll 100 with bonus'
			let result = parseCommand<RollCommand>(command)
			expect(result.type).toEqual(CommandType.Roll)
			expect(result.ability).toEqual(100)
			expect(result.bonusDice).toEqual(1)

			command = 'roll 100 with bonus die'
			result = parseCommand<RollCommand>(command)
			expect(result.type).toEqual(CommandType.Roll)
			expect(result.ability).toEqual(100)
			expect(result.bonusDice).toEqual(1)

			command = 'roll 88 with bonus dice'
			result = parseCommand<RollCommand>(command)
			expect(result.type).toEqual(CommandType.Roll)
			expect(result.ability).toEqual(88)
			expect(result.bonusDice).toEqual(1)

			command = 'roll 88 with 1 bonus'
			result = parseCommand<RollCommand>(command)
			expect(result.type).toEqual(CommandType.Roll)
			expect(result.ability).toEqual(88)
			expect(result.bonusDice).toEqual(1)

			command = 'roll 88 with 1 bonus die'
			result = parseCommand<RollCommand>(command)
			expect(result.type).toEqual(CommandType.Roll)
			expect(result.ability).toEqual(88)
			expect(result.bonusDice).toEqual(1)

			command = 'roll 88 with 1 bonus dice'
			result = parseCommand<RollCommand>(command)
			expect(result.type).toEqual(CommandType.Roll)
			expect(result.ability).toEqual(88)
			expect(result.bonusDice).toEqual(1)
		})

		it('can handle a roll command on a numeric skill value with penalty dice', () => {
			let command = 'roll 100 with penalty'
			let result = parseCommand<RollCommand>(command)
			expect(result.type).toEqual(CommandType.Roll)
			expect(result.ability).toEqual(100)
			expect(result.penaltyDice).toEqual(1)

			command = 'roll 100 with penalty die'
			result = parseCommand<RollCommand>(command)
			expect(result.type).toEqual(CommandType.Roll)
			expect(result.ability).toEqual(100)
			expect(result.penaltyDice).toEqual(1)

			command = 'roll 88 with penalty dice'
			result = parseCommand<RollCommand>(command)
			expect(result.type).toEqual(CommandType.Roll)
			expect(result.ability).toEqual(88)
			expect(result.penaltyDice).toEqual(1)

			command = 'roll 88 with 1 penalty'
			result = parseCommand<RollCommand>(command)
			expect(result.type).toEqual(CommandType.Roll)
			expect(result.ability).toEqual(88)
			expect(result.penaltyDice).toEqual(1)

			command = 'roll 88 with 1 penalty die'
			result = parseCommand<RollCommand>(command)
			expect(result.type).toEqual(CommandType.Roll)
			expect(result.ability).toEqual(88)
			expect(result.penaltyDice).toEqual(1)

			command = 'roll 88 with 1 penalty dice'
			result = parseCommand<RollCommand>(command)
			expect(result.type).toEqual(CommandType.Roll)
			expect(result.ability).toEqual(88)
			expect(result.penaltyDice).toEqual(1)
		})

		it('can handle rolls against named skill values', () => {
			let command = 'roll "fast talk" with 1 penalty dice'
			let result = parseCommand<RollCommand>(command)
			expect(result.type).toEqual(CommandType.Roll)
			expect(result.ability).toEqual('fast talk')
			expect(result.penaltyDice).toEqual(1)

			command = "roll 'fast talk' with 1 penalty dice"
			result = parseCommand<RollCommand>(command)
			expect(result.type).toEqual(CommandType.Roll)
			expect(result.ability).toEqual('fast talk')
			expect(result.penaltyDice).toEqual(1)

			command = "roll against 'fast talk' with 1 penalty"
			result = parseCommand<RollCommand>(command)
			expect(result.type).toEqual(CommandType.Roll)
			expect(result.ability).toEqual('fast talk')
			expect(result.penaltyDice).toEqual(1)

			command = "roll on 'fast talk' with bonus"
			result = parseCommand<RollCommand>(command)
			expect(result.type).toEqual(CommandType.Roll)
			expect(result.ability).toEqual('fast talk')
			expect(result.bonusDice).toEqual(1)
		})

		it('can handle a malformed command', () => {
			expect(() => parseCommand('derp herp')).toThrow()
		})

		it('can handle rolll labels', () => {
			let command = 'roll 20 for "stealth"'
			let result = parseCommand<RollCommand>(command)

			expect(result.type).toEqual(CommandType.Roll)
			expect(result.label).toEqual('stealth')
		})
	})

	describe('Help Command', () => {
		it('can process a help command', () => {
			const result = parseCommand<HelpCommand>('help')
			expect(result.type).toEqual(CommandType.Help)
		})
	})
})
