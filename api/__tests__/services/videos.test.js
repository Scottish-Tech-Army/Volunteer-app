import { faker } from '@faker-js/faker';
import axios from 'axios';
import { getVideoWebpagePlayerOnly } from '../../services/videos';
import vimeoService from '../../services/vimeo';
import youTubeService from '../../services/youTube';

describe('Test the videos service', () => {
  test('getVideoWebpagePlayerOnly gets Vimeo URL', async () => {
    // Set up fake test data
    const fakeVideoWebPage = `https://vimeo.com/${faker.number.int({ min: 100000000, max: 999999999 })}`;
    const fakeVideoWebPagePlayerOnly = faker.internet.url();

    // Mock dependencies
    const vimeoGetVideoWebpagePlayerOnlySpy = jest
      .spyOn(vimeoService, 'getVideoWebpagePlayerOnly')
      .mockImplementation(() => fakeVideoWebPagePlayerOnly);
    const youTubeGetVideoWebpagePlayerOnlySpy = jest
      .spyOn(youTubeService, 'getVideoWebpagePlayerOnly');

    // Run the function we're testing
    const response = await getVideoWebpagePlayerOnly(fakeVideoWebPage);

    // Check our test expectations are met
    expect(vimeoGetVideoWebpagePlayerOnlySpy).toHaveBeenCalledTimes(1);
    expect(vimeoGetVideoWebpagePlayerOnlySpy).toHaveBeenCalledWith(fakeVideoWebPage);
    expect(youTubeGetVideoWebpagePlayerOnlySpy).toHaveBeenCalledTimes(0);
    expect(response).toEqual(fakeVideoWebPagePlayerOnly);

    // Clean up
    vimeoGetVideoWebpagePlayerOnlySpy.mockRestore();
    youTubeGetVideoWebpagePlayerOnlySpy.mockRestore();
  });

  test('getVideoWebpagePlayerOnly gets YouTube URL', async () => {
    // Set up fake test data
    const fakeVideoWebPage = `https://youtube.com/watch?v=${faker.lorem.word(11)}`;
    const fakeVideoWebPagePlayerOnly = faker.internet.url();

    // Mock dependencies
    const vimeoGetVideoWebpagePlayerOnlySpy = jest
      .spyOn(vimeoService, 'getVideoWebpagePlayerOnly')
      .mockImplementation(() => undefined);
    const youTubeGetVideoWebpagePlayerOnlySpy = jest
      .spyOn(youTubeService, 'getVideoWebpagePlayerOnly')
      .mockImplementation(() => fakeVideoWebPagePlayerOnly);

    // Run the function we're testing
    const response = await getVideoWebpagePlayerOnly(fakeVideoWebPage);

    // Check our test expectations are met
    expect(vimeoGetVideoWebpagePlayerOnlySpy).toHaveBeenCalledTimes(1);
    expect(vimeoGetVideoWebpagePlayerOnlySpy).toHaveBeenCalledWith(fakeVideoWebPage);
    expect(youTubeGetVideoWebpagePlayerOnlySpy).toHaveBeenCalledTimes(1);
    expect(youTubeGetVideoWebpagePlayerOnlySpy).toHaveBeenCalledWith(fakeVideoWebPage);
    expect(response).toEqual(fakeVideoWebPagePlayerOnly);

    // Clean up
    vimeoGetVideoWebpagePlayerOnlySpy.mockRestore();
    youTubeGetVideoWebpagePlayerOnlySpy.mockRestore();
  });

  test('getVideoWebpagePlayerOnly returns nothing if video webpage is not Vimeo or YouTube', async () => {
    // Set up fake test data
    const fakeVideoWebPage = faker.internet.url();

    // Mock dependencies
    const vimeoGetVideoWebpagePlayerOnlySpy = jest
      .spyOn(vimeoService, 'getVideoWebpagePlayerOnly')
      .mockImplementation(() => undefined);
    const youTubeGetVideoWebpagePlayerOnlySpy = jest
      .spyOn(youTubeService, 'getVideoWebpagePlayerOnly')
      .mockImplementation(() => undefined);

    // Run the function we're testing
    const response = await getVideoWebpagePlayerOnly(fakeVideoWebPage);

    // Check our test expectations are met
    expect(vimeoGetVideoWebpagePlayerOnlySpy).toHaveBeenCalledTimes(1);
    expect(vimeoGetVideoWebpagePlayerOnlySpy).toHaveBeenCalledWith(fakeVideoWebPage);
    expect(youTubeGetVideoWebpagePlayerOnlySpy).toHaveBeenCalledTimes(1);
    expect(youTubeGetVideoWebpagePlayerOnlySpy).toHaveBeenCalledWith(fakeVideoWebPage);
    expect(response).toEqual(undefined);

    // Clean up
    vimeoGetVideoWebpagePlayerOnlySpy.mockRestore();
    youTubeGetVideoWebpagePlayerOnlySpy.mockRestore();
  });
});
