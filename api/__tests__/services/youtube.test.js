const { faker } = require('@faker-js/faker')
const logging = require('../../services/logging')
const youTubeService = require('../../services/youTube')

describe('Test the YouTube service', () => {
  test('getVideoWebpagePlayerOnly', () => {
    // Set up fake test data
    const fakeYouTubeId = faker.lorem.word(11)
    const fakeVideoWebPage = `https://youtube.com/watch?v=${fakeYouTubeId}`
    const fakeVideoWebPagePlayerOnly = `https://www.youtube.com/embed/${fakeYouTubeId}`

    // Mock dependencies
    const getVideoIdFromUrlSpy = jest
      .spyOn(youTubeService, 'getVideoIdFromUrl')
      .mockImplementation(() => fakeYouTubeId)

    // Run the function we're testing
    const response = youTubeService.getVideoWebpagePlayerOnly(fakeVideoWebPage)

    // Check our test expectations are met
    expect(getVideoIdFromUrlSpy).toHaveBeenCalledTimes(1)
    expect(getVideoIdFromUrlSpy).toHaveBeenCalledWith(fakeVideoWebPage)
    expect(response).toEqual(fakeVideoWebPagePlayerOnly)

    // Clean up
    getVideoIdFromUrlSpy.mockRestore()
  })

  test('getVideoIdFromUrl correctly gets the video ID from a YouTube video page URL', () => {
    // Set up fake test data
    const fakeYouTubeId = faker.lorem.word(11)
    const fakeVideoWebPages = [
      `https://youtube.com/watch?v=${fakeYouTubeId}`,
      `https://youtu.be/${fakeYouTubeId}`,
    ]

    // Mock dependencies
    const logErrorSpy = jest
      .spyOn(logging, 'logError')
      .mockImplementation(() => {})

    for (const fakeVideoWebPage of fakeVideoWebPages) {
      // Run the function we're testing
      const response = youTubeService.getVideoIdFromUrl(fakeVideoWebPage)

      // Check our test expectations are met
      expect(response).toEqual(fakeYouTubeId)
    }

    // Clean up
    logErrorSpy.mockRestore()
  })

  test('getVideoIdFromUrl checks it is a YouTube URL', () => {
    // Set up fake test data
    const nonYouTubeWebPage = faker.internet.url()

    // Mock dependencies
    const logErrorSpy = jest
      .spyOn(logging, 'logError')
      .mockImplementation(() => {})

    // Run the function we're testing
    const response = youTubeService.getVideoIdFromUrl(nonYouTubeWebPage)

    // Check our test expectations are met
    expect(response).toEqual(undefined)

    // Clean up
    logErrorSpy.mockRestore()
  })
})
