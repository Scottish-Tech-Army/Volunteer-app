import { faker } from '@faker-js/faker'
import axios from 'axios'
import logging from '../../services/logging'
import vimeoService, { getVideoThumbnail, getVideoWebpagePlayerOnly, getVideoIdFromUrl } from '../../services/vimeo'

describe('Test the Vimeo service', () => {
  test('getVideoThumbnail', async () => {
    // Set up fake test data
    const fakeVimeoId = faker.number.int({ min: 100000000, max: 999999999 })
    const fakeVideoWebPage = `https://vimeo.com/${fakeVimeoId}`
    const fakeApiVimeoCall = `https://player.vimeo.com/video/${fakeVimeoId}/config`

    // Vimeo API returns a variety of different size thumbnails -- numbers refer to pixel widths of images
    const fakeThumbnailBase = faker.internet.url()
    const fakeThumbnail960 = faker.internet.url()
    const fakeThumbnail1280 = faker.internet.url()

    const fakeVimeoData = {
      data: {
        video: {
          thumbs: {
            base: fakeThumbnailBase,
            960: fakeThumbnail960,
            1280: fakeThumbnail1280,
          },
        },
      },
      status: 200,
    }

    // Mock dependencies
    const getVideoIdFromUrlSpy = jest
      .spyOn(vimeoService, 'getVideoIdFromUrl')
      .mockImplementation(() => fakeVimeoId)
    const axiosSpy = jest
      .spyOn(axios, 'get')
      .mockImplementation(() => Promise.resolve(fakeVimeoData))
    const logErrorSpy = jest
      .spyOn(logging, 'logError')
      .mockImplementation(() => {})

    // Run the function we're testing
    const response = await getVideoThumbnail(fakeVideoWebPage)

    // Check our test expectations are met
    expect(getVideoIdFromUrlSpy).toHaveBeenCalledTimes(1)
    expect(axiosSpy).toHaveBeenCalledTimes(1)
    expect(axiosSpy).toHaveBeenCalledWith(fakeApiVimeoCall)
    expect(response).toEqual(`${fakeThumbnail1280}.jpg`)

    // Clean up
    getVideoIdFromUrlSpy.mockRestore()
    axiosSpy.mockRestore()
    logErrorSpy.mockRestore()
  })

  test('getVideoWebpagePlayerOnly', async () => {
    // Set up fake test data
    const fakeVimeoId = faker.number.int({ min: 100000000, max: 999999999 })
    const fakeVideoWebPage = `https://vimeo.com/${fakeVimeoId}`
    const fakeVideoWebPagePlayerOnly = `https://player.vimeo.com/video/${fakeVimeoId}`

    // Mock dependencies
    const getVideoIdFromUrlSpy = jest
      .spyOn(vimeoService, 'getVideoIdFromUrl')
      .mockImplementation(() => fakeVimeoId)
    const clientSpy = jest
      .spyOn(vimeoService, 'client')
      .mockImplementation(() => ({
        request: (options, callback) => {
          callback(undefined, {
            player_embed_url: fakeVideoWebPagePlayerOnly,
          })
        },
      }))
    const logErrorSpy = jest
      .spyOn(logging, 'logError')
      .mockImplementation(() => {})

    // Run the function we're testing
    const response = await getVideoWebpagePlayerOnly(
      fakeVideoWebPage,
    )

    // Check our test expectations are met
    expect(getVideoIdFromUrlSpy).toHaveBeenCalledTimes(1)
    expect(getVideoIdFromUrlSpy).toHaveBeenCalledWith(fakeVideoWebPage)
    expect(response).toEqual(fakeVideoWebPagePlayerOnly)

    // Clean up
    getVideoIdFromUrlSpy.mockRestore()
    clientSpy.mockRestore()
    logErrorSpy.mockRestore()
  })

  test('getVideoIdFromUrl correctly gets the video ID from a Vimeo video page URL', async () => {
    // Set up fake test data
    const fakeVimeoId = faker.number.int({ min: 100000000, max: 999999999 })
    const fakeVideoWebPages = [
      `https://vimeo.com/${fakeVimeoId}`,
      `https://vimeo.com/manage/videos/${fakeVimeoId}`,
    ]

    // Mock dependencies
    const logErrorSpy = jest
      .spyOn(logging, 'logError')
      .mockImplementation(() => {})

    for (const fakeVideoWebPage of fakeVideoWebPages) {
      // Run the function we're testing
      const response = getVideoIdFromUrl(fakeVideoWebPage)

      // Check our test expectations are met
      expect(response).toEqual(fakeVimeoId.toString())
    }

    // Clean up
    logErrorSpy.mockRestore()
  })

  test('getVideoIdFromUrl checks it is a Vimeo URL', async () => {
    // Set up fake test data
    const nonVimeoWebPage = faker.internet.url()

    // Mock dependencies
    const logErrorSpy = jest
      .spyOn(logging, 'logError')
      .mockImplementation(() => {})

    // Run the function we're testing
    const response = getVideoIdFromUrl(nonVimeoWebPage)

    // Check our test expectations are met
    expect(response).toEqual(undefined)

    // Clean up
    logErrorSpy.mockRestore()
  })

  test('getVideoIdFromUrl checks video ID is a number', async () => {
    // Set up fake test data
    const incorrectVimeoWebPage = `https://vimeo.com/${faker.string.alpha(10)}`

    // Mock dependencies
    const logErrorSpy = jest
      .spyOn(logging, 'logError')
      .mockImplementation(() => {})

    // Run the function we're testing
    const response = getVideoIdFromUrl(incorrectVimeoWebPage)

    // Check our test expectations are met
    expect(response).toEqual(undefined)

    // Clean up
    logErrorSpy.mockRestore()
  })
})
