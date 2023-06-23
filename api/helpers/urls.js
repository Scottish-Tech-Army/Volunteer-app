/**
 * This function finds urls or emails that are wrapped in square brackets, i.e.
 * [https://www.example.com|unwanted text] and [example@example|unwanted text/characters]
 * It captures the url removing unwanted characters, and removes the emails completely
 * the first part of the regex matches the url, the second part matches the email
 */

function cleanUrlsAndEmails(string) {
  const urlAndEmailRegExPattern =
    /\[(https?\S+?)\s*\|.*?\]|\[[^\s@]+@[^\s@]+\.[^\s@]+\|.*?\]/g;

  return string.replace(urlAndEmailRegExPattern, (match, url) =>
    url ? url : ""
  );
}

export default {
  cleanUrlsAndEmails,
};
