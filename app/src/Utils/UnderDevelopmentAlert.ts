import { Alert, GestureResponderEvent } from 'react-native'

const underDevelopmentAlert = (
  event: GestureResponderEvent,
  message = 'This feature is under development',
) => Alert.alert(message)

export default underDevelopmentAlert
