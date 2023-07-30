import airTable from '../../helpers/airTable'
import { faker } from '@faker-js/faker'
import { combineProjectsAndResources, formatProjectResourceFromAirTable } from '../../helpers/projects'
import stringsHelpers from '../../helpers/strings'
import { fakeProjectObjects, fakeResourceObjects, fakeAirTableProjectResource } from '../../__test-data__/projects'

describe('Test the projects helpers', () => {
  beforeEach(() => {
    jest.resetModules()
  })

  test('combineProjectsAndResources correctly formats data', async () => {
    // Set up fake test data
    const fakeProjects = fakeProjectObjects(2)
    const fakeResources = fakeResourceObjects(5)
    fakeResources[0].it_key = fakeProjects[0].it_key
    fakeResources[1].it_key = fakeProjects[0].it_key
    fakeResources[2].it_key = fakeProjects[1].it_key
    fakeResources[3].it_key = fakeProjects[1].it_key
    fakeResources[4].it_key = fakeProjects[1].it_key

    // Run test
    const combinedProjectsResources =
      combineProjectsAndResources(fakeProjects, fakeResources)

    expect(combinedProjectsResources.length).toEqual(5)
    expect(combinedProjectsResources[0]).toEqual({
      ...fakeProjects[0],
      ...fakeResources[0],
    })
    expect(combinedProjectsResources[1]).toEqual({
      ...fakeProjects[0],
      ...fakeResources[1],
    })
    expect(combinedProjectsResources[2]).toEqual({
      ...fakeProjects[1],
      ...fakeResources[2],
    })
    expect(combinedProjectsResources[3]).toEqual({
      ...fakeProjects[1],
      ...fakeResources[3],
    })
    expect(combinedProjectsResources[4]).toEqual({
      ...fakeProjects[1],
      ...fakeResources[4],
    })
  })

  test('formatProjectResourceFromAirTable correctly formats data it receives from AirTable', async () => {
    // Set up fake test data
    const fakeProjectResourceDataFromAirTable =
      fakeAirTableProjectResource(false)

    // Mock dependencies
    airTable
    const airTableAddEmptyFieldsSpy = jest
      .spyOn(airTable, 'addEmptyFields')
      .mockImplementation(projectResource => projectResource)
    const stringsHelpersSplitByLineBreakSpy = jest
      .spyOn(stringsHelpers, 'splitByLineBreak')
      .mockImplementation(() => {})
    const stringsHelpersRemoveBlankLinesSpy = jest
      .spyOn(stringsHelpers, 'removeBlankLines')
      .mockImplementation(() => {})

    // Run test
    const formattedProjectResource =
      formatProjectResourceFromAirTable(
        fakeProjectResourceDataFromAirTable,
      )

    expect(airTableAddEmptyFieldsSpy).toHaveBeenCalledTimes(1)
    expect(stringsHelpersSplitByLineBreakSpy).toHaveBeenCalledTimes(1)
    expect(stringsHelpersRemoveBlankLinesSpy).toHaveBeenCalledTimes(1)
    expect(stringsHelpersRemoveBlankLinesSpy).toHaveBeenCalledWith(
      fakeProjectResourceDataFromAirTable.skills,
    )
    expect(formattedProjectResource.required).toEqual('1 person')

    // Clean up
    airTableAddEmptyFieldsSpy.mockRestore()
    stringsHelpersSplitByLineBreakSpy.mockRestore()
    stringsHelpersRemoveBlankLinesSpy.mockRestore()
  })
})
