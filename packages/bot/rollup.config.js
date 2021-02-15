/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
const alias = require('@rollup/plugin-alias')
const json = require('@rollup/plugin-json')

const config = {
	input: 'lib/index.js',
	external: [
		'discord.js',
		'config',
		'cross-fetch',
		'dotenv',
		'graphql',
		'graphql-request',
		'express',
	],
	plugins: [
		alias({
			entries: {
				'@cocbot/core': '@cocbot/core/lib/index',
				'@cocbot/parser': '@cocbot/parser/lib/index',
			},
		}),
		nodeResolve(),
		commonjs(),
		json(),
	],
	output: {
		file: path.join(__dirname, 'dist/index.js'),
		format: 'cjs',
	},
}

export default config
