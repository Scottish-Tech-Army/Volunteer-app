module.exports = api => {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@': './src',
          },
          extensions: [
            '.json',
            '.js',
            '.jsx',
            '.ts',
            '.tsx',
            '.android.js',
            '.android.tsx',
            '.ios.js',
            '.ios.tsx',
          ],
          root: ['./src'],
        },
      ],
    ],
  }
}

// ============================================================

// const presets = ['module:babel-preset-expo']
// const plugins = []

// plugins.push([
//   'module-resolver',
//   {
//     root: ['./src'],
//     extensions: ['.js', '.json'],
//     alias: {
//       '@': './src',
//     },
//   },
// ])

// module.exports = {
//   presets,
//   plugins,
// }

// ============================================================

// module.exports = api => {
//   api.cache(true)

//   const plugins = []

//   plugins.push([
//     'module-resolver',
//     {
//       root: ['./src'],
//       extensions: ['.js', '.json'],
//       alias: {
//         '@': './src',
//       },
//     },
//   ])

//   return {
//     presets: ['babel-preset-expo'],
//     plugins,
//   }
// }
