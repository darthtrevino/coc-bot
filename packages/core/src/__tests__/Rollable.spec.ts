import { Rollable, IllegalRollableValueError } from '../Rollable'

describe('A character rollable value', () => {
	it('can get/set the value', () => {
		const attribute = new Rollable()
		expect(attribute.value).toEqual(0)
		attribute.value = 10
		expect(attribute.value).toEqual(10)
	})

	it('throws if a negative attribute value is set', () => {
		const attribute = new Rollable()
		expect(() => (attribute.value = -1)).toThrow(IllegalRollableValueError)
	})

	it('can get half/fifth values', () => {
		const attribute = new Rollable()
		attribute.value = 100
		expect(attribute.halfValue).toEqual(50)
		expect(attribute.fifthValue).toEqual(20)

		attribute.value = 1
		expect(attribute.halfValue).toEqual(0)
		expect(attribute.fifthValue).toEqual(0)

		attribute.value = 2
		expect(attribute.halfValue).toEqual(1)
		expect(attribute.fifthValue).toEqual(0)

		attribute.value = 3
		expect(attribute.halfValue).toEqual(1)
		expect(attribute.fifthValue).toEqual(0)

		attribute.value = 4
		expect(attribute.halfValue).toEqual(2)
		expect(attribute.fifthValue).toEqual(0)

		attribute.value = 5
		expect(attribute.halfValue).toEqual(2)
		expect(attribute.fifthValue).toEqual(1)
	})
})
