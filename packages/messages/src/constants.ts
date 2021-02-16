export const HELP_MESSAGE_BOT = `\n
__**Available Commands**__

**Print Usage**
\`/cc help\`

**General Die Rolling**
\`/cc roll d6\`
\`/cc roll 2d8\`
\`/cc roll d6+2d8 #label\`
\`/cc roll 2d20kh1 #attack-with-advantage\`
\`/cc roll 2d20kl1 #attack-with-disadvantage\`

**Call of Cthulhu Die Rolling**
\`/cc roll <attributeScore>\`
\`/cc roll <attributeScore>b<numBonus>\`
\`/cc roll <attributeScore>p<numPenalty>\`
\`/cc roll <attributeScore> #label\`

e.g. \`/cc roll 25b2 "handgun"\` rolls against a skill with a value of 25 labeled "handgun" with 2 bonus dice
`

export const DID_NOT_UNDERSTAND_MESSAGE =
	"Oops, I didn't understand that command."

export const ABILITY_STRINGS_NOT_IMPL =
	"I can't handle ability names just yet. Try rolling against your ability value (e.g. roll against 75)"

export const NOT_IMPL = `Oops, that's not implemented yet`
