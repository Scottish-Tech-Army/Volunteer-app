import airTable from '../../helpers/airTable'
import { faker } from '@faker-js/faker'
import { formatEventFromAirTable } from '../../helpers/events'
import { fakeEventAirTableRecord } from '../../__test-data__/events'

describe('Test the events helpers', () => {
  beforeEach(() => {
    jest.resetModules()
  })

  test('formatEventFromAirTable correctly formats data', async () => {
    // Set up fake test data
    const fakeEventFromAirTable = fakeEventAirTableRecord(
      'any',
      true,
    )
    const fakeSimplifiedAttachmentsData = [faker.internet.url()]

    // Mock dependencies
    const simplifyAttachmentsDataSpy = jest
      .spyOn(airTable, 'simplifyAttachmentsData')
      .mockImplementation(() => fakeSimplifiedAttachmentsData)
    const addEmptyFieldsSpy = jest
      .spyOn(airTable, 'addEmptyFields')
      .mockImplementation(event => event)
    const formatDurationSpy = jest
      .spyOn(airTable, 'formatDuration')
      .mockImplementation(duration => duration)
    const formatTimeSpy = jest
      .spyOn(airTable, 'formatTime')
      .mockImplementation(time => time)

    // Run test
    const formattedEvent = formatEventFromAirTable(
      fakeEventFromAirTable,
    )

    // simplifyAttachmentsData should be called once for images, once for video_thumbnail
    expect(simplifyAttachmentsDataSpy).toHaveBeenCalledTimes(2)
    expect(formattedEvent.video_thumbnail).toEqual(
      fakeSimplifiedAttachmentsData[0],
    )
    expect(formatDurationSpy).toHaveBeenCalledTimes(1)
    expect(formatTimeSpy).toHaveBeenCalledTimes(1)

    // Clean up
    simplifyAttachmentsDataSpy.mockRestore()
    addEmptyFieldsSpy.mockRestore()
    formatDurationSpy.mockRestore()
    formatTimeSpy.mockRestore()
  })
})
