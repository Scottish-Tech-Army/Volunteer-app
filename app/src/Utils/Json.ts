export const isJson = (string: string) => {
  try {
    const jsonParseResult = JSON.parse(string)

    // Handle non-exception-throwing cases:
    // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
    // but... JSON.parse(null) returns null, and typeof null === "object",
    // so we must check for that, too. Thankfully, null is falsey, so this suffices:
    if (jsonParseResult && typeof jsonParseResult === 'object') {
      return true
    }
  } catch (error) {
    return false
  }

  return false
}
