import {
	CommandType,
	HelpCommand,
	parseCommand,
	RollCommand,
	RollExpressionOpType,
	GameSubCommandType,
	GameCommand,
} from '../parser'

describe('The Command Parser', () => {
	it('can handle a malformed command', () => {
		expect(() => parseCommand('derp herp')).toThrow()
	})

	describe('roll commands', () => {
		it('can treat the roll symbol as optional', () => {
			let result = parseCommand<RollCommand>('75')
			expect(result.type).toEqual(CommandType.Roll)
			expect(result.ability).toEqual(75)

			result = parseCommand<RollCommand>('2d20')
			expect(result.type).toEqual(CommandType.Roll)
			expect(result.expr).toEqual({ die: 20, count: 2 })
		})

		it('can handle a roll command on a numeric skill value', () => {
			const command = 'roll 100'
			const result = parseCommand<RollCommand>(command)
			expect(result.type).toEqual(CommandType.Roll)
			expect(result.ability).toEqual(100)
		})

		it('can handle roll labels', () => {
			let command = 'roll 20'
			let result = parseCommand<RollCommand>(command)
			expect(result.type).toEqual(CommandType.Roll)
			expect(result.ability).toEqual(20)
			expect(result.label).toBeFalsy()

			command = 'roll 20 # stealth'
			result = parseCommand<RollCommand>(command)
			expect(result.type).toEqual(CommandType.Roll)
			expect(result.label).toEqual('stealth')
		})

		it('can handle short-form syntax', () => {
			let result = parseCommand<RollCommand>('roll 20b2 #shotgun')
			expect(result.bonusDice).toEqual(2)
			expect(result.label).toEqual('shotgun')

			result = parseCommand<RollCommand>('roll 20b2 # knife')
			expect(result.bonusDice).toEqual(2)
			expect(result.label).toEqual('knife')

			result = parseCommand<RollCommand>('roll 20b1')
			expect(result.bonusDice).toEqual(1)

			result = parseCommand<RollCommand>('roll 20b')
			expect(result.bonusDice).toEqual(1)

			result = parseCommand<RollCommand>('roll 20p2')
			expect(result.penaltyDice).toEqual(2)

			result = parseCommand<RollCommand>('roll 20p1')
			expect(result.penaltyDice).toEqual(1)

			result = parseCommand<RollCommand>('roll 20p')
			expect(result.penaltyDice).toEqual(1)
		})

		it('can process freeform die rolls', () => {
			let result = parseCommand<RollCommand>('roll d6')
			expect(result.expr).toEqual({ die: 6, count: 1 })

			result = parseCommand<RollCommand>('roll 2d8')
			expect(result.expr).toEqual({ die: 8, count: 2 })

			result = parseCommand<RollCommand>('roll 2d6+2d8')
			expect(result.expr).toEqual({
				operation: RollExpressionOpType.Add,
				operands: [
					{ die: 6, count: 2 },
					{ die: 8, count: 2 },
				],
			})

			result = parseCommand<RollCommand>('roll 2d6 + 2d8')
			expect(result.expr).toEqual({
				operation: RollExpressionOpType.Add,
				operands: [
					{ die: 6, count: 2 },
					{ die: 8, count: 2 },
				],
			})

			result = parseCommand<RollCommand>('roll 1d6-1d4')
			expect(result.expr).toEqual({
				operation: RollExpressionOpType.Subtract,
				operands: [
					{ die: 6, count: 1 },
					{ die: 4, count: 1 },
				],
			})

			result = parseCommand<RollCommand>('roll 1d6-1d4')
			expect(result.expr).toEqual({
				operation: RollExpressionOpType.Subtract,
				operands: [
					{ die: 6, count: 1 },
					{ die: 4, count: 1 },
				],
			})

			result = parseCommand<RollCommand>('roll 1d6 + 1d4 + 1d2 + 2 #stealth')
			expect(result.label).toEqual('stealth')
			expect(result.expr).toEqual({
				operation: RollExpressionOpType.Add,
				operands: [
					{ die: 6, count: 1 },
					{
						operation: RollExpressionOpType.Add,
						operands: [
							{ die: 4, count: 1 },
							{
								operation: RollExpressionOpType.Add,
								operands: [{ die: 2, count: 1 }, { value: 2 }],
							},
						],
					},
				],
			})

			result = parseCommand<RollCommand>('roll 1d6-2')
			expect(result.expr).toEqual({
				operation: RollExpressionOpType.Subtract,
				operands: [{ die: 6, count: 1 }, { value: 2 }],
			})

			result = parseCommand<RollCommand>('roll d20+2 #stealth')
			expect(result.label).toEqual('stealth')
			expect(result.expr).toEqual({
				operation: RollExpressionOpType.Add,
				operands: [{ die: 20, count: 1 }, { value: 2 }],
			})
		})

		it('can roll kh<n> kl<n> rolls', () => {
			let result = parseCommand<RollCommand>('roll 2d6kh1')
			expect(result.expr).toEqual({ die: 6, count: 2, keepHighest: 1 })

			result = parseCommand<RollCommand>('roll 2d20kl1')
			expect(result.expr).toEqual({ die: 20, count: 2, keepLowest: 1 })

			result = parseCommand<RollCommand>('roll 2d20kl1+2d6kh2')
			expect(result.expr).toEqual({
				operation: RollExpressionOpType.Add,
				operands: [
					{ die: 20, count: 2, keepLowest: 1 },
					{ die: 6, count: 2, keepHighest: 2 },
				],
			})
		})
	})

	describe('game commands', () => {
		it('can get help on a game command', () => {
			let result = parseCommand<GameCommand>('game help')
			expect(result.type).toEqual(CommandType.Game)
			expect(result.subcommand).toEqual(GameSubCommandType.Help)

			result = parseCommand<GameCommand>('game')
			expect(result.type).toEqual(CommandType.Game)
			expect(result.subcommand).toEqual(GameSubCommandType.Help)
		})
	})

	describe('Help Command', () => {
		it('can process a help command', () => {
			const result = parseCommand<HelpCommand>('help')
			expect(result.type).toEqual(CommandType.Help)
		})
	})
})
