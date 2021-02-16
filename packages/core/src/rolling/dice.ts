/**
 * Generates a random integener betwene a range
 * @param min Min inclusive
 * @param max Max exclusive
 */
export function getRandomInt(min: number, max: number): number {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min) + min)
}

/**
 * Roll an n-sided die. Values are from [1, n-1]
 * @param sides The # of sides on the die
 */
export function rollDN(sides: number): number {
	return getRandomInt(1, sides + 1)
}

/**
 * 10 sided dice are 0-9
 */
export function rollD10(): number {
	return getRandomInt(0, 10)
}

/**
 * Roll a four sided die
 */
export function rollD4(): number {
	return rollDN(4)
}

/**
 * Roll a six sided die
 */
export function rollD6(): number {
	return rollDN(6)
}

/**
 * Roll an eight-sided die
 */
export function rollD8(): number {
	return rollDN(8)
}

/**
 * Roll a twelve-sided die
 */
export function rollD12(): number {
	return rollDN(12)
}

/**
 * Roll a twenty-sided die
 */
export function rollD20(): number {
	return rollDN(20)
}
