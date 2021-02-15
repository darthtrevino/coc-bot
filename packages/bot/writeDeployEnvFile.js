/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const path = require('path')

if (process.env.BOT_TOKEN == null) {
	throw new Error(`process.env.BOT_TOKEN must be defined`)
}

const content = `BOT_TOKEN=${process.env.BOT_TOKEN}
`

fs.writeFileSync(path.join(__dirname, 'dist/.env'), content)
