const { faker } = require('@faker-js/faker');
const axios = require('axios');
const vimeoService = require('../../services/vimeo');

describe('Test the Vimeo service', () => {
  test('getVideoFile', async () => {
    // Set up fake test data
    const fakeVimeoId = faker.datatype.number({ min: 100000000, max: 999999999 });
    const fakeVideoWebPage = `https://vimeo.com/${fakeVimeoId}`;
    const fakeApiVimeoCall = `https://player.vimeo.com/video/${fakeVimeoId}/config`;
    const fakeVideoFile = faker.internet.url();
    const fakeVimeoData = {
      data: {
        request: {
          files: {
            progressive: [
              {
                url: fakeVideoFile,
              },
            ],
          },
        },
      },
      status: 200,
    };

    // Mock dependencies
    const getVideoIdFromUrlSpy = jest
      .spyOn(vimeoService, 'getVideoIdFromUrl')
      .mockImplementation(() => fakeVimeoId);
    const axiosSpy = jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve(fakeVimeoData));

    // Run the function we're testing
    const response = await vimeoService.getVideoFile(fakeVideoWebPage);

    // Check our test expectations are met
    expect(getVideoIdFromUrlSpy).toHaveBeenCalledTimes(1);
    expect(axiosSpy).toHaveBeenCalledTimes(1);
    expect(axiosSpy).toHaveBeenCalledWith(fakeApiVimeoCall);
    expect(response).toEqual(fakeVideoFile);

    // Clean up
    getVideoIdFromUrlSpy.mockRestore();
    axiosSpy.mockRestore();
  });

  test('getVideoThumbnail', async () => {
    // Set up fake test data
    const fakeVimeoId = faker.datatype.number({ min: 100000000, max: 999999999 });
    const fakeVideoWebPage = `https://vimeo.com/${fakeVimeoId}`;
    const fakeApiVimeoCall = `https://player.vimeo.com/video/${fakeVimeoId}/config`;

    // Vimeo API returns a variety of different size thumbnails -- numbers refer to pixel widths of images
    const fakeThumbnailBase = faker.internet.url();
    const fakeThumbnail960 = faker.internet.url();
    const fakeThumbnail1280 = faker.internet.url();

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
    };

    // Mock dependencies
    const getVideoIdFromUrlSpy = jest
      .spyOn(vimeoService, 'getVideoIdFromUrl')
      .mockImplementation(() => fakeVimeoId);
    const axiosSpy = jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve(fakeVimeoData));

    // Run the function we're testing
    const response = await vimeoService.getVideoThumbnail(fakeVideoWebPage);

    // Check our test expectations are met
    expect(getVideoIdFromUrlSpy).toHaveBeenCalledTimes(1);
    expect(axiosSpy).toHaveBeenCalledTimes(1);
    expect(axiosSpy).toHaveBeenCalledWith(fakeApiVimeoCall);
    expect(response).toEqual(`${fakeThumbnail1280}.jpg`);

    // Clean up
    getVideoIdFromUrlSpy.mockRestore();
    axiosSpy.mockRestore();
  });

  test('getVideoWebpagePlayerOnly', async () => {
    // Set up fake test data
    const fakeVimeoId = faker.datatype.number({ min: 100000000, max: 999999999 });
    const fakeVideoWebPage = `https://vimeo.com/${fakeVimeoId}`;
    const fakeVideoWebPagePlayerOnly = `https://player.vimeo.com/video/${fakeVimeoId}`;

    // Mock dependencies
    const getVideoIdFromUrlSpy = jest
      .spyOn(vimeoService, 'getVideoIdFromUrl')
      .mockImplementation(() => fakeVimeoId);

    // Run the function we're testing
    const response = vimeoService.getVideoWebpagePlayerOnly(fakeVideoWebPage);

    // Check our test expectations are met
    expect(getVideoIdFromUrlSpy).toHaveBeenCalledTimes(1);
    expect(getVideoIdFromUrlSpy).toHaveBeenCalledWith(fakeVideoWebPage);
    expect(response).toEqual(fakeVideoWebPagePlayerOnly);

    // Clean up
    getVideoIdFromUrlSpy.mockRestore();
  });

  test('getVideoIdFromUrl correctly gets the video ID from a Vimeo video page URL', async () => {
    // Set up fake test data
    const fakeVimeoId = faker.datatype.number({ min: 100000000, max: 999999999 });
    const fakeVideoWebPages = [
      `https://vimeo.com/${fakeVimeoId}`,
      `https://vimeo.com/manage/videos/${fakeVimeoId}`,
    ];

    for (const fakeVideoWebPage of fakeVideoWebPages) {
      // Run the function we're testing
      const response = vimeoService.getVideoIdFromUrl(fakeVideoWebPage);

      // Check our test expectations are met
      expect(response).toEqual(fakeVimeoId.toString());
    }
  });

  test('getVideoIdFromUrl checks it is a Vimeo URL', async () => {
    // Set up fake test data
    const nonVimeoWebPage = faker.internet.url();

    // Mock dependencies
    const consoleErrorSpy = jest.spyOn(global.console, 'error').mockImplementation(() => {});

    // Run the function we're testing
    const response = vimeoService.getVideoIdFromUrl(nonVimeoWebPage);

    // Check our test expectations are met
    expect(response).toEqual(undefined);

    // Clean up
    consoleErrorSpy.mockRestore();
  });

  test('getVideoIdFromUrl checks video ID is a number', async () => {
    // Set up fake test data
    const incorrectVimeoWebPage = `https://vimeo.com/${faker.datatype.string(10)}`;

    // Mock dependencies
    const consoleErrorSpy = jest.spyOn(global.console, 'error').mockImplementation(() => {});

    // Run the function we're testing
    const response = vimeoService.getVideoIdFromUrl(incorrectVimeoWebPage);

    // Check our test expectations are met
    expect(response).toEqual(undefined);

    // Clean up
    consoleErrorSpy.mockRestore();
  });
});
