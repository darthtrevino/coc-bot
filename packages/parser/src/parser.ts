import { Parser, Grammar } from 'nearley'
/* eslint-disable no-use-before-define */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const grammar = require('../grammar')

export enum CommandType {
	Roll = 'roll',
	Help = 'help',
	Game = 'game',
}

export enum GameSubCommandType {
	Create = 'create',
	List = 'list',
	Help = 'help',
}

export enum RollExpressionOpType {
	Add = 'add',
	Subtract = 'subtract',
}

export interface Command {
	type: CommandType
}

export interface GameCommand {
	type: CommandType.Game
	subcommand: GameSubCommandType
}

export interface RollExpressionClause {
	die: number
	count: number
	keepHighest?: number
	keepLowest?: number
}

export interface RollExpressionOp {
	operation: RollExpressionOpType
	operands: [RollExpression]
}

export interface RollValueExpresionClause {
	value: number
}

export type RollExpression =
	| RollExpressionClause
	| RollExpressionOp
	| RollValueExpresionClause

export interface RollCommand extends Command {
	type: CommandType.Roll
	ability: number | string
	label?: string
	bonusDice?: number
	penaltyDice?: number

	// Freeform Roll Expressions
	expr?: RollExpression
}

export interface HelpCommand extends Command {
	type: CommandType.Help
}

export function parseCommand<T extends Command>(command: string): T {
	const parser = new Parser(Grammar.fromCompiled(grammar))
	const result = parser.feed(command)
	return result.results[0]
}
