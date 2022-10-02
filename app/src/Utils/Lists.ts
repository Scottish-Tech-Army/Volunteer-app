export const dedupeArray = (array: any[]) => [...new Set(array)]

export const dedupeArrayOfObjects = (arrayOfObjects: any[]) =>
  arrayOfObjects.filter((value, index) => {
    const valueStringified = JSON.stringify(value)

    return (
      index ===
      arrayOfObjects.findIndex(
        object => JSON.stringify(object) === valueStringified,
      )
    )
  })
