const { faker } = require('@faker-js/faker');
const axios = require('axios');
const vimeo = require('../../services/vimeo');


describe('Test the Vimeo service', () => {

  test('getVideoFileFromVimeo', async () => {
    // Set up fake test data
    const fakeVimeoId =   faker.datatype.number({ min: 100000000, max: 999999999 });
    const fakeVideoWebPage = `https://vimeo.com/${fakeVimeoId}`;
    const fakeApiVimeoCall = `https://player.vimeo.com/video/${fakeVimeoId}/config`;
    const fakeAxiosConfig = {Accept: 'application/json'};
    const fakeVideoFile = faker.internet.url();
    const fakeVimeoData = {
      data: {
        request: {
          files: {
            progressive: [{
              url: fakeVideoFile
            }]
          }
        }
      }
    }; 

    // Mock dependencies
 
    const axiosSpy = jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve(fakeVimeoData));

  
    // Run test
    const response = await vimeo.getVideoFileFromVimeo(fakeVideoWebPage);

    expect(axiosSpy).toHaveBeenCalledTimes(1);
    expect(axiosSpy).toHaveBeenCalledWith(fakeApiVimeoCall, fakeAxiosConfig);
    expect(response).toEqual(fakeVideoFile);


    // Clean up
    axiosSpy.mockRestore();
    
   });
  });