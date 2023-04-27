/**
 * @file Defines images for use in the old app theme (pre-NativeBase)
 */

import { ThemeImages, ThemeVariables } from '@/Theme/theme.type'

/**
 *
 * @param Theme can be spread like {Colors, NavigationColors, Gutters, Layout, Common, ...args}
 * @return {*}
 */
export default function ({}: ThemeVariables): ThemeImages {
  return {
    logo: require('@/Assets/Images/LongLogo.png'),
    extraLongLogo: require('@/Assets/Images/ExtraLongLogo.png'),
    extraLongLogoDark: require('@/Assets/Images/ExtraLongLogoDark.png'),
  }
}
