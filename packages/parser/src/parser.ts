import grammar from '../grammar'
import { Parser, Grammar } from 'nearley'

export enum CommandType {
  Roll = 'roll'
}

export interface Command {
  command: CommandType
}

export interface RollCommand extends Command {
  command: CommandType.Roll
  ability: number | string
  bonusDice?: number
  penaltyDice?: number
}

export function parseCommand<T extends Command>(command: string): T {
  const parser = new Parser(Grammar.fromCompiled(grammar))
  const result = parser.feed(command)
  return result.results[0]
}
