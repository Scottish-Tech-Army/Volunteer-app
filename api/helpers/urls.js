function cleanUrlsAndEmails(string) {
  // this regex finds urls or emails in square brackets, and captures the url
  // [https://www.example.com|unwanted text] and [example@example|unwanted text/characters]
  const urlAndEmailRegExPattern =
    /\[(https?\S+?)\|.*?\]|\[[^\s@]+@[^\s@]+\.[^\s@]+\|.*?\]/g;

  return string.replace(urlAndEmailRegExPattern, (match, url) =>
    url ? url : ""
  );
}

module.exports = {
  cleanUrlsAndEmails,
};
