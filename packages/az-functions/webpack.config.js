/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = {
	target: 'node',
	entry: {
		DiscordMessageHandler: path.resolve(
			__dirname,
			'./DiscordMessageHandler/index.ts'
		),
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
		plugins: [new TsconfigPathsPlugin()],
	},
	output: {
		filename: '[name]/index.js',
		path: path.resolve(__dirname, 'dist'),
		libraryTarget: 'commonjs', // IMPORTANT!
	},
}
