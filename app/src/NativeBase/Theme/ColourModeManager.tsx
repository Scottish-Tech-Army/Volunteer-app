/**
 * @file Persists the dark/light colour mode when the user comes back to the app
 *
 * Follows recommended approach here https://docs.nativebase.io/color-mode#h2-persisting-the-color-mode
 * See also more detailed notes in ProfileContainer and APP_DEVELOPMENT about how we handle dark mode
 */

import { StorageManager, ColorMode } from 'native-base'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { logError } from '@/Services/modules/logging'

const ColourModeManager: StorageManager = {
  get: async () => {
    try {
      const colourMode = await AsyncStorage.getItem('@color-mode')

      return colourMode === 'dark' ? 'dark' : 'light'
    } catch (error) {
      logError('Error getting colour mode', error)

      return 'light'
    }
  },
  set: async (colourMode: ColorMode) => {
    try {
      await AsyncStorage.setItem('@color-mode', colourMode ?? 'light')
    } catch (error) {
      logError('Error setting colour mode', error)
    }
  },
}

export default ColourModeManager
