import { Alert, GestureResponderEvent } from 'react-native'

const share = (
  event: GestureResponderEvent,
  message = 'This is how you share',
) => Alert.alert(message)

export default share
