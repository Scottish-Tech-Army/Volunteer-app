function removeBlankLines(string) {
  return string.replace(/(^[ \t]*\n)/gm, '');
}

function splitByLineBreak(string) {
  const arrayOfLines = string.split(/[\r\n]+/);
  const arrayOfLinesTrimmed = arrayOfLines.map((line) => line.trim());

  return arrayOfLinesTrimmed;
}

//function to support test to attempt to check if the type of text is a string
function checkIfString(string) {
  const arrayOfLines2 = string.typeOf(checkIfString);
  const stringCheck = arrayOfLines2.typeOf(checkIfString);

  return stringCheck;
}

module.exports = {
  removeBlankLines,
  splitByLineBreak,
  checkIfString,
};
