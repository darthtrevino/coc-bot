const SUBCOMMAND_TYPE = 1
const SUBCOMMAND_GROUP_TYPE = 2
const STRING_TYPE = 3
const INT_TYPE = 4

export const commandData = {
	name: 'coc',
	description: 'Call of Cthulhu Game Commands',
	options: [
		// Roll on a Skill
		{
			name: 'roll',
			description: 'Roll against an attribute/skill',
			type: SUBCOMMAND_TYPE,
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
		// Roll terse form
		{
			name: 'r',
			description: 'Roll against an attribute/skill (terse form)',
			type: 1,
			options: [
				{
					name: 'target',
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
		// Game Management
		{
			name: 'game',
			description: 'Game management commands',
			type: SUBCOMMAND_GROUP_TYPE,
			options: [
				{
					name: 'create',
					description: 'Create a new game',
					type: SUBCOMMAND_TYPE,
					options: [
						{
							name: 'title',
							type: STRING_TYPE,
						},
						{
							name: 'description',
							type: STRING_TYPE,
						},
					],
				},
				{
					name: 'delete',
					description: 'Delete a game',
					type: SUBCOMMAND_TYPE,
					options: [{ name: 'id', type: INT_TYPE }],
				},
				{
					name: 'info',
					description:
						'View information about a game; including how to update it',
					type: SUBCOMMAND_TYPE,
				},
			],
		},

		// Play Commands
		{
			name: 'play',
			description: 'Game play Commands',
			type: SUBCOMMAND_GROUP_TYPE,
			options: {},
		},
	],
}
