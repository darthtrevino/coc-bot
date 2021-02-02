const STRING_TYPE = 3
const INT_TYPE = 4

export const commandData = {
	name: 'coc',
	description: 'Call of Cthulhu Game Commands',
	options: [
		{
			name: 'roll',
			description: 'Roll on a skill',
			type: 1,
			options: [
				{
					name: 'expr',
					description: 'The shorthand roll expression (e.g. 15b, 25b2, 12p2)',
					type: STRING_TYPE,
					required: false,
				},
				{
					name: 'target',
					description: 'The target value to roll against',
					type: INT_TYPE,
					required: false,
				},
				{
					name: 'bonus',
					description: 'The number of bonus dice to use',
					type: INT_TYPE,
					required: false,
				},
				{
					name: 'penalty',
					description: 'The number of penalty dice to use',
					type: INT_TYPE,
					required: false,
				},
				{
					name: 'label',
					description: 'The roll label',
					type: STRING_TYPE,
					required: false,
				},
			],
		},
	],
}
