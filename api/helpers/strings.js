function removeBlankLines(string) {
  return string.replace(/(^[ \t]*\n)/gm, '');
}

function splitByLineBreak(string) {
  const arrayOfLines = string.split(/[\r\n]+/);
  const arrayOfLinesTrimmed = arrayOfLines.map((line) => line.trim());

  return arrayOfLinesTrimmed;
}

export default {
  removeBlankLines,
  splitByLineBreak,
};
