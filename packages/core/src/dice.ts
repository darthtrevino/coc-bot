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

export function rollDN(sides: number): number {
	return getRandomInt(1, sides + 1)
}

export function rollD4(): number {
	return rollDN(4)
}
export function rollD6(): number {
	return rollDN(6)
}
export function rollD8(): number {
	return rollDN(8)
}
export function rollD12(): number {
	return rollDN(12)
}
export function rollD20(): number {
	return rollDN(20)
}

/**
 * 10 sided dire are 0-9
 */
export function rollD10(): number {
	return getRandomInt(0, 10)
}
