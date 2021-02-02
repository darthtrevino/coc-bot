const STRING_TYPE = 3
const INT_TYPE = 4

export const commandData = {
	name: 'coc',
	description: 'Call of Cthulhu Game Commands',
	options: [
		{
			name: 'roll',
			description: 'Roll against an attribute/skill',
			type: 1,
			options: [
				{
					name: 'target',
					description: 'The target skill or attribute value to roll against',
					type: INT_TYPE,
					required: true,
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
		{
			name: 'r',
			description: 'Roll against an attribute/skill (terse form)',
			type: 1,
			options: [
				{
					name: 'expr',
					description:
						'The roll expression <target>(b|p)<numDice>. (e.g. 25b, 25b2, 25p1) ',
					type: STRING_TYPE,
					required: true,
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
