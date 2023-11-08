/**
 * @file Useful shared functions to do with Expo.
 */

import Constants from 'expo-constants'

/**
 * Determine if the app is running in development mode (on Expo Go)
 *
 * @returns {boolean} True if the app is running in development mode
 */
export const isDevelopmentMode = (): boolean => {
  // In production, the value below should be 'standalone'
  return Constants.ExecutionEnvironment?.Standalone !== 'standalone'
}
