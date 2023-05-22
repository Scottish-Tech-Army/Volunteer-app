import { Platform, ShareOptions } from 'react-native'
import Share from 'react-native-share'

const share = () => {
  const title = 'Example Title'
  const url = 'https://www.google.com/'
  const message = 'Example Message woohoo! 🎉'

  const options: ShareOptions = Platform.select({
    ios: {
      activityItemSources: [
        {
          // For sharing url with custom title.
          placeholderItem: { type: 'url', content: url },
          item: {
            default: { type: 'url', content: url },
          },
          subject: {
            default: title,
          },
          linkMetadata: { originalUrl: url, url, title },
        },
        {
          // For sharing text.
          placeholderItem: { type: 'text', content: message },
          item: {
            default: { type: 'text', content: message },
            message: null, // Specify no text to share via Messages app.
          },
          linkMetadata: {
            // For showing app icon on share preview.
            title: message,
          },
        },
      ],
    },
    default: {
      title,
      subject: title,
      message: `${message}`,
    },
  })

  Share.open(options)
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      err && console.log(err)
    })
}
export default share
