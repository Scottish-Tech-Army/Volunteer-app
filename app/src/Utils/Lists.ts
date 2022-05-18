export const dedupeArrayOfObjects = (arrayOfObjects: any[]) =>
  arrayOfObjects.filter((value, index) => {
    const _value = JSON.stringify(value)

    return (
      index ===
      arrayOfObjects.findIndex(object => JSON.stringify(object) === _value)
    )
  })
