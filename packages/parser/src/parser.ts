import { Parser, Grammar } from 'nearley'
const grammar = require('../grammar')

export enum CommandType {
  Roll = 'roll'
}

export interface Command {
  type: CommandType
}

export interface RollCommand extends Command {
  type: CommandType.Roll
  ability: number | string
  label?: string
  bonusDice?: number
  penaltyDice?: number
}

export function parseCommand<T extends Command>(command: string): T {
  const parser = new Parser(Grammar.fromCompiled(grammar))
  const result = parser.feed(command)
  return result.results[0]
}
