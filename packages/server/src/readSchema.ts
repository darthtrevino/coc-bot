import { gql } from 'apollo-server'
import * as fs from 'fs'
import { DocumentNode } from 'graphql'

export function readSchema(): DocumentNode {
	const schemaText = fs
		.readFileSync(require.resolve('@cocbot/schema/schema.gql'))
		.toString()
	return gql(schemaText)
}
