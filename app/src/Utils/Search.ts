export const findStringInArray = (
  searchQuery: string,
  arrayToSearch: string[],
) =>
  arrayToSearch.find((arrayItem) =>
    arrayItem.toLowerCase().includes(searchQuery.toLowerCase()),
  )

export const findStringInString = (
  searchQuery: string,
  stringToSearch: string,
) => stringToSearch.toLowerCase().includes(searchQuery.toLowerCase())
