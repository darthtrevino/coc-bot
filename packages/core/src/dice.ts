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

export function rollD4(): number {
	return getRandomInt(1, 5)
}
export function rollD6(): number {
	return getRandomInt(1, 7)
}
export function rollD8(): number {
	return getRandomInt(1, 9)
}
export function rollD10(): number {
	return getRandomInt(0, 10)
}
export function rollD12(): number {
	return getRandomInt(1, 13)
}
export function rollD20(): number {
	return getRandomInt(1, 21)
}
