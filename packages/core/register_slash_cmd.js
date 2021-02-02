const apiEndpoint =
	'https://discord.com/api/v8/applications/805146614841999371/commands'
const botToken = 'ODA1MTQ2NjE0ODQxOTk5Mzcx.YBWpNw.2cPVGnJBy8VfQzsKZzrKhs0t1fk'

const commandData = {
	name: 'coc',
	description: 'Call of Cthulhu Game Commands',
	options: [
		{
			name: 'roll',
			description: 'Roll on a skill',
			type: 1, // 1 is type SUB_COMMAND
			options: [
				{
					name: 'skill',
					description: 'The skill/attribute value to roll against',
					type: 4,
					required: true,
				},
				{
					name: 'bonus',
					description: 'The number of bonus dice to use',
					type: 4,
					required: false,
				},
				{
					name: 'penalty',
					description: 'The number of penalty dice to use',
					type: 4,
					required: false,
				},
				{
					name: 'label',
					description: 'The roll label',
					type: 3,
					required: false,
				},
			],
		},
	],
}

async function main() {
	const fetch = require('node-fetch')

	const response = await fetch(apiEndpoint, {
		method: 'post',
		body: JSON.stringify(commandData),
		headers: {
			Authorization: 'Bot ' + botToken,
			'Content-Type': 'application/json',
		},
	})
	const json = await response.json()
	const { code, errors, message } = json
	console.log(json, errors?.name?._errors)
}
main()
