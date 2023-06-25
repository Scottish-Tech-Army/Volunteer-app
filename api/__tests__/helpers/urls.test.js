import { cleanUrlsAndEmails } from '../../helpers/urls';

describe('Test the clean-up urls and emails helper', () => {
  it('should remove unwanted characters from a URL', () => {
    const exampleUrl = '[https://example.com/|unwanted text]';
    const expectedOutput = 'https://example.com/';
    const formattedUrl = cleanUrlsAndEmails(exampleUrl);
    expect(formattedUrl).toEqual(expectedOutput);
  });

  it('should remove unwanted characters from a URL including an empty space', () => {
    const exampleUrl =
      '[https://trello.com/invite/b/dFhDtziM/ATTIce48aa21761d1237c7192b133fd4f0ba920D27E5/mentoring-app |https://trello.com/invite/b/dFhDtziM/ATTIce48aa21761d1237c7192b133fd4f0ba920D27E5/mentoring-app]';
    const expectedOutput =
      'https://trello.com/invite/b/dFhDtziM/ATTIce48aa21761d1237c7192b133fd4f0ba920D27E5/mentoring-app';
    const formattedUrl = cleanUrlsAndEmails(exampleUrl);
    expect(formattedUrl).toEqual(expectedOutput);
  });

  it('should detect urls and emails in text and clean up the url and remove the email', () => {
    const text =
      'This is some text with a url [https://example.com/|unwanted text] in it, and an email [test@example.com|mailto:test@example.com|unwanted text]';
    const expectedOutput =
      'This is some text with a url https://example.com/ in it, and an email ';
    const formattedText = cleanUrlsAndEmails(text);
    expect(formattedText).toEqual(expectedOutput);
  });

  it('should not remove anything if there are no URLs or emails in square brackets', () => {
    const text = 'This is text with no URLs or emails.';
    const cleanedText = cleanUrlsAndEmails(text);
    expect(cleanedText).toStrictEqual(text);
  });
});
