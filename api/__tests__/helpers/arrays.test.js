import { faker } from '@faker-js/faker'
import { chunk } from '../../helpers/arrays'

describe('Test the arrays helpers', () => {
  test('chunk breaks array into chunks of sub-arrays', () => {
    const originalArrayLength = faker.number.int({ min: 50, max: 100 })
    const originalArray = Array.from(Array(originalArrayLength))
    const chunkLength = faker.number.int({ min: 2, max: 10 })

    const chunkedArray = chunk(originalArray, chunkLength)

    expect(chunkedArray.length).toBe(
      Math.ceil(originalArrayLength / chunkLength),
    )
    expect(chunkedArray.pop().length).toBe(
      originalArrayLength % chunkLength > 0
        ? originalArrayLength % chunkLength
        : chunkLength,
    )
  })
})
