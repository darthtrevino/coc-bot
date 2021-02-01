/**
 * 
 * @param min Min inclusive
 * @param max Max exclusive
 */
export function getRandomInt(min: number, max: number): number {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min) + min)
}

export function rollD10() {
  return getRandomInt(0, 10)
}


