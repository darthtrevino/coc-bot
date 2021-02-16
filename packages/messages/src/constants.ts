export const HELP_MESSAGE_BOT = `\n
__**Available Commands**__

**Print Usage**
\`/cc help\`

**General Dice Rolling Examples**
\`/cc roll d6\` (single six-sided die)
\`/cc roll 2d8\` (two eight-sided dice)
\`/cc d6\` (shorthand)
\`/cc 2d8\` (shorthand)
\`/cc d6+2d8+4 #fireball\` (add rolls, use label)
\`/cc 2d20kh1 #attack-with-advantage\` (keep-highest form)
\`/cc 2d20kl1 #attack-with-disadvantage\` (keep-lowest form)

**_Call of Cthulhu_ Die Rolling Examples**
\`/cc roll 40 #stealth\` (against an attribute score of 40, labeled for stealth)
\`/cc roll 25b\` (with a single bonus die)
\`/cc roll 25p\` (with a single penalty die)
\`/cc 25b2\` (shorthand, two bonus dice)
\`/cc 25p2\` (shorthand, twe penalty dice)
`

export const DID_NOT_UNDERSTAND_MESSAGE =
	"Oops, I didn't understand that command."

export const ABILITY_STRINGS_NOT_IMPL =
	"I can't handle ability names just yet. Try rolling against your ability value (e.g. roll against 75)"

export const NOT_IMPL = `Oops, that's not implemented yet`
