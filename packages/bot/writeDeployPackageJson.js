/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const fs = require('fs')
const { name, version, dependencies } = require('./package.json')

const deployPackage = {
	name,
	version,
	dependencies,
	main: 'index.js',
}

// these dependencies are bundled into the js file
delete deployPackage.dependencies['@cocbot/schema']
delete deployPackage.dependencies['@cocbot/core']
delete deployPackage.dependencies['@cocbot/parser']

fs.writeFileSync(
	path.join(__dirname, 'dist/package.json'),
	JSON.stringify(deployPackage, null, 2)
)
