/**
 * @file This file exports a custom selection of icons assembled with IcoMoon.
 * This is the start of our custom library, ideally this will include only the icons we use,
 * avoiding the need to load large icon libraries, and improving loading times.
 *
 * See https://icomoon.io/#docs for more info.
 */

import { createIconSetFromIcoMoon } from '@expo/vector-icons'
import icoMoonConfig from './selection.json'

export default createIconSetFromIcoMoon(icoMoonConfig, 'IcoMoon', 'icomoon.ttf')
