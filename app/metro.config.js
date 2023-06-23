/**
 * @file Metro configuration for React Native
 * https://github.com/facebook/react-native
 */

// eslint-disable-next-line @typescript-eslint/no-var-requires
import { getDefaultConfig } from 'expo/metro-config'

export default (() => {
  const config = getDefaultConfig(__dirname)

  const { transformer, resolver } = config

  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  }
  config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...resolver.sourceExts, 'svg'],
  }

  return config
})()
