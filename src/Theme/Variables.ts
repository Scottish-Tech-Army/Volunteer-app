/**
 * This file contains the application's variables.
 *
 * Define color, sizes, etc. here instead of duplicating them throughout the components.
 * That allows to change them more easily later on.
 */

import {
  ThemeColors,
  ThemeFontSize,
  ThemeMetricsSizes,
  ThemeNavigationColors,
} from '@/Theme/theme.type'

/**
 * Colors
 */
export const Colors: ThemeColors = {
  // Example colors:
  transparent: 'rgba(0,0,0,0)',
  inputBackground: '#FFFFFF',
  white: '#ffffff',
  text: '#212529',
  primary: '#E14032',
  success: '#28a745',
  error: '#dc3545',
  welcomeButton:'#EC6730',
  dotActive: '#707070',
  dot: '#ffffff',
}

export const NavigationColors: Partial<ThemeNavigationColors> = {
  primary: Colors.primary,
}

/**
 * FontSize
 */
export const FontSize: ThemeFontSize = {
  small: 16,
  regular: 20,
  large: 40,
}

/**
 * Metrics Sizes
 */
const tiny = 5 // 10
const small = tiny * 2 // 10
const regular = tiny * 3 // 15
const large = regular * 2 // 30
export const MetricsSizes: ThemeMetricsSizes = {
  tiny,
  small,
  regular,
  large,
}

export default {
  Colors,
  NavigationColors,
  FontSize,
  MetricsSizes,
}
