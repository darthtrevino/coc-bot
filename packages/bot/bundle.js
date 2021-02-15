/* eslint-disable @typescript-eslint/no-var-requires */
const { pnpPlugin } = require('@yarnpkg/esbuild-plugin-pnp')
const path = require('path')

require('esbuild')
	.build({
		plugins: [
			pnpPlugin({
				baseDir: path.join(__dirname),
			}),
		],
		entryPoints: ['src/index.ts'],
		bundle: true,
		format: 'cjs',
		outfile: 'dist/app.js',
		external: ['config*', 'discord.js'],
	})
	.catch(() => process.exit(1))
