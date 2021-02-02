import fetch from 'node-fetch'
const botToken = process.env.BOT_TOKEN
const clientId = process.env.BOT_CLIENT_ID
const apiEndpoint = `https://discord.com/api/v8/applications/${clientId}/commands`

/* eslint-disable-next-line @typescript-eslint/no-var-requires */
const commandData = require('./BOT_CLI.json')

async function main() {
	const response = await fetch(apiEndpoint, {
		method: 'post',
		body: JSON.stringify(commandData),
		headers: {
			Authorization: 'Bot ' + botToken,
			'Content-Type': 'application/json',
		},
	})
	const json = await response.json()
	const { errors } = json
	console.log(json, errors?.name?._errors)
}
main()
